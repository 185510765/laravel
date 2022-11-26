<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserRoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);

        // TODO orm api 测试 数据
        // 1、如果没有toArray 是否会走资源文件
        // 2、和模型里面的配置是否有冲突
        // 3、和userRoleCollection 的区别
    }
}
