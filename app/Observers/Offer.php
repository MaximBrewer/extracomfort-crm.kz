<?php

namespace App\Observers;

use App\Models\Facet;
use App\Models\Offer as ModelsOffer;
use Illuminate\Support\Facades\DB;

class Offer
{
    public function created(ModelsOffer $model)
    {
    }

    public function updated(ModelsOffer $model)
    {
        $this->setFacets($model);
        $this->setMinPrice($model);
    }

    public function deleting(ModelsOffer $model)
    {
        $this->setMinPrice($model);
        foreach (Facet::where('offer_id', $model->id) as $facet)  $facet->delete();
    }

    private function setMinPrice(ModelsOffer $model)
    {
        $minPrice = 1000000000;
        if ($model->product) {
            foreach ($model->product->offers as $offer) {
                foreach ($offer->prices as $price) {
                    $minPrice = $minPrice > $price->value ? $price->value : $minPrice;
                }
            }
            if ($minPrice < 1000000000) {
                $model->product->min_price = $minPrice;
                $model->product->saveQuietly();
            }
        }
    }

    private function setFacets(ModelsOffer $model)
    {
        DB::table('facets')->where('offer_id', $model->id)->delete();
        $product = $model->product;
        if ($product) foreach ($model->specifications as $specification) {
            Facet::firstOrCreate([
                'path' => $product->path,
                'product_id' => $product->id,
                'offer_id' => $model->id,
                'specification_id' => $specification->id,
                'specification_accounting_id' => $specification->accounting_id,
                'specification_value' => $specification->pivot->value,
                'specification_value_num' => (float)$specification->pivot->value * 10000,
            ]);
        }
    }
}
