<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportAttendanceResource extends JsonResource
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
            'specialist' => $this->specialist ? $this->specialist->fullName : "",
            'service' => $this->service->title,
            'pay' => '', // уточнить
            'recieption' => $this->recieption ? $this->recieption->fullName : "",
        ];
    }
}
