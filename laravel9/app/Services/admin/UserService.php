<?php

namespace App\Services\admin;

use App\Models\admin\User;

class UserService
{
    // 获取用户列表
    public function getUserList($params)
    {
        // $list = User::all()->chunk(3); // 集合 辅助方法
        $list = User::all(); // 集合 辅助方法

        return success([
            'list' => $list,
        ]);
    }

    // 查找单个用户
    public function getUser($params)
    {
        $userAry = User::find($params['id']);

        return success([
            'userAry' => $userAry,
        ]);
    }

    // 添加用户
    public function createUser($params)
    {
        User::create($params);

        return success();
    }

    // 删除用户 软删除
    public function delUser($params)
    {
        User::destroy($params['id']);

        // User::where('is_read',1)->delete();

        // 恢复软删除的模型 单个
        // User::where('id', 10006)->restore();

        return success();
    }

    // 修改
    public function updateUser($params)
    {
        User::where('id', $params['id'])
            ->update([
                'name'     => $params['name'],
                'password' => $params['password'],
            ]);

        // User::find($params['id'])
        //     ->update([
        //         'name'     => $params['name'],
        //         'password' => $params['password'],
        //     ]);

        return success();
    }
}
