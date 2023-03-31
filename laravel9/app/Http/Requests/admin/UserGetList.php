<?php

namespace App\Http\Requests\admin;

use App\Http\Requests\admin\BaseRequest;

class UserGetList extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
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
            'page' => ['required', 'integer'],
            'size' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'page.required' => '页码不存在',
            'page.integer'  => '页码必须是整数',
            'size.required' => '每页条目不存在',
            'size.integer'  => '每页条目必须是整数',
        ];
    }
}
