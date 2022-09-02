<?php

namespace App\Models\manager;

use App\Models\manager\BaseModel;

class User extends BaseModel
{
    protected $table      = 'user';
    protected $primaryKey = 'id';
}
