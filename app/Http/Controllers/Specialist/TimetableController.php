<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookSpecialist;
use App\Http\Resources\BookSpecialistTimetable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TimetableController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request, $date = null)
    {
        try {
            $date = Carbon::parse($date ?: date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

        $specialist = User::find(Auth::id());

        $weekday = (new Carbon($date))->startOfWeek();
        $weekdays = [];
        for ($i = 0; $i < 7; $i++) {
            $weekdays[] = [
                'date' => $weekday->format('d.m.Y'),
                'today' => $weekday == Carbon::now()->startOfDay(),
                'selected' => $weekday == (new Carbon($date))->startOfDay(),
                'dateText' => $weekday->format('d'),
                'weekday' => $weekday->isoFormat('dd')
            ];
            $weekday->addDay();
        }

        $data['books'] = BookSpecialistTimetable::collection($specialist->books()->where('date', $date)->orderBy('time', 'asc')->get());
        $data['weekdays'] = $weekdays;
        $data['nextweek'] = (new Carbon($date))->endOfWeek()->addDay()->format('d.m.Y');
        $data['prevweek'] = (new Carbon($date))->startOfWeek()->subDay()->format('d.m.Y');
        $data['date'] = $date->format('d.m.Y');
        $data['dateText'] = $date->isoFormat('dddd, MMMM, D');

        $data['pagetitle'] = 'Расписание';
        return Inertia::render('Specialist/Timetable', $data);
    }
}
