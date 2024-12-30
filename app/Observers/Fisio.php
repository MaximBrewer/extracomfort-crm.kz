<?php

namespace App\Observers;

use Carbon\Carbon;

class Fisio
{
    public function creating(\App\Models\Fisio $model)
    {
        \App\Models\Book::create([
            'date' => new Carbon($model->date),
            'start' => $model->time,
            'time' => $model->time,
            'duration' => 10,
            'branch_id' => $model->branch_id,
            'service_id' => $model->service_id,
            'patient_id' => $model->patient_id,
            'recieption_id' => $model->recieption_id,
        ]);
    }
}

// specialist_id, recieption_id, created_at, updated_at, status, repeated, canceled
// id, date, time, branch_id, service_id, patient_id, recieption_id, created_at, updated_at, second
