<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use Mews\Captcha\Facades\Captcha;

class SysUserController extends Controller
{
    // 获取验证码
    public function getCaptcha()
    {
        $captcha = Captcha::create("default", true);
        return success($captcha);
    }

}
