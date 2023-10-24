<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Kinesio extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['interview'] = new Interview($this->interview);
        $arr['observation'] = json_decode($arr['observation']) ?? [
            'date1' =>  null,
            'date2' =>  null,
            'date3' =>  null,
            'table' =>  null,
        ];
        $arr['sensivity'] = json_decode($arr['sensivity']) ?? null;
        $arr['gmfcs'] = json_decode($arr['gmfcs']) ?? null;
        $arr['tonus'] = json_decode($arr['tonus']) ?? null;
        $arr['sp'] = json_decode($arr['sp']) ?? null;
        $arr['local'] = json_decode($arr['local']) ?? null;
        $arr['global'] = json_decode($arr['global']) ?? null;
        $arr['walking'] = json_decode($arr['walking']) ?? null;
        $arr['patterns'] = json_decode($arr['patterns']) ?? null;

        return $arr;
    }
}
