<?php

namespace App\Console;

use App\Console\Commands\DailyDataResetCommand;
use App\Console\Commands\Demo;
use App\Console\Commands\Test;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * 计划任务 可以直接使用蓝鲸平台
     * Define the application's command schedule.
     * 命令调度 任务调度
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // 测试调度功能
        $schedule->command(Test::class)->everyMinute();

        // 每天6点重置角色数据（疲劳值）
        $schedule->command(DailyDataResetCommand::class)->dailyAt('6:00');

        // 每隔半小时同步redis中变动的数据到mysql

        // demo脚本 带参数
        $schedule->command(Demo::class, ['--queue', '--switch=5'])->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    // 自己添加
    protected $commands = [
        \App\Console\Commands\AddServices::class,
    ];
}
