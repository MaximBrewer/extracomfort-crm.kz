<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialistTizer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpecialistsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data['pagetitle'] = 'Специалисты';
        $data['specialists'] = SpecialistTizer::collection(User::where('role_id', 4)->with('directions')->paginate(1000));
        return Inertia::render('Recieption/Specialists', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function schedule(Request $request, User $specialist)
    {
        $data['pagetitle'] = 'Расписание специалиста ' . $specialist->fullName;
        if (!$specialist->schedule || $specialist->schedule === "null") {
            $specialist->schedule = User::getDayArray();
            $specialist->save();
        }
        $data['specialist'] = $specialist;
        return Inertia::render('Recieption/Specialist/Schedule', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function updateSchedule(Request $request, User $specialist)
    {
        $schedule = $specialist->schedule;
        foreach ($schedule as &$time) {
            if ($time['time'] === $request->time) {
                $time['days'][$request->day] = $request->status;
            }
        }
        $specialist->update([
            'schedule' => $schedule
        ]);
        return redirect()->back();
    }
}
