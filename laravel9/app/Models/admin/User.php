<?php

namespace App\Models\admin;

use App\Models\admin\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends BaseModel
{
    use SoftDeletes;

    protected $table      = 'user';
    protected $primaryKey = 'id';

    // 可批量填充的字段
    protected $fillable = ['name', 'password'];

    // 不允许 自动填充的模型字段
    protected $guarded = [];

    // 模型转换为数组时应当隐藏的字段
    protected $hidden = ['password'];

    // 与上面相反
    protected $visable = [];

    // 模型转换为数组时应当追加的虚拟字段
    protected $appends = [];

    // 应当预加载的关联关系
    protected $with = ['phone'];

    // 默认值
    protected $attributes = [
        // '字段名' => '字段默认值'
    ];

    // 类型转换
    protected $casts = [
        // 'is_admin' => 'boolean',
    ];

    // 用户性别
    public function getSexAttribute($value)
    {
        $sexList = [
            '0' => '男',
            '1' => '女',
        ];
        return $sexList[$value];
    }

    // 将密码进行加密
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    // 用户手机模型数据
    public function phone()
    {
        return $this->hasOne(Phone::class);
    }

    // 用户地址
    public function userAdress()
    {
        return $this->hasMany(UserAdress::class);
    }

}
