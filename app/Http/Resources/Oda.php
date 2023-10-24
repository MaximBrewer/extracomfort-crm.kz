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
        $arr['kraus'] = json_decode($arr['kraus']) ?? [];
        $arr['webber'] = json_decode($arr['webber']) ?? [];
        return $arr;
    }
}
