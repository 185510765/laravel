<?php

namespace App\Models\manager;

use App\Models\manager\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class SysUser extends BaseModel
{
    use SoftDeletes, HasApiTokens;

    protected $table      = 'sys_user';
    protected $primaryKey = 'id';

    // 可批量填充的字段
    protected $fillable = ['username', 'password'];

    // 不允许 自动填充的模型字段
    protected $guarded = [];

    // 模型转换为数组时应当隐藏的字段
    protected $hidden = ['salt', 'password'];

    // 与上面相反
    protected $visable = [];

    // 模型转换为数组时应当追加的虚拟字段
    protected $appends = [];

    // 应当预加载的关联关系
    protected $with = [];

    // 默认值
    protected $attributes = [
        // '字段名' => '字段默认值'
    ];

    // 类型转换
    protected $casts = [
        // 'is_admin' => 'boolean',
    ];

    // 密码加密
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

}
