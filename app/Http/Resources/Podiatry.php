<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class Podiatry extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = parent::toArray($request);
        $arr['insoleslines'] = json_decode($arr['insoleslines']) ?? [];
        $arr['insoleselements'] = json_decode($arr['insoleselements']) ?? null;
        $arr['fpi'] = json_decode($arr['fpi']) ?? null;
        $arr['extensions'] = json_decode($arr['extensions']) ?? null;
        $arr['ledges'] = json_decode($arr['ledges']) ?? null;
        $arr['shoeslines'] = json_decode($arr['shoeslines']) ?? [];
        $arr['shoeselements'] = json_decode($arr['shoeselements']) ?? null;
        $arr['shoesnote'] = json_decode($arr['shoesnote']) ?? null;
        $arr['shoesnote'] = json_decode($arr['shoesnote']) ?? null;

        $file = json_decode($this->file);
        if ($file) {
            if (is_array($file)) $file = $file[0];
            $file->href = Storage::url($file->download_link);
            $file->name = $file->original_name;
        }
        $arr['file'] = $file;

        return $arr;
    }
}
