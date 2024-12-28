<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specialist = Auth::user();
        $data['pagetitle'] = 'Расписание специалиста ' . $specialist->fullName;
        if (!$specialist->schedule || $specialist->schedule === "null") {
            $specialist->schedule = User::getDayArray();
            $specialist->save();
        }
        $data['specialist'] = $specialist;
        $data['startOfWeek'] = (new Carbon())->startOfWeek()->format("Y-m-d");
        return Inertia::render('Specialist/Schedule', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $specialist = Auth::user();

        $schedule = $specialist->schedule;
        foreach ($schedule as &$time) {
            if ($request->time &&  $request->day)
                if ($time['time'] === $request->time) {
                    $time['days'][$request->day] = $request->status;
                }
            if ($request->items) {
                foreach ($request->items as $s) {
                    if ($time['time'] === $s['time']) {
                        $time['days'][$s['day']] = $request->status;
                    }
                }
            }
        }
        $specialist->schedule = $schedule;
        $specialist->save();

        return redirect()->back();
    }
}
