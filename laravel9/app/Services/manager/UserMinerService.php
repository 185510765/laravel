<?php

namespace App\Services\manager;

use App\Models\manager\UserMiner;
use App\Services\manager\SysConfigService;

class UserMinerService
{
    public static function queryLevelMiner()
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

    public static function queryMinerList($params)
    {
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

    /**
     * ??????????????????????????????
     * @param {*} $params
     * @return {*}
     */
    public static function changeLevelDetails($params)
    {
        // 1?????????????????????????????????
        $sysConfig    = SysConfigService::getSysConfig();
        $miner_config = $sysConfig['miner_config'];
        $miner_config = json_decode($miner_config, true);

        // $found_key   = array_search($params['level'], array_column($miner_config, 'level'));
        $found_key   = collect($miner_config)->pluck('level')->search($params['level']);
        $minerResAry = $miner_config[$found_key];

        // 2????????????????????????????????????????????? ???????????????????????????
        $minerScopeSum = mt_rand($minerResAry['min'], $minerResAry['max']);

        // 3????????????????????? ??????????????? ?????????????????????????????????????????????????????? ???????????? ??????1 ??????5
        $scopeArray = randomSplit($minerScopeSum, 4, 1, 5);

        $minerArray = UserMinerService::getMinerAttr($minerScopeSum, $miner_config); // ????????????

        // 4?????????????????????
        UserMiner::where('id', $params['id'])
            ->update([
                'power'     => $scopeArray[0],
                'speed'     => $scopeArray[1],
                'stealth'   => $scopeArray[2],
                'lucky'     => $scopeArray[3],
                'scope_sum' => $minerScopeSum,
                'level'     => $minerArray['level'],
                'color'     => $minerArray['color'],
            ]);

        return success();
    }

    /**
     * ??????????????????
     * @param {int} $scope_sum ????????????????????????
     * @return {*}
     */
    protected static function getMinerAttr($scope_sum, $miner_config)
    {
        foreach ($miner_config as $key => $value) {
            if ($scope_sum >= $value['min'] && $scope_sum <= $value['max']) {
                $level = $value['level'];
                $color = $value['color'];
            }
        }

        return [
            'level' => $level,
            'color' => $color,
        ];
    }
}
