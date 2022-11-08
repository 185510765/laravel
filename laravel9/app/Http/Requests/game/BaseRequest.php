<?php

namespace App\Http\Requests\game;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class BaseRequest extends FormRequest
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
            //
        ];
    }

    // 重写ajax请求验证错误响应格式（防止验证422报错）
    protected function failedValidation(Validator $validator)
    {
        // 此处自定义表单验证错误信息
        $data = [
            'code'    => 500,
            'message' => $validator->errors()->first(),
            'data'    => [],
        ];
        $respone = new Response(json_encode($data));
        throw (new ValidationException($validator, $respone))
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }
}
