<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Oda extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['triggers'] = json_decode($arr['triggers']) ?? [];
        $arr['viscers'] = json_decode($arr['viscers']) ?? [];
        $arr['i2lines'] = json_decode($arr['i2lines']) ?? [];
        $arr['i3lines'] = json_decode($arr['i3lines']) ?? [];
        $arr['i4lines'] = json_decode($arr['i4lines']) ?? [];
        $arr['kraus'] = json_decode($arr['kraus']) ?? [];
        $arr['webber'] = json_decode($arr['webber']) ?? [];
        return $arr;
    }
}
