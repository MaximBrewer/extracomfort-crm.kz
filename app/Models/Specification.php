<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Specification extends Model
{
    use HasFactory;

    public static function createByMl($specification)
    {
        if (!$specificationModel = self::where('accounting_id', Str::slug($specification->name))->first()) {
            $specificationModel = new self;
            $specificationModel->title = $specification->name;
            $specificationModel->accounting_id = Str::slug($specification->name);
            $specificationModel->save();
        }
        return $specificationModel;
    }
}
