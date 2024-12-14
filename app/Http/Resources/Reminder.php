<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Reminder extends JsonResource
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
            'date' => $this->date,
            'comment' => $this->comment,
            'service' => new ReminderRecieptionService($this->service),
            'specialist' => new ReminderRecieptionSpecialist($this->specialist),
            'patient' => new ReminderRecieptionPatient($this->patient)
        ];
    }
}
