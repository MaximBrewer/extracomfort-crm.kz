<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TopUp extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['fullName'] = $this->user->fullName;
        $arr['rest'] = $this->user->topUps()->where('created_at', '<=', Carbon::parse($this->created_at))->sum('sum') / 100;
        $arr['created_at'] = Carbon::parse($this->created_at)->format('d.m.Y');
        return $arr;
    }
}
