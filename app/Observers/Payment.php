<?php

namespace App\Observers;

use App\Models\Payment as ModelsPayment;

class Payment
{
    public function created(ModelsPayment $model)
    {
        if ($model->method === 'balance') {
            $patient = $model->book->patient;
            $patient->balance -= $model->sum;
            $patient->save();
        }
    }
}
