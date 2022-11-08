<?php

namespace App\Http\Controllers\game;

use App\Http\Controllers\game\BaseController;
use App\Http\Requests\common\CheckIdRequest;

class UserController extends BaseController
{
    /**
     * 登录
     * @return {*}
     */
    public function login()
    {}

    /**
     * 获取用户初始数据
     * 角色列表、
     * @return {*}
     */
    public function getUserInitData(CheckIdRequest $request)
    {
        $params = $request->input();
        dump($params);

        // $paginate = UserMiner::where($map)->with('user:id,nick_name,avatar_url,open_id,union_id')->orderBy('id', 'desc')->paginate($params['size']);
        // $list = User::

        return success();
    }

}
