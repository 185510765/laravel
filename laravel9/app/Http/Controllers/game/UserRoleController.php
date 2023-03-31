<?php

namespace App\Http\Controllers\game;

use App\Http\Controllers\game\BaseController;
use App\Http\Requests\common\CheckIdRequest;
use App\Services\game\UserRoleService;

class UserRoleController extends BaseController
{
    /**
     * 获取选中角色数据
     * 逻辑:1、 redis中是否有角色数据 如果有 直接从redis下发角色数据
     *      2、如果没有 查询mysql是否有 有则将mysql数据读取到redis 然后下发角色数据
     *      3、都没有则代表角色数据损坏，玩家重新创建角色
     * @return {*}
     */
    public function getRoleInfo(CheckIdRequest $request)
    {
        $params = $request->input();

        return UserRoleService::getRoleInfo($params['id']);

        return success();
    }

}
