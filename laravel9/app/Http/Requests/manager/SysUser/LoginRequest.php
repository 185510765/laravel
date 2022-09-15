<?php

namespace App\Http\Requests\manager\SysUser;

use App\Http\Requests\manager\BaseRequest;
use App\Rules\CheckUsername;

class LoginRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => ['required', 'min:5', 'max:12', new CheckUsername()],
            'password' => ['required', 'min:6', 'max:16'],
            'code'     => ['required', 'size:4'],
        ];
    }

    public function messages()
    {
        return [
            'username.required' => '用户名不能为空',
            'username.min'      => '用户名最小长度为5个字符',
            'username.max'      => '用户名最大长度为12个字符',

            'password.required' => '密码不能为空',
            'password.min'      => '密码长度不能小于6个字符',
            'password.max'      => '密码长度不能超过16个字符',

            'code.required'     => '验证码不能为空',
            'code.size'         => '请输入4位数验证码',
        ];
    }

    /**
     * 准备验证数据
     * 在验证之前处理数据
     * @return void
     */
    protected function prepareForValidation()
    {
        // rsa解密参数
        $param = request()->input('param');

        $Rsa   = new \Rsa\Rsa(config('rsa.publicKey'), config('rsa.privateKey'));
        $param = json_decode($Rsa->priv_decode($param), true);

        $this->merge($param);
    }

}
