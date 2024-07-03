<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Bonus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $array['books'] = $this->booksPatient ? BookRecieption::collection($this->booksPatient) : [];
        unset($array['books_patient']);
        $array['fio'] = $this->fio;
        $array['full_name'] = $this->full_name;
        return $array;
    }
}
