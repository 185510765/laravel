<?php

namespace App\Services\manager;

use App\Models\manager\SysUser;
use Illuminate\Support\Facades\Hash;

class SysUserService
{
    // 校验登录
    public function checkLogin($params)
    {
        // 验证码
        if (!captcha_api_check($params["code"], $params["key"], 'custom')) {
            return error('验证码错误');
        }

        // 用户名
        $userinfo = SysUser::where('username', $params['username'])->first();
        if (!$userinfo) {
            return error('用户名不正确');
        }

        // 密码
        if (!Hash::check($params['password'], $userinfo->password)) {
            return error('密码不正确');
        }

        return success([
            'userinfo' => $userinfo,
        ]);
    }

    // 登录成功后的操作
    public function loginSuccessTodo($userinfo)
    {

    }
}
