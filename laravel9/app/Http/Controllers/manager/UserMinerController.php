<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\UserMiner\ChangeLevelRequest;
use App\Http\Requests\manager\UserMiner\CheckIdRequest;
use App\Http\Requests\manager\UserMiner\GetMinerListRequest;
use App\Models\manager\UserMiner;
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

        return UserMinerService::changeLevelDetails($params);
    }

    // 删除矿工
    public function delMiner(CheckIdRequest $request)
    {
        $params = $request->input();

        UserMiner::destroy($params['id']);

        return success();
    }

}
