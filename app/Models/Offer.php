<?php

namespace App\Models;

use Bigperson\Exchange1C\Interfaces\OfferInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Offer extends Model implements OfferInterface
{
    use HasFactory;
    protected $guarded = [];

    public function getExportFields1c($context = null)
    {
        // return [
        //     'Ид' => 'id',
        //     'НомерВерсии' => 'version',
        // ];
    }
    /**
     * Возвращаем имя поля в базе данных, в котором хранится ID из 1с
     *
     * @return string
     */
    public static function getIdFieldName1c()
    {
        return 'accounting_id';
    }

    /**
     * Получение уникального идентификатора продукта в рамках БД сайта.
     *
     * @return int|string
     */
    public function getPrimaryKey()
    {
        return 'id';
    }
    /**
     * @return GroupInterface
     */

    public function getGroup1c()
    {
        return null;
        // return $this->product->category;
    }

    /**
     * offers.xml > ПакетПредложений > Предложения > Предложение > Цены.
     *
     * Цена товара,
     * К $price можно обратиться как к массиву, чтобы получить список цен (Цены > Цена)
     * $price->type - тип цены (offers.xml > ПакетПредложений > ТипыЦен > ТипЦены)
     *
     * @param \Zenwalker\CommerceML\Model\Price $price
     *
     * @return void
     */
    public function setPrice1c($price)
    {
        $priceType = PriceType::whereHas('accountingIds', function (Builder $query) use ($price) {
            $query->where('accounting_id', $price->getType()->id);
        })->first();
        $priceModel = Price::createByMl($price, $this, $priceType);
        $this->prices()->syncWithoutDetaching($priceModel->id);
    }

    /**
     * @param $types
     *
     * @return void
     */
    public static function createPriceTypes1c($types)
    {
        foreach ($types as $type) {
            PriceType::createByMl($type);
        }
    }

    /**
     * @param @param \Zenwalker\CommerceML\Model\Offer $offer
     *
     * @return \App\Moels\Offer
     */
    public static function createByMl($offer): Offer
    {
        $xmlId = (string)$offer->owner->offerPackage->xpath('//c:ИдКаталога')[0];
        return Offer::firstOrCreate(
            ['accounting_id' => $xmlId . '#' . $offer->id],
            [
                'title' => (string)$offer->name,
                'quantity' => (float)$offer->Количество,
            ]
        );
    }


    protected function quantity(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => floatVal($value / 100),
            set: fn ($value) => intVal($value * 100),
        );
    }


    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * offers.xml > ПакетПредложений > Предложения > Предложение > ХарактеристикиТовара > ХарактеристикаТовара.
     *
     * Характеристики товара
     * $name - Наименование
     * $value - Значение
     *
     * @param \Zenwalker\CommerceML\Model\Simple $specification
     *
     * @return void
     */
    public function setSpecification1c($specification)
    {
        $specificationModel = Specification::createByMl($specification);
        $this->specifications()->syncWithoutDetaching([$specificationModel->id => ['value' => (string)$specification->Значение]]);
    }

    public function prices(): BelongsToMany
    {
        return $this->belongsToMany(Price::class, 'offer_price');
    }

    public function specifications(): BelongsToMany
    {
        return $this->belongsToMany(Specification::class, 'offer_specification');
    }
}
