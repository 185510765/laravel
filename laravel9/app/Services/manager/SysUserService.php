<?php

namespace App\Services\manager;

use App\Models\manager\SysUser;
use Illuminate\Support\Facades\Hash;

class SysUserService
{
    // 校验登录
    public static function checkLogin($params, $sysUser)
    {
        // 验证码
        if (!captcha_api_check($params["code"], $params["key"], 'custom')) {
            return error('验证码错误');
        }

        // 用户名
        if (!$sysUser) {
            return error('用户名不正确');
        }

        // 密码
        if (!Hash::check($params['password'], $sysUser->password)) {
            return error('密码不正确');
        }

        return success();
    }

    // 登录成功后的操作
    public static function loginSuccessTodo(SysUser $sysUser)
    {

    }
}
