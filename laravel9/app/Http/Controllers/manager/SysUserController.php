<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
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
    public function login()
    {
        // rsa解密
        $param = request()->input('param');

        $Rsa   = new \Rsa\Rsa(config('rsa.publicKey'), config('rsa.privateKey'));
        $param = json_decode($Rsa->priv_decode($param), true);

        return success($param);
    }

}
