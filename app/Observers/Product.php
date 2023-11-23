<?php

namespace App\Observers;

use App\Models\Facet;
use App\Models\Product as ModelsProduct;

class Product
{
    public function created(ModelsProduct $model)
    {
        $this->setFacets($model);
        $this->setMinPrice($model);
    }

    public function updated(ModelsProduct $model)
    {
        $this->setFacets($model);
        $this->setMinPrice($model);
    }

    private function setMinPrice(ModelsProduct $model)
    {

        $minPrice = 1000000000;
        foreach ($model->offers as $offer) {
            foreach ($offer->prices as $price) {
                $minPrice = $minPrice > $price->value ? $price->value : $minPrice;
            }
        }
        if ($minPrice < 1000000000) {
            $model->min_price = $minPrice;
            $model->saveQuietly();
        }
    }

    public function deleted(ModelsProduct $model)
    {
        foreach (Facet::where('product_id', $model->id) as $facet)  $facet->delete();
    }

    private function setFacets(ModelsProduct $model)
    {
        foreach ($model->offers as $offer) {
            foreach ($offer->specifications as $specification) {

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
                    'offer_id' => $offer->id,
                    'specification_id' => $specification->id,
                    'specification_accounting_id' => $specification->accounting_id,
                    'specification_value' => $specification->pivot->value,
                    'specification_value_num' => (float)$specification->pivot->value * 10000,
                ]);
            }
        }
    }
}
