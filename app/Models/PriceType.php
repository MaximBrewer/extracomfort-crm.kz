<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class PriceType extends Model
{
    use HasFactory;
    /**
     * @param Simple $type
     * @return PriceType
     */
    public static function createByMl($type)
    {
        if (!$priceType = self::whereHas('accountingIds', function (Builder $query) use ($type) {
            $query->where('accounting_id', $type->id);
        })->orWhere(function (Builder $query) use ($type) {
            $query->where('title', $type->name);
        })->first()) {
            $priceType = new self;
        }

        $priceType->title = $type->name;
        $priceType->currency = (string)$type->Валюта;
        $priceType->save();
        $priceType->accountingIds()->firstOrCreate(['accounting_id' =>  $type->id]);
        return $priceType;
    }

    public function accountingIds(): MorphMany
    {
        return $this->morphMany(AccountingId::class, 'entity');
    }
}
