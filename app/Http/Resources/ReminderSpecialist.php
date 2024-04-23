<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ReminderSpecialist extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        return [
            'id' => $array['id'],
            'start' => $array['start'],
            'duration' => $array['duration'],
            'date' => $array['date'],
            'time' => $array['time'],
            'patient' => new ReminderSpecialistPatient($array['patient'])
        ];
    }
}
