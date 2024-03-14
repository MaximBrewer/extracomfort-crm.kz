<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialistPatientCardBook extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr = [
            'id' => $this->id,
            'date' => $this->date,
            'start' => $this->start,
            'specialist' => [
                'name' => $this->specialist->name,
                'lastname' => $this->specialist->lastname,
                'surname' => $this->specialist->surname,
            ],
            'service' => [
                'direction' => [
                    'title' => $this->service->direction->name
                ],
                'title' => $this->service->title
            ],
        ];
        return $arr;
    }
}
