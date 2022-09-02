<?php

namespace App\Services\manager;

class SysUserService
{
    // 校验登录
    public function checkLogin($params)
    {
        // 验证码
        if (!captcha_api_check($params["code"], $params["key"], 'custom')) {
            return error('验证码错误');
        }

        return success();
    }
}
