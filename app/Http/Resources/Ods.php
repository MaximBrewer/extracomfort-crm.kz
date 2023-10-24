<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Ods extends JsonResource
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

        foreach ($arr as $k => $v)
            if (strstr($k, '_option') || strstr($k, '_dyn'))
                $arr[$k] = json_decode($v);

        return $arr;
    }
}
