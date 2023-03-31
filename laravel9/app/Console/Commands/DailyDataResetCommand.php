<?php

namespace App\Console\Commands;

use App\Models\game\UserRole;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class DailyDataResetCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'DailyDataResetCommand';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '每日6点初始化的数据，包括（疲劳值、）';

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
     * 重置数据
     * @return int
     */
    public function handle()
    {
        // 1、重置redis里面数据（疲劳值、）
        $userRoleRedisKeyAry = Redis::keys('userRole:*'); // minigame:userRole:2

        foreach ($userRoleRedisKeyAry as $key => $value) {
            $redisKey = substr($value, strpos($value, ':') + 1);

            $bRet = Redis::hexists($redisKey, 'tired_value');
            if ($bRet) {
                Redis::hset($redisKey, 'tired_value', 160);
            }
        }

        // 2、重置mysql里面数据（疲劳值、）
        UserRole::where('id', '>=', 1)->update(['tired_value' => 160]);
    }
}
