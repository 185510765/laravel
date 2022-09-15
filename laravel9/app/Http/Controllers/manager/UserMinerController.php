<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\manager\UserMienrChangeLevelRequest;
use App\Http\Requests\manager\UserMinerGetMinerList;
use App\Models\manager\UserMiner;

class UserMinerController extends Controller
{
    // 获取各种类型的矿工数量
    public function getLevelMiner()
    {
        $map[] = ['button_status', '<>', 2];

        $levelMap = [0, 1, 2, 3, 4, 5];

        $countAry = [];
        foreach ($levelMap as $key => $value) {
            if ($value == 0) {
                $count = UserMiner::where($map)->count();
            } else {
                $count = UserMiner::where($map)->where('level', $value)->count();
            }

            array_push($countAry, $count);
        }

        // $ary = UserMiner::where('button_status', '<>', 2)->select('level', DB::raw('count(*) as count'))->groupBy('level')->get();

        return success($countAry);
    }

    // 获取矿工列表
    public function getMinerList(UserMinerGetMinerList $request)
    {
        $params = $request->input();

        // $paginate = UserMiner::where($map)->with('user:id,nick_name,avatar_url,open_id,union_id')->orderBy('id', 'desc')->paginate($params['size']);

        $paginate = UserMiner::where(function ($query) use ($params) {
            $query->where('button_status', '<>', 2);

            if (isset($params['level']) && !isEmpty($params['level'])) {
                $query->where('level', $params['level']);
            }
            if (isset($params['status']) && !isEmpty($params['status'])) {
                $query->where('status', $params['status']);
            }
            if (!isEmpty($params['searchText'])) {
                $query->where('id', 'like', '%' . $params['searchText'] . '%')
                    ->orwhere('user_id', 'like', '%' . $params['searchText'] . '%')
                    ->orwhere('name', 'like', '%' . $params['searchText'] . '%');
            }
        })
            ->with(['user' => function ($query) use ($params) {
                $query->select('id', 'nick_name', 'avatar_url', 'open_id', 'union_id');

                if (!isEmpty($params['searchText'])) {
                    $query->where('nick_name', 'like', '%' . $params['searchText'] . '%');
                }
            }])
            ->orderBy('id', 'desc')
            ->paginate($params['size']);

        return success([
            'total' => $paginate->total(),
            'list'  => $paginate->items(),
        ]);
    }

    // 修改矿工等级
    public function changeLevel(UserMienrChangeLevelRequest $request)
    {
        $params = $request->input();
    }

}
