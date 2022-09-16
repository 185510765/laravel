<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Models\manager\User;
use Illuminate\Support\Carbon;

class IndexController extends Controller
{
    // 获取首页初始数据
    public function getInitData()
    {
        // 用户新增数
        $thisWeekDateAry = get_week(); // 本周

        $thisWeekDataAry = [];
        foreach ($thisWeekDateAry as $key => $value) {
            $count = User::whereDate('created_at', $value)->count();
            array_push($thisWeekDataAry, $count);
        }

        $start         = Carbon::now()->startOfWeek()->toArray();
        $end           = Carbon::now()->endOfWeek()->toArray();
        $thisWeekCount = User::whereBetween('created_at', [$start['formatted'], $end['formatted']])->count();

        $userCount = User::count();

        return success([
            'thisWeekDateAry' => $thisWeekDateAry,
            'thisWeekDataAry' => $thisWeekDataAry,
            'thisWeekCount'   => $thisWeekCount,
            'thisMonthCount'  => $userCount,
            // 'dataList'        => $dataList,
        ]);
    }
}
