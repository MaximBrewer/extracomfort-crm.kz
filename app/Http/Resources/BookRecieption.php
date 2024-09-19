<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookRecieption extends JsonResource
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
            'status' => $this->status,
            'duration' => $this->duration,
            'date' => $this->date,
            'time' => $this->time,
            'service' => new BookRecieptionService($this->service),
            'specialist' => new BookRecieptionSpecialist($this->specialist),
            'patient' => new BookRecieptionPatient($this->patient),
            'payments' => BookRecieptionPayment::collection($this->payments)
        ];
    }
}
