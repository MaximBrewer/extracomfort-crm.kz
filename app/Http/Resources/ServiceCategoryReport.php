<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryReport extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        global $filter;

        return [
            'id' => $this->id,
            'sort' => $this->sort,
            'title' => $this->title,
            'services' => ServiceReport::collection(!empty($filter['services']) ? $this->services()->whereIn('id', $filter['services'])->get() : $this->services),
            'quantity' => $this->quantity,
            'sum' => $this->sum,
        ];
    }
}
