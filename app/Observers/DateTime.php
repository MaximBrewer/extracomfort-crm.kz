<?php

namespace App\Observers;

class DateTime
{
    public function created(\App\Models\DateTime $model)
    {
        $this->updated($model);
    }

    public function updated(\App\Models\DateTime $model)
    {
        if($model->status === 'free'){

        }
    }
}
