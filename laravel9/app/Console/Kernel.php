<?php

namespace App\Console;

use App\Console\Commands\DailyDataResetCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * 计划任务 可以直接使用蓝鲸平台
     * Define the application's command schedule.
     * 命令调度
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command(DailyDataResetCommand::class)->dailyAt('6:00'); // 每天6点重置角色数据（疲劳值）

        // 每隔半小时同步redis中变动的数据到mysql
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
