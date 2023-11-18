<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookSpecialistPatient extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $fio = '';
        if ($array['lastname'])   $fio .= $array['lastname'];
        if ($array['name'])  $fio .= ' ' . mb_substr($array['name'], 0, 1) . '.';
        if ($array['surname'])  $fio .= ' ' . mb_substr($array['surname'], 0, 1) . '.';

        return [
            'id' => $array['id'],
            'fio' => $fio,
            'email' => $array['email'],
            'phone' => $array['phone'],
        ];
    }
}
