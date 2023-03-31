<?php

namespace App\Http\Requests\manager\UserMiner;

use App\Http\Requests\manager\BaseRequest;

class CheckIdRequest extends BaseRequest
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
            'id' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'id.required' => '矿工不存在',
            'id.integer'  => '矿工不合法',
        ];
    }
}
