<?php

namespace App\Http\Requests\common;

use App\Http\Requests\game\BaseRequest;
use App\Rules\CheckId;

class CheckIdRequest extends BaseRequest
{
    // /**
    //  * Determine if the user is authorized to make this request.
    //  *
    //  * @return bool
    //  */
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
            'id' => ['required', new CheckId()],
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'id不能为空',
        ];
    }
}
