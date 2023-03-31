<?php

use Intervention\Image\ImageManagerStatic;

// 远程下载图片 并且生成缩略图 压缩  $img 远程图片地址 $save_path 本地存储地址  返回图片名称
function buildNeWImg($img, $save_path, $params)
{
    $imgUrl   = removeImgUrlParam($img);
    $filename = pathinfo($imgUrl, PATHINFO_BASENAME);

    // 下载
    downloadImage($imgUrl, $save_path);

    $mime = finfo_file(finfo_open(FILEINFO_MIME_TYPE), $save_path . $filename);
    if ($mime == 'application/x-empty') {
        return '';
    }

    // 图片压缩
    if (isset($params['width_proportion']) && $params['width_proportion'] > 0 && isset($params['height_proportion']) && $params['height_proportion'] > 0) {
        $img = ImageManagerStatic::make($save_path . $filename);
        // $img->resize($params['width_proportion'], $params['height_proportion']);
        $img->resize($img->getWidth() * $params['width_proportion'], $img->getHeight() * $params['height_proportion']);
        $img->save($save_path . $filename);
        $img->destroy();
    }

    // 图片水印
    if (isset($params['watermarking'])) {

    }

    return $filename;
    // return 'music_img/' . $filename;
}

// 去除图片?后面参数 获得真实图片地址
function removeImgUrlParam($imgUrl)
{
    $imgUrlArr = explode('?', $imgUrl);
    return $imgUrlArr[0];
}

// 远程下载图片 $url 远程图片路径 $save_path 本地存储路径 实际路径 不是url
function downloadImage($url, $save_path)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    $file = curl_exec($ch);
    curl_close($ch);
    saveAsImage($url, $file, $save_path);
}

function saveAsImage($url, $file, $save_path)
{
    $filename = pathinfo($url, PATHINFO_BASENAME);
    $dirname  = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_DIRNAME);

    // $path     = $_SERVER['DOCUMENT_ROOT'] . '/lewan/web/funplayApi/public/uploads/manager/img/music_img/';
    $fullpath = $save_path . $filename;

    // 如果目录不存在，则创建
    if (!is_dir($save_path)) {
        mkdir($save_path, 0777, true);
    }
    if (file_exists($fullpath)) {
        //$this->output->writeln("【已存在】输出路径" . $fullpath);
    } else {
        $resource = fopen($fullpath, 'a');
        fwrite($resource, $file);
        fclose($resource);
        //$this->output->writeln("【已保存】输出路径" . $fullpath);
    }
}
