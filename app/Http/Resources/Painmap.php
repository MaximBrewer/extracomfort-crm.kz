<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Painmap extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['lines'] = json_decode($arr['lines']);
        $arr['sideeffects'] = json_decode($arr['sideeffects']);
        $arr['paindata'] = json_decode($arr['paindata']);
        $arr['repeatpaindata'] = json_decode($arr['repeatpaindata']);
        $arr['dynamicpaindata'] = json_decode($arr['dynamicpaindata']);
        return $arr;
    }
}