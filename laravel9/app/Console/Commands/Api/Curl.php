<?php

namespace App\Console\Commands\Api;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Curl extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'curl
                                {start : 开始百分比}
                                {end : 结束百分比}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'http发包操作，完善商品数据';

    private $start;
    private $end;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // 多开几个command一起跑
        if (is_null($this->argument('start'))) {
            $this->error('缺少开始百分比');
            return;
        }
        if (is_null($this->argument('end'))) {
            $this->error('缺少结束百分比');
            return;
        }

        $this->start = $this->argument('start');
        $this->end   = $this->argument('end');

        $nowTime = time();
        $this->info('当前时间：' . date('Y-m-d H:i:s', $nowTime));

        $count = DB::table('bar_code')->count();

        // 计算百分比
        $percent           = intval($count * 0.01); // 百分之一
        $start_percent_num = $this->start * $percent;
        $end_percent_num   = $this->end * $percent;
        $total_num         = $end_percent_num - $start_percent_num;

        $this->info('总个数：' . $total_num);

        $start_id = DB::table('bar_code')->orderBy('id', 'asc')->offset($start_percent_num)->limit(1)->value('id');
        $this->info('开始id：' . $start_id);
        $end_id = DB::table('bar_code')->orderBy('id', 'asc')->offset($end_percent_num)->limit(1)->value('id');
        $this->info('结束id：' . $end_id);

        $bar = $this->output->createProgressBar($total_num);
        $bar->start();

        DB::table('bar_code')->offset($start_percent_num)->limit($total_num)->chunkById(1000, function ($barCodeList) use ($bar, $start_percent_num) {
            foreach ($barCodeList as $barCode) {
                $bar_code = $barCode->bar_code;

                $this->updateProductV1($bar_code, $start_percent_num); // 获取名称、品牌、供应商、商品分类、
                $this->updateProductV2($bar_code); // 获取价格、规格

                $bar->advance();
            }
        });

        // 执行耗时
        $timestamp = time() - $nowTime;
        $this->info(' 当前时间：' . date('Y-m-d H:i:s', time()) . ' | 执行耗时：' . $timestamp . ' | 天时分秒：' . getDayHourMinSec($timestamp));

        $bar->finish();
    }

    // *********************************************************************************************

    // 修改
    private function updateProductV1($bar_code, $start_percent_num)
    {
        $productInfoStr = $this->curlGetProductInfo($bar_code, $type = 0);
        $productInfo    = json_decode($productInfoStr, true);
        if (isset($productInfo['Code']) && $productInfo['Code'] == 1 && !empty($productInfo['Data']['Items'])) {
            $item = $productInfo['Data']['Items'][0];

            // 图片下载 并 生成缩略图
            $imageDownloadDomain = 'https://oss.gds.org.cn';
            $imageName           = '';
            $imageUrl            = isset($item['picture_filename']) && !empty($item['picture_filename']) ? $imageDownloadDomain . $item['picture_filename'] : '';
            if ($imageUrl) {
                $save_path = base_path() . '/public/upload/api/img/product_img/' . $start_percent_num . '/';
                $params    = [
                    'width_proportion'  => 0.1,
                    'height_proportion' => 0.1,
                    'watermarking'      => 0,
                ];
                $imageName = @buildNeWImg($imageUrl, $save_path, $params);
            }

            // 数据修改
            Db::table('bar_code')
                ->where('bar_code', $bar_code)
                ->update([
                    'name'           => isset($item['description']) ? $item['description'] : '',
                    'image'          => $imageName,
                    'brand'          => isset($item['brandcn']) ? $item['brandcn'] : '',
                    'supplier'       => isset($item['firm_name']) ? $item['firm_name'] : '',
                    'status'         => isset($item['gtinstatus']) ? $item['gtinstatus'] : '',
                    'classification' => isset($item['gpcname']) ? $item['gpcname'] : '',
                    'updated_at'     => date('Y-m-d H:i:s', time()),
                ]);
        }
    }

    private function updateProductV2($bar_code)
    {
        $params = [
            'barcode'    => $bar_code,
            'app_id'     => 'ohnvf8eponbjhjwv',
            'app_secret' => 'K0pUajE3a2w3MnlXanFhNU5nREpNdz09',
        ];
        $params = http_build_query($params);
        $url    = 'https://www.mxnzp.com/api/barcode/goods/details?' . $params;
        $res    = curl_get($url, $header);
        $res    = json_decode($res, true);

        if (isset($res['code']) && $res['code'] == 1 && !empty($res['data'])) {
            $item  = $res['data'];
            $price = isset($item['price']) && !empty($item['price']) ? getPrice($item['price']) : '0.00';

            // 数据修改
            Db::table('bar_code')
                ->where('bar_code', $bar_code)
                ->update([
                    'price'         => $price,
                    'specification' => isset($item['standard']) ? $item['standard'] : '',
                ]);
        }
    }

    // 备份
    private function getProductInfo()
    {
        $bar_code       = '6902083880781';
        $productInfoStr = $this->curlGetProductInfo($bar_code, 0);
        $productInfo    = json_decode($productInfoStr, true);
        if (isset($productInfo['Code']) && $productInfo['Code'] == 1 && !empty($productInfo['Data']['Items'])) {
            $res = $this->curlGetProductInfo($bar_code, 1);

            $item        = $res['Data']['Items'][0];
            $productAttr = $this->curlGetProductAttr($item['gtin'], $item['base_id']);
            dump($productAttr);exit;
        }
    }

    /**
     * 获取商品信息
     * @param {*} $bar_code 条形码
     * @param {*} $type 0:获取信息 为了防止ip限制； 1:获取base_id，为获取属性接口
     * @return {*}
     */
    private function curlGetProductInfo($bar_code, $type = 0)
    {
        $params = [
            'PageSize'   => 30,
            'PageIndex'  => 1,
            'SearchItem' => $bar_code,
        ];
        $params = http_build_query($params);
        $url    = "https://bff.gds.org.cn/gds/searching-api/ProductService/ProductListByGTIN?" . $params;

        if ($type == 0) {
            $ip     = getIp();
            $header = [
                'CLIENT-IP: ' . $ip,
                'X-FORWARDED-FOR: ' . $ip,
            ];
        } else {
            $header = [
                'Origin: https://www.gds.org.cn',
                'Referer: https://www.gds.org.cn/',
            ];
        }

        return curl_get_header($url, $header);
    }

    // 获取商品属性 长宽高之类
    private function curlGetProductAttr($gtin, $base_id)
    {
        $params = [
            'gtin' => $gtin,
            'id'   => $base_id,
        ];
        $params = http_build_query($params);
        $url    = "https://bff.gds.org.cn/gds/searching-api/ProductService/ProductSimpleInfoByGTIN?" . $params;

        return curl_get($url);
    }

    private function post_bak()
    {
        $url                        = "https://bff.gds.org.cn/gds/searching-api/ProductService/ProductListByGTIN";
        $host                       = 'www.baidu.com';
        $data                       = "要发送的数据";
        $ip                         = '121.186.1.57';
        $headers['CLIENT-IP']       = $ip;
        $headers['X-FORWARDED-FOR'] = $ip;
        $headerArr                  = array();
        foreach ($headers as $n => $v) {
            $headerArr[] = $n . ':' . $v;
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr); //构造IP
        // 我们在POST数据哦！
        curl_setopt($ch, CURLOPT_POST, 1);
        // 把post的变量加上
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $file_contents = curl_exec($ch);
        curl_close($ch);
        var_dump($file_contents);
    }
}
