<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class User extends JsonResource
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;
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
            'role' => $this->role,
            'branch' => $this->branch ? new UserBranch($this->branch) : null,
            'locality' => $this->locality ? new UserBranch($this->locality) : null,
        ];
        return $array;
    }
}
