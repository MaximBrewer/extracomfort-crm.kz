<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportFromResource extends JsonResource
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
            'patient' => $this->patient ? $this->patient->fio : "",
            'service' => $this->service ? $this->service->title : "",
            'hear' => $this->patient && $this->patient->hear ? $this->patient->hear->name : "",
        ];
    }
}
