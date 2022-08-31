<?php

namespace App\Models\admin;

use App\Models\admin\BaseModel;

class Phone extends BaseModel
{
    protected $table = 'phone';

    // 获取拥有此电话的用户
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
