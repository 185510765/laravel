<?php

namespace App\Console\Commands\Api;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class initBarcode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'initBarcode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '初始化商品条形码表数据';

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
        // $this->getProductsLit();
        // $this->getBarcodesList();
    }

    private function getBarcodesList()
    {
        $count = DB::table('barcodes')->count();

        // 进度条
        $bar = $this->output->createProgressBar($count);
        $bar->start();

        DB::table('barcodes')->chunkById(1000, function ($list) use ($bar) {
            $bar->advance();

            $data = [];
            foreach ($list as $product) {
                if ($product->bar_code) {
                    // 去除价格中的中文和斜杠/
                    $price = getPrice($product->price);

                    $val = [
                        'bar_code'      => $product->bar_code,
                        'name'          => isset($product->name) && $product->name && $product->name != 'NULL' ? $product->name : '',
                        'short_name'    => isset($product->short_name) && $product->short_name && $product->short_name != 'NULL' ? $product->short_name : '',
                        'price'         => $price,
                        'specification' => isset($product->spec) && $product->spec && $product->spec != 'NULL' ? $product->spec : '',
                        'brand'         => isset($product->brand) && $product->brand && $product->brand != 'NULL' ? $product->brand : '',
                        'supplier'      => isset($product->supplier) && $product->supplier && $product->supplier != 'NULL' ? $product->supplier : '',
                        'created_at'    => date('Y-m-d H:i:s', time()),
                        'updated_at'    => date('Y-m-d H:i:s', time()),
                    ];
                    $data[] = $val;
                }
            }

            if ($data) {
                DB::table('bar_code')->insert($data);
            }
        });

        $bar->finish();
    }

    private function getProductsLit()
    {
        // $productsList = DB::table('products')->get();
        $productsCount = DB::table('products')->count();

        // 进度条
        $bar = $this->output->createProgressBar($productsCount);
        $bar->start();

        DB::table('products')->chunkById(100, function ($productsList) use ($bar) {
            $bar->advance();

            $data = [];
            foreach ($productsList as $product) {
                if ($product->bar_code) {
                    $val = [
                        'bar_code'      => $product->bar_code,
                        'name'          => $product->name,
                        'short_name'    => $product->short_name,
                        'price'         => $product->price,
                        'specification' => $product->specification,
                        // 'brand'         => $product['brand'],
                        // 'supplier'      => $product['supplier'],
                        'created_at'    => date('Y-m-d H:i:s', time()),
                        'updated_at'    => date('Y-m-d H:i:s', time()),
                    ];
                    $data[] = $val;
                }
            }

            if ($data) {
                DB::table('bar_code')->insert($data);
            }
        });

        $bar->finish();
    }
}
