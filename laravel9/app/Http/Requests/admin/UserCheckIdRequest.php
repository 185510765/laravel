<?php

namespace App\Http\Requests\admin;

use App\Http\Requests\admin\BaseRequest;

class UserCheckIdRequest extends BaseRequest
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
            'id' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'id不能为空',
            'id.integer'  => 'id不合法',
        ];
    }
}
