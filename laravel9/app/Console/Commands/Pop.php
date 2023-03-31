<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class Pop extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pop
                            {user_id? : 用户id}
                            {username? : 用户名}
                            {password=123456 : 用户密码}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '测试参数命令';

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
        $redisKey = "queue";
        $timeout  = 20; // 阻塞时间: s
        while (true) {
            try {
                $res = Redis::brpop($redisKey, $timeout);
                dump($res);
                if (!empty($res)) {
                    // 业务逻辑
                }
            } catch (\Exception $e) {
                // 异常处理
                // 如果redis连接超时，会抛出异常，可以在这里进行重连
            }
            sleep(1);
        }
    }
}
