<?php

namespace App\Observers;

use App\Models\TopUp as ModelsTopUp;

class TopUp
{
    public function created(ModelsTopUp $model)
    {
        $model->user->calcBalance();
    }
}
