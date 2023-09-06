<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Demo extends Command
{
    protected $client_id;
    protected $device_name;
    protected $redisKey;

    protected $signature = 'Demo
                            { client_id=1903131746192166 : 商家id、默认丰宜家id }
                            { device_name? : 商家名称 }
                            { --queue : 选项}
                            { --switch=1 : 选项默认值}';

    protected $description = '通用脚本写法：各种参数、进度条、chunk、redis';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // 参数
        $client_id = $this->argument('client_id');
        if (is_null($client_id)) {
            $this->error('缺少client_id参数');
            return;
        }
        $this->client_id = $client_id;
        $this->redisKey  = 'testRedis.' . $client_id;

        $device_name       = $this->argument('device_name');
        $this->device_name = $device_name;

        // 选项
        $switch = $this->option('switch');

        // 子商家设备
        $ClientRelation  = ClientRelation::query()->where('parent_id', $this->client_id)->get()->toArray();
        $child_client_id = array_column($ClientRelation, 'child_id');

        $clients = ClientsModel::query()->whereIn('id', $child_client_id)->get()->toArray();

        $query = DevicesModel::query()->whereIn('client_id', $child_client_id)
            ->whereIn('device_status', [1, 2, 3, 4, 5, 10]);
        if (!is_null($device_name)) {
            $query->where('name', $device_name);
        }

        if (!$count = $query->count()) {
            $this->error('没有设备数据');
            return;
        }

        // 进度条
        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $redisData = [];
        $query->orderBy('created_at', 'asc')
            ->chunk(100, function ($deviceList) use ($bar, &$redisData) {
                if ($deviceList->isEmpty()) {
                    return true;
                }

                $deviceList = $deviceList->toArray();
                foreach ($deviceList as $key => $device) {
                    // $redis->hset($this->redisKey, $device['client_id'], $device['sticker_num']);

                    $redisData[$device['client_id']][] = $device['sticker_num'];

                    $bar->advance();
                }
            });

        // 数据写入redis
        $redis = RedisHandle::getInstance()->redis();
        foreach ($redisData as $client_id => $value) {
            $redis->hset($this->redisKey, $client_id, json_encode($value, JSON_UNESCAPED_UNICODE));
        }

        $bar->finish();
    }
}
