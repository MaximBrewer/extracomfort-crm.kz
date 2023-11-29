<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class Patient extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['age'] = Carbon::now()->diffInYears(Carbon::parse($arr['birthdate']));
        return $arr;
    }
}
