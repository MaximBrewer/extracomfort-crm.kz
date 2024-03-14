<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialistPatientCard extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'lastname' => $this->lastname,
            'surname' => $this->surname,
            'birthdate' => $this->birthdate,
            'tin' => $this->tin,
            'gender' => $this->gender,
            'locality' => $this->locality,
            'addon' => $this->addon,
            'email' => $this->email,
            'comment' => $this->comment
        ];
    }
}
