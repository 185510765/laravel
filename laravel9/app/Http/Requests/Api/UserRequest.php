<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\BaseFormRequest;

class UserRequest extends BaseFormRequest
{
    public function authorize()
    {
        //false代表权限验证不通过，返回403错误
        //true代表权限认证通过
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $baseFormRequestRule = BaseFormRequest::rules();

        $rule = [];

        return array_merge($baseFormRequestRule, $rule);

        // return [
        //     'page' => ['required', 'integer'],
        //     'size' => ['required', 'integer'],

        //     // 'id'       => ['required,exists:shop_user,id'],
        //     // 'name'     => ['required', 'max:12', 'unique:users,name'],
        //     // 'password' => ['required', 'max:16', 'min:6'],
        //     // 'email'    => [new Uppercase()], // 自定义规则 使用
        // ];
    }

    /**
     * 错误返回消息
     * @return {*}
     */
    public function messages()
    {
        $baseFormRequestMessage = BaseFormRequest::messages();

        $messages = [];

        return array_merge($baseFormRequestMessage, $messages);

        // return [
        //     'page.required' => '页码不存在',
        //     'page.integer'  => '页码必须是整数',
        //     'size.required' => '每页条目不存在',
        //     'size.integer'  => '每页条目必须是整数',

        //     // 'name.unique'       => '用户名已经存在',
        //     // 'name.required'     => '用户名不能为空',
        //     // 'name.max'          => '用户名最大长度为12个字符',
        //     // 'password.required' => '密码不能为空',
        //     // 'password.max'      => '密码长度不能超过16个字符',
        //     // 'password.min'      => '密码长度不能小于6个字符',
        // ];
    }

}
