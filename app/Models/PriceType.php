<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceType extends Model
{
    use HasFactory;
    /**
     * @param Simple $type
     * @return PriceType
     */
    public static function createByMl($type)
    {
        if (!$priceType = self::where('accounting_id', $type->id)->first()) {
            $priceType = new self;
            $priceType->accounting_id = $type->id;
        }
        $priceType->title = $type->name;
        $priceType->currency = (string)$type->Валюта;
        $priceType->save();
        return $priceType;
    }
}
