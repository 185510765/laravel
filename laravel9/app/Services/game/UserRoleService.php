<?php

namespace App\Services\game;

use App\Models\game\UserRole;
use Illuminate\Support\Facades\Redis;

class UserRoleService
{
    public static function getRoleInfo($id)
    {
        // 1、查询缓存redis
        $redisKey = 'userRole:' . $id;
        $res      = Redis::hgetall($redisKey);
        if ($res) {
            return success($res);
        }

        // 2、redis无数据 查询mysql数据库 有则将mysql数据读取到redis 然后下发角色数据
        $userRole = UserRole::find($id);
        if ($userRole) {
            Redis::hmset($redisKey, $userRole->toArray());
            return success($userRole);
        }

        return error('角色数据损坏，请重新创建角色');
    }
}
