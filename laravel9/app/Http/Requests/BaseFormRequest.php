<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaseFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'page' => ['required', 'integer'],
            'size' => ['required', 'integer'],

            // 'id'       => ['required,exists:shop_user,id'],
            // 'name'     => ['required', 'max:12', 'unique:users,name'],
            // 'password' => ['required', 'max:16', 'min:6'],
            // 'email'    => [new Uppercase()], // 自定义规则 使用
        ];

        // switch ($this->method()) {
        //     case 'GET':
        //         {
        //             return [
        //                 'id' => ['required,exists:shop_user,id'],
        //             ];
        //         }
        //     case 'POST':
        //         {
        //             return [
        //                 'name'     => ['required', 'max:12', 'unique:users,name'],
        //                 'password' => ['required', 'max:16', 'min:6'],
        //                 'email'    => [new Uppercase()], // 自定义规则 使用
        //             ];
        //         }
        //     case 'PUT':
        //     case 'PATCH':
        //     case 'DELETE':
        //     default:
        //         {
        //             return [

        //             ];
        //         }
        // }
    }

    /**
     * 错误返回消息
     * @return {*}
     */
    public function messages()
    {
        return [
            'page.required' => '页码不存在',
            'page.integer'  => '页码必须是整数',
            'size.required' => '每页条目不存在',
            'size.integer'  => '每页条目必须是整数',

            // 'name.unique'       => '用户名已经存在',
            // 'name.required'     => '用户名不能为空',
            // 'name.max'          => '用户名最大长度为12个字符',
            // 'password.required' => '密码不能为空',
            // 'password.max'      => '密码长度不能超过16个字符',
            // 'password.min'      => '密码长度不能小于6个字符',
        ];
    }
}
