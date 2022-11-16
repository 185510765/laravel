<?php

namespace App\Http\Controllers\game;

use App\Http\Controllers\game\BaseController;
use App\Http\Requests\common\CheckIdRequest;
use App\Http\Requests\game\User\LoginRequest;
use App\Models\game\User;

class UserController extends BaseController
{
    /**
     * 登录
     * @return {*}
     */
    public function login(LoginRequest $request)
    {
        $params = $request->input();

        $user = User::where('username', $params['username'])->first();

        $token = 'Bearer ' . $user->createToken($user->username)->plainTextToken;
        
        return success([
            'Authorization' => $token,
        ]);
    }

    /**
     * 获取用户数据
     * 用户数据、角色列表、
     * @return {*}
     */
    public function getUserInfo(CheckIdRequest $request)
    {
        $params = $request->input();

        $user = User::with('userRole:id,user_id,name,created_at')->select(['id', 'username', 'created_at'])->find($params['id']);

        return success($user);
    }

}
