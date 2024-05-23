<?php

namespace App\Traits;

use App\Http\Requests\PatientTopUpRequest;
use App\Http\Requests\PatientWithDrawRequest;
use App\Http\Resources\ExecutorOpton;
use App\Http\Resources\Task as ResourcesTask;
use App\Models\Task;
use App\Models\TopUp;
use App\Models\WithDraw;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait Balance
{
    /**
     * Update the specified resource in storage.
     */
    public function topup(PatientTopUpRequest $request, User $patient)
    {
        TopUp::create([
            'recieption_id' => Auth::id(),
            'user_id' => $patient->id,
            'sum' => $request->sum,
            'paymethod' => $request->paymethod
        ]);
        return redirect()->back();
    }


    /**
     * Update the specified resource in storage.
     */
    public function withdraw(PatientWithDrawRequest $request, User $patient)
    {
        TopUp::create([
            'recieption_id' => Auth::id(),
            'user_id' => $patient->id,
            'sum' => -$request->sum,
            'paymethod' => 'cache'
        ]);
        return redirect()->back();
    }
}
