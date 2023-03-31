<?php

namespace App\Http\Controllers\game;

use App\Http\Controllers\game\BaseController;
use App\Http\Requests\common\CheckIdRequest;
use App\Models\game\RoleEquipment;

class RoleEquipmentController extends BaseController
{
    public function getRoleEquipmentList(CheckIdRequest $request)
    {
        $params = $request->input();

        $list = RoleEquipment::where('user_role_id', $params['id'])->get();

        return success($list);
    }
}
