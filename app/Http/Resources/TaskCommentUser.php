<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskCommentUser extends JsonResource
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
            'name' => $this->name,
            'avatar' => Storage::url($this->avatar),
            // 'role' => $this->role
        ];
        return $array;
    }
}
