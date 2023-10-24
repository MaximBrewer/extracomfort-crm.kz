<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function values(): HasMany
    {
        return $this->hasMany(PropertyValue::class);
    }

    public static function createByMl($property)
    {
        $propertyModel = Property::firstOrCreate(
            ['accounting_id' => (string)$property->Ид],
            ['title' => (string)$property->Наименование]
        );
        // if (!empty($property->ВариантыЗначений)) foreach ($property->ВариантыЗначений as $value) {
        //     $propertyValueModel = PropertyValue::firstOrCreate(
        //         ['accounting_id' => (string)$property->Ид],
        //         ['title' => (string)$property->Наименование],
        //         ['property_id' => $propertyModel->id]
        //     );
        // }
        return $propertyModel;
    }
}
