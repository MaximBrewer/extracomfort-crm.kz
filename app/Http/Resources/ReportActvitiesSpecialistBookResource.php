<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportActvitiesSpecialistBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->date,
            'patient' => $this->patient ? $this->patient->fullName : "",
            'service' => $this->service ? $this->service->title : "",
            'sum' => $this->payments()->sum('sum') / 100
        ];
    }
}
