<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DirectionSpecialist extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $array['books'] = BookSpecialist::collection($array['books_specialist']);
        unset($array['books_specialist']);
        $array['fio'] = $this->fio;
        $array['directions'] = Direction::collection($this->directions);
        return $array;
    }
}
