<?php

namespace App\Models\manager;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SysUser extends Model
{
    use HasFactory;

    protected $table      = 'sys_user';
    protected $primaryKey = 'id';

}
