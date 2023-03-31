<?php

namespace App\Services\manager;

use App\Models\manager\SysConfig;

class SysConfigService
{
    /**
     * 根据参数 获取系统配置
     * @param {*} $params params字段 数组形式
     * @return {*} $params
     */
    public function getSysConfig()
    {
        // // 字段当键值
        // $list = SysConfig::all()->keyBy('config_name')->toArray();

        $list = SysConfig::all()->pluck('config_value', 'config_name')->toArray();
        return $list;
    }
}
