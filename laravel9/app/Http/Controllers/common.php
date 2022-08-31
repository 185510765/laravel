<?php

function restful($code, $msg, $data = [])
{
    return json_encode([
        'code'    => $code,
        'message' => $msg,
        'data'    => $data,
    ]);
}

function success($data = [])
{
    return response()->json([
        'code' => 200,
        'msg'  => 'success',
        'data' => $data,
    ]);
}

function error($msg = 'error')
{
    return response()->json([
        'code' => 500,
        'msg'  => $msg,
        'data' => [],
    ]);
}
