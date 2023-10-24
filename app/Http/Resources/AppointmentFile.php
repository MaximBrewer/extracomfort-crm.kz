<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AppointmentFile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $array = [];
        $array['id'] = $this->id;
        $array['title'] = $this->title;
        $array['category_id'] = $this->category_id;
        $array['link'] = Storage::url($this->link);
        $array['ext'] = File::extension(Storage::path($this->link));
        return $array;
    }
}
