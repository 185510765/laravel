<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class Push extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'push
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
        for ($i = 1; $i < 1000; $i++) {
            Redis::lpush('queue', 'msg' . $i);
            sleep(2);
        }
    }
}
