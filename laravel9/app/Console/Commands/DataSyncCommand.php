<?php

namespace App\Console\Commands;

use App\Models\game\UserRole;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class DataSyncCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'DataSyncCommand';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '每隔xx分钟同步redis数据到mysql';

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
     * 数据同步 数据中字段version > 0 则代表此条数据修改过 需要同步
     * 1、角色属性 2、角色装备数据
     * @return int
     */
    public function handle()
    {
        // 1、角色属性
        $userRoleRedisKeyAry = Redis::keys('userRole:*'); // minigame:userRole:2

        foreach ($userRoleRedisKeyAry as $key => $value) {
            $redisKey = substr($value, strpos($value, ':') + 1);

            $bRet = Redis::hexists($redisKey, 'version');
            if (!$bRet) {
                Redis::hset($redisKey, 'version', 0);
            }

            $versionValue = Redis::hget($redisKey, 'version');
            if ($versionValue > 0) { // 代表此条数据有变动 需要更新
                Redis::hset($redisKey, 'version', 0);

                $redisKeyAry   = explode(':', $redisKey);
                $user_id       = $redisKeyAry[count($redisKeyAry) - 1];
                $redisValueAry = Redis::hgetall($redisKey);

                // TODO 这里处理数据 deleted_at 为空 '' 报错，处理办法
                // 1、测试使用orm api 是否可以
                // 2、如果不行 直接unset去掉 deleted_at 字段，其他的也一样操作

                UserRole::where('id', $user_id)->update($redisValueAry);
            }
        }

        // 2、角色装备数据
    }
}
