<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Reabilitation extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['lines1'] = json_decode($arr['lines1']) ?? null;
        $arr['lines2'] = json_decode($arr['lines2']) ?? null;

        return $arr;
    }
}
