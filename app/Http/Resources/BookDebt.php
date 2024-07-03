<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookDebt extends JsonResource
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
            'start' => $this->start,
            'fio' => $this->fio,
            'status' => $this->status,
            'repeated' => $this->repeated,
            'duration' => $this->duration,
            'date' => $this->date,
            'time' => $this->time,
            'service' => new BookRecieptionService($this->service),
            'patient' => new BookRecieptionPatient($this->patient),
            'payment' => new BookRecieptionPayment($this->payment)
        ];
    }
}
