<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookRecieptionService extends JsonResource
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
            'price' => $this->price,
            'direction' => $this->direction ? new BookRecieptionServiceDirection($this->direction) : ($this->category ? new BookRecieptionServiceDirection($this->category->direction) : null),
            'title' => $this->title
        ];
    }
}
