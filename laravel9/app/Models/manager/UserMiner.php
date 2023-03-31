<?php

namespace App\Models\manager;

use App\Models\manager\BaseModel;
use App\Models\manager\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserMiner extends BaseModel
{
    use SoftDeletes;

    protected $table      = 'user_miner';
    protected $primaryKey = 'id';

    // 可批量填充的字段
    protected $fillable = [];

    // 不允许 自动填充的模型字段
    protected $guarded = [];

    // 模型转换为数组时应当隐藏的字段
    protected $hidden = [];

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

    public function getCreateTimeAttribute($value)
    {
        return $value ? date('Y-m-d H:i:s', $value) : '';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
