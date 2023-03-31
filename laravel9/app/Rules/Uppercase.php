<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Uppercase implements Rule
{
    /**
     * Create a new rule instance.
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * 判断验证规则是否通过。
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return strtoupper($value) === $value;
    }

    /**
     * 获取验证错误消息。
     * @return string
     */
    public function message()
    {
        // return 'The :attribute must be uppercase.';
        return ':attribute输入字段中包含敏感词';
    }

    /**
     * 获取验证错误的自定义属性。
     * 这样，在验证规则类 SensitiveWordRule 验证失败时返回错误提示时，就可以将 :attribute 替换为 标题，而不是默认的 title 了
     * @return array
     */
    public function attributes()
    {
        return [
            'title'   => '标题',
            'url'     => 'URL',
            'picture' => '图片',
        ];
    }

}
