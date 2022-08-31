<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\UserCheckIdRequest;
use App\Http\Requests\admin\UserCreateRequest;
use App\Http\Requests\admin\UserGetList;
use App\Http\Requests\admin\UserUpdateRequest;
use App\Models\admin\User;
use App\Models\admin\UserAdress;
use App\Services\admin\UserService;

class UserConTroller extends Controller
{
    // 获取用户列表
    public function getUserList(UserGetList $request)
    {
        return UserService::getUserList($request->input());
    }

    // 查找单个用户
    public function getUser(UserCheckIdRequest $request)
    {
        return UserService::getUser($request->input());
    }

    // 创建用户
    public function createUser(UserCreateRequest $request)
    {
        return UserService::createUser($request->input());
    }

    // 删除用户 软删除
    public function delUser(UserCheckIdRequest $request)
    {
        return UserService::delUser($request->input());
    }

    // 修改用户
    public function updateUser(UserUpdateRequest $request)
    {
        return UserService::updateUser($request->input());
    }

    // 获取用户手机表信息
    public function getUserPhone()
    {
        $userAry = User::find(10000)->phone;

        return success($userAry);
    }

    // 获取用户地址
    public function getUserAddress()
    {
        $userAry = User::find(10000)->userAdress;

        // $relation = UserAdress::where('user_id', 10000)->get();

        return success($userAry);
    }

    // 预加载
    public function getUserInfo()
    {
        // 默认预加载
        $user = User::get();

        // 预加载
        $userAry = User::with('phone')->get();

        $userList = User::with(['phone', 'userAdress'])->get();

        return success([
            'user'     => $user,
            'userAry'  => $userAry,
            'userList' => $userList,
        ]);
    }

}
