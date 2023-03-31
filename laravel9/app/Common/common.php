<?php

function restful($code, $msg, $data = [])
{
    // return json_encode([
    //     'code'    => $code,
    //     'message' => $msg,
    //     'data'    => $data,
    // ], JSON_UNESCAPED_UNICODE);

    return response()->json([
        'code'    => $code,
        'message' => $msg,
        'data'    => $data,
    ]);
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

/**
 * 获取本周所有日期
 */
function get_week($time = '', $format = 'Y-m-d')
{
    $time = $time != '' ? $time : time();
    //获取当前周几
    $week = date('w', $time);
    $date = [];
    for ($i = 1; $i <= 7; $i++) {
        $diff     = (int) ($i - $week);
        $date[$i] = date($format, strtotime('+' . $diff . ' days', $time));
    }

    return array_values($date);
}

/**
 * 获取最近七天所有日期
 */
function get_weeks($time = '', $format = 'Y-m-d')
{
    $time = $time != '' ? $time : time();
    //组合数据
    $date = [];
    for ($i = 1; $i <= 7; $i++) {
        $diff     = (int) ($i - 7);
        $date[$i] = date($format, strtotime('+' . $diff . ' days', $time));
    }

    return array_values($date);
}

// 生成随机ip地址
function getIp()
{
    $ip_long = array(
        array('607649792', '608174079'), // 36.56.0.0-36.63.255.255
        array('1038614528', '1039007743'), // 61.232.0.0-61.237.255.255
        array('1783627776', '1784676351'), // 106.80.0.0-106.95.255.255
        array('2035023872', '2035154943'), // 121.76.0.0-121.77.255.255
        array('2078801920', '2079064063'), // 123.232.0.0-123.235.255.255
        array('-1950089216', '-1948778497'), // 139.196.0.0-139.215.255.255
        array('-1425539072', '-1425014785'), // 171.8.0.0-171.15.255.255
        array('-1236271104', '-1235419137'), // 182.80.0.0-182.92.255.255
        array('-770113536', '-768606209'), // 210.25.0.0-210.47.255.255
        array('-569376768', '-564133889'), // 222.16.0.0-222.95.255.255
    );
    $rand_key  = mt_rand(0, 9);
    return $ip = long2ip(mt_rand($ip_long[$rand_key][0], $ip_long[$rand_key][1]));
}

// 去除价格中的中文、斜杠/、钱符号
function getPrice($price)
{
    $value = '0.00';

    if (isset($price) && $price && $price != 'NULL') {
        $price = preg_replace('/[\x{4e00}-\x{9fa5}]/u', '', $price);
        $price = str_replace('/', '', $price);
        $price = str_replace('¥', '', $price);

        // 是否是金额
        if (preg_match('/^\d+(\.\d{1,2})?$/', $price)) {
            $value = $price;
        }
    }

    return $value;
}

/**
 * 日期 时:分:秒 转换成 秒
 * @param {*} $str 需要转换的日期
 * @param {*} $num 单位 0：毫秒  1：秒
 * @return {*}
 */
function getDayHourMinSec($timestamp)
{
    $days    = floor($timestamp / 86400); // 天数
    $hours   = floor(($timestamp % 86400) / 3600); // 小时
    $minutes = floor(($timestamp % 3600) / 60); // 分钟
    $seconds = $timestamp % 60; // 秒数

    return "$days:$hours:$minutes:$seconds"; // 输出结果，例如：18天18小时0分钟0秒
}
