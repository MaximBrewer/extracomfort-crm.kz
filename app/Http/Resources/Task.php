<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Task extends JsonResource
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
            'title' => $this->title,
            'desc' => $this->desc,
            'data' => $this->data,
            'range' => $this->range,
            'deadline' => $this->deadline,
            'start' => $this->start,
            'status_id' => $this->status_id,
            'user' => new TaskUser($this->user),
            'users' => TaskUser::collection($this->users),
            'oldfiles' => TaskFile::collection($this->files),
            'comments' => $this->comments()->count(),
        ];
        return $array;
    }
}
