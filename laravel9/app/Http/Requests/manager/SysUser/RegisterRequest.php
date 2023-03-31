<?php

namespace App\Http\Requests\manager\SysUser;

use App\Http\Requests\manager\BaseRequest;
use App\Rules\CheckUsername;

class RegisterRequest extends BaseRequest
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
            'username' => ['required', 'min:5', 'max:12', new CheckUsername(), 'unique:sys_user,username'],
            'password' => ['required', 'min:6', 'max:16'],
        ];
    }

    public function messages()
    {
        return [
            'username.required' => '用户名不能为空',
            'username.min'      => '用户名最小长度为5个字符',
            'username.max'      => '用户名最大长度为12个字符',
            'username.unique'   => '用户名已存在',

            'password.required' => '密码不能为空',
            'password.min'      => '密码长度不能小于6个字符',
            'password.max'      => '密码长度不能超过16个字符',
        ];
    }

}
