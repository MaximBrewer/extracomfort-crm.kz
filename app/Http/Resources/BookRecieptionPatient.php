<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookRecieptionPatient extends JsonResource
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
            'fio' => $this->fio,
            'fullName' => $this->fullName,
            'email' => $this->email,
            'balance' => $this->balance,
            'phone' => $this->phone
        ];
    }
}
