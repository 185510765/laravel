<?php

namespace App\Models\admin;

use App\Models\admin\BaseModel;

class UserAdress extends BaseModel
{
    protected $table = 'user_adress';

    // 获取拥有此地址的用户
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
