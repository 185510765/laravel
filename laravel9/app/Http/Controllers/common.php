<?php

function restful($code, $msg, $data = [])
{
    return json_encode([
        'code'    => $code,
        'message' => $msg,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE);

    // return response()->json([
    //     'code'    => $code,
    //     'message' => $msg,
    //     'data'    => $data,
    // ]);
}

function success($data = [])
{
    return restful(200, 'success', $data);
}

function error($msg = 'error')
{
    return restful(500, $msg);
}

// 不为空
function isEmpty($str)
{
    return $str === '' || $str === null;
}

/**
 * 将一个整数M分成N个整数 要求每个都在区间【minV, maxV】之间
 * @param {int} $minerScopeSum    整数数值
 * @param {int} $times            分成几个
 * @param {int} $min              范围最小值
 * @param {int} $max              范围最大值
 * @return {*}
 */
function randomSplit($minerScopeSum, $times, $min, $max)
{
    $resArray = [];

    while ($times > 0) {
        $minNum = max($min, $minerScopeSum - ($times - 1) * $max);
        $maxNum = min($max, $minerScopeSum - ($times - 1) * $min);

        $scope = mt_rand($minNum, $maxNum);

        $times -= 1;
        $minerScopeSum -= $scope;
        array_push($resArray, $scope);
    }

    return $resArray;
}
