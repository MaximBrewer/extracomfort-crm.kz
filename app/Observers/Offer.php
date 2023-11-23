<?php

namespace App\Observers;

use App\Models\Facet;
use App\Models\Offer as ModelsOffer;

class Offer
{
    public function created(ModelsOffer $model)
    {
        $this->setFacets($model);
        $this->setMinPrice($model);
    }

    public function updated(ModelsOffer $model)
    {
        $this->setFacets($model);
        $this->setMinPrice($model);
    }

    public function deleted(ModelsOffer $model)
    {
        foreach (Facet::where('offer_id', $model->id) as $facet)  $facet->delete();
    }

    private function setMinPrice(ModelsOffer $model)
    {
        $minPrice = 1000000000;
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

    private function setFacets(ModelsOffer $model)
    {
        foreach ($model->specifications as $specification) {
            $category = null;
            $subcategory = null;
            $subsubcategory = null;
            if ($model->category) {
                if ($model->category->parent && $model->category->parent->parent) {
                    $category = $model->category->parent->parent->id;
                    $subcategory = $model->category->parent->id;
                    $subsubcategory = $model->category->id;
                } elseif ($model->category->parent) {
                    $category = $model->category->parent->id;
                    $subcategory = $model->category->id;
                } else {
                    $category = $model->category->id;
                }
            }
            Facet::firstOrCreate([
                'category_id' => $category,
                'subcategory_id' => $subcategory,
                'subsubcategory_id' => $subsubcategory,
                'product_id' => $model->id,
                'offer_id' => $model->id,
                'specification_id' => $specification->id,
                'specification_accounting_id' => $specification->accounting_id,
                'specification_value' => $specification->pivot->value,
                'specification_value_num' => (float)$specification->pivot->value * 10000,
            ]);
        }
    }
}
