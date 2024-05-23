<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DirectionReceptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $specialists = [];
        $firstd = 0;
        $repeatd = 0;
        $totald = 0;

        foreach ($this->specialists as $specialist) {

            $first = 0;
            $repeat = 0;
            $total = 0;

            $specialists[] = [
                'id' => $specialist->id,
                'fullname' => $specialist->fullname,
                'first' => $first,
                'repeat' => $repeat,
                'total' => $total,
            ];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'specialists' => $specialists,
            'first' => $firstd,
            'repeat' => $repeatd,
            'total' => $totald,
        ];
    }
}
