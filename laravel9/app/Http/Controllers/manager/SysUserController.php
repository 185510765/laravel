<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\SysUserLoginRequest;
use App\Services\manager\SysUserService;
use Mews\Captcha\Facades\Captcha;

class SysUserController extends Controller
{
    // 获取验证码
    public function getCaptcha()
    {
        $captcha = Captcha::create('custom', true);
        return success($captcha);
    }

    // 获取Rsa公钥
    public function publicKey()
    {
        return success([
            'publicKey' => config('rsa.publicKey'),
        ]);
    }

    // 登录
    public function login(SysUserLoginRequest $request)
    {
        $params = $request->input();

        // 校验登录
        $validateResStr = SysUserService::checkLogin($params);
        $validateResAry = json_decode($validateResStr, true);
        if ($validateResAry['code'] == 500) {
            return error($validateResAry['message']);
        }

        // 登录后的操作

        return success();
    }

}
