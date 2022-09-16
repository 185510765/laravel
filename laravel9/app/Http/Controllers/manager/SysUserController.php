<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\SysUser\LoginRequest;
use App\Http\Requests\manager\SysUser\RegisterRequest;
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

    // 注册
    public function register(RegisterRequest $request)
    {
        SysUser::create($request->input());

        return success();
    }

    // 登录
    public function login(LoginRequest $request)
    {
        $params = $request->input();

        $sysUser = SysUser::where('username', $params['username'])->first();

        // 校验登录
        $resStr = SysUserService::checkLogin($params, $sysUser);
        $resAry = json_decode($resStr, true);
        if ($resAry['code'] == 500) {
            return error($resAry['message']);
        }

        // 校验成功后的操作
        SysUserService::loginSuccessTodo($sysUser);

        $token = 'Bearer ' . $sysUser->createToken($sysUser->username)->plainTextToken;

        return success([
            'Authorization' => $token,
        ]);
    }

    // 获取用户信息
    public function userInfo()
    {
        $userinfo = auth()->user();

        return success([
            'user_id'     => $userinfo->id,
            'username'    => $userinfo->username,
            'permissions' => ['manager'],
            'avatar'      => 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
        ]);
    }

    // 退出
    public function logout()
    {
        // 撤销当前用户的所有令牌
        auth()->user()->tokens()->delete();

        return success();

        // // 撤销所有令牌...
        // $user->tokens()->delete();

        // // 撤销用于验证当前请求的令牌...
        // $request->user()->currentAccessToken()->delete();

        // // 撤销指定令牌...
        // $user->tokens()->where('id', $tokenId)->delete();
    }

    // ************************** 测试 **************************************

}
