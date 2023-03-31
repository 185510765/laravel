<?php

/**
 * @param string $url post请求地址
 * @param array $params
 * @return mixed
 */
function curl_post($url, array $params = array())
{
    $data_string = json_encode($params);
    $ch          = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt(
        $ch, CURLOPT_HTTPHEADER,
        array(
            'Content-Type: application/json',
        )
    );

    // 代理 测试抓包
    // curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1");
    // curl_setopt($ch, CURLOPT_PROXYPORT, "8090");

    $data = curl_exec($ch);
    curl_close($ch);
    return ($data);
}

// post 带请求头
function curl_post_header($url, $params, $header = [])
{
    $data_string = json_encode($params);
    $ch          = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header); // 定义header

    // // 代理 测试抓包
    // curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1");
    // curl_setopt($ch, CURLOPT_PROXYPORT, "8090");

    $data = curl_exec($ch);
    curl_close($ch);
    return ($data);
}

// post 带请求头
function curl_post_header_urlencoded($url, $params, $header = [])
{
    // $data_string = json_encode($params);
    $data_string = $params;
    $ch          = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header); // 定义header

    // 代理 测试抓包
    // curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1");
    // curl_setopt($ch, CURLOPT_PROXYPORT, "8090");

    $data = curl_exec($ch);
    curl_close($ch);
    return ($data);
}

// put 带请求头
function curl_put_header($url, $params, $header = [])
{
    $data_string = json_encode($params);
    $ch          = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); //定义请求类型，当然那个提交类型那一句就不需要了
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header); // 定义header

    $data = curl_exec($ch);
    curl_close($ch);
    return ($data);
}

function curl_post_raw($url, $rawData)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $rawData);
    curl_setopt(
        $ch, CURLOPT_HTTPHEADER,
        array(
            'Content-Type: text',
        )
    );
    $data = curl_exec($ch);
    curl_close($ch);
    return ($data);
}

/**
 * @param string $url get请求地址
 * @param int $httpCode 返回状态码
 * @return mixed
 */
function curl_get($url, &$httpCode = 0)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //不做证书校验,部署在linux环境下请改为true
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

    // 代理 测试抓包
    // curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1");
    // curl_setopt($ch, CURLOPT_PROXYPORT, "8090");

    $file_contents = curl_exec($ch);
    $httpCode      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

// get请求 带请求头
function curl_get_header($url, $header, &$httpCode = 0)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //不做证书校验,部署在linux环境下请改为true
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header); // 定义header

    // 代理 测试抓包
    // curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1");
    // curl_setopt($ch, CURLOPT_PROXYPORT, "8090");

    $file_contents = curl_exec($ch);
    $httpCode      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

// 获取响应头(Response Header)方法
function get_head($url)
{
    $headers = [];
    $ch      = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADERFUNCTION,
        function ($curl, $header) use (&$headers) {
            $len    = strlen($header);
            $header = explode(':', $header, 2);
            if (count($header) < 2) // ignore invalid headers
            {
                return $len;
            }

            $headers[strtolower(trim($header[0]))][] = trim($header[1]);

            return $len;
        }
    );
    $response = curl_exec($ch);

    return $headers;
}
