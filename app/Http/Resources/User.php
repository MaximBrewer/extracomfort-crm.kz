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
            'email' => $this->email,
            'lastname' => $this->lastname,
            'surname' => $this->surname,
            'fullName' => $this->fullName,
            'avatar' => Storage::url(($this->gender ?: 'male') . '.jpg'),
            'role' => $this->role,
            'directions' => $this->directions ? Direction::collection($this->directions) : [],
            'branch' => $this->branch ? new UserBranch($this->branch) : null,
            'locality' => $this->locality ? new UserBranch($this->locality) : null,
        ];
        return $array;
    }
}
