<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\UserMiner\ChangeLevelRequest;
use App\Http\Requests\manager\UserMiner\GetMinerListRequest;
use App\Services\manager\UserMinerService;

class UserMinerController extends Controller
{
    // 获取各种类型的矿工数量
    public function getLevelMiner()
    {
        return UserMinerService::queryLevelMiner();
    }

    // 获取矿工列表
    public function getMinerList(GetMinerListRequest $request)
    {
        $params = $request->input();

        return UserMinerService::queryMinerList($params);
    }

    // 修改矿工等级
    public function changeLevel(ChangeLevelRequest $request)
    {
        $params = $request->input();

    }

}
