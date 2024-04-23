<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReminderSpecialistTimetable extends JsonResource
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
            'service' => new ReminderRecieptionService($this->service),
            'patient' => new ReminderRecieptionPatient($this->patient),
            'payments' => ReminderRecieptionPayment::collection($this->payments)
        ];
    }
}
