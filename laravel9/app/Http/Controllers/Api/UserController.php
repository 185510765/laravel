<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //返回用户列表
    public function index()
    {
        //3个用户为一页
        $users = User::paginate(3);
        return $users;
    }

    //返回单一用户信息
    public function show(User $user)
    {
        return $user;
    }

    //用户注册
    public function store(UserRequest $request)
    {
        User::create($request->post());

        return success();
    }

    //用户登录
    public function login(Request $request)
    {
        $res = Auth::guard('web')->attempt(['name' => $request->name, 'password' => $request->password]);
        if ($res) {
            return '用户登录成功...';
        }
        return '用户登录失败';
    }

    public function getCaptcha()
    {
        dump('111111111111');exit;
    }

}
