<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\SysUserLoginRequest;
use App\Http\Requests\manager\SysUserRegisterRequest;
use App\Models\manager\SysUser;
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
        $resStr = SysUserService::checkLogin($params);
        $resAry = json_decode($resStr, true);
        if ($resAry['code'] == 500) {
            return error($resAry['message']);
        }

        // 校验成功后的操作
        $userinfo = $resAry['data']['userinfo'];
        $jwt      = SysUserService::loginSuccessTodo($userinfo);

        return success([
            'Authorization' => $jwt,
        ]);
    }

    // ************************** 测试 **************************************

    // 注册
    public function register(SysUserRegisterRequest $request)
    {
        SysUser::create($request->input());

        return success();
    }

}
