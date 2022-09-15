<?php

namespace App\Http\Requests\manager\UserMiner;

use App\Http\Requests\manager\BaseRequest;

class GetMinerListRequest extends BaseRequest
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
            'page' => ['required', 'integer'],
            'size' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'page.required' => '页码不存在',
            'page.integer'  => '页码不合法',

            'size.required' => '每页显示数量不存在',
            'size.integer'  => '每页显示数量不合法',
        ];
    }
}
