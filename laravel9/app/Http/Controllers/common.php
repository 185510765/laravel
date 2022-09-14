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
