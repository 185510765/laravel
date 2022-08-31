<?php

namespace App\Http\Requests\admin;

use App\Http\Requests\admin\BaseRequest;

class UserUpdateRequest extends BaseRequest
{
    // /**
    //  * Determine if the user is authorized to make this request.
    //  *
    //  * @return bool
    //  */
    // public function authorize()
    // {
    //     return true;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id'       => ['required', 'integer'],
            'name'     => ['required', 'min:5', 'max:12', 'unique:user,name'],
            'password' => ['required', 'max:16', 'min:6'],
        ];
    }

    public function messages()
    {
        return [
            'id.required'       => 'id不能为空',
            'id.integer'        => 'id不合法',
            'name.required'     => '用户名不能为空',
            'name.min'          => '用户名最小长度为6个字符',
            'name.max'          => '用户名最大长度为12个字符',
            'name.unique'       => '用户名已经存在',
            'password.required' => '密码不能为空',
            'password.min'      => '密码长度不能小于6个字符',
            'password.max'      => '密码长度不能超过16个字符',
        ];
    }
}
