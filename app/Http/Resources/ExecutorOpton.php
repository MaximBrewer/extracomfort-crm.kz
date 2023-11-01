<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ExecutorOpton extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $array = [
            'id' => $this->id,
            'name' => trim($this->lastname . ' ' . $this->name . ' ' . $this->surname),
            'role' => $this->role->display_name,
            'avatar' => Storage::url(($this->gender ?: 'male') . '.jpg'),
        ];
        return $array;
    }
}
