<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Models\Book;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class TimetableController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request, Branch $branch, $date = null)
    {
        try {
            $date = Carbon::parse($date ?: date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

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
        
        $data['books'] = BookRecieption::collection($branch->books()->where('date', $date->format('Y-m-d'))->orderBy('time', 'asc')->get());
        $data['branch'] = $branch;
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['weekdays'] = $weekdays;
        $data['nextweek'] = (new Carbon($date))->endOfWeek()->addDay()->format('d.m.Y');
        $data['prevweek'] = (new Carbon($date))->startOfWeek()->subDay()->format('d.m.Y');
        $data['date'] = $date->format('d.m.Y');
        $data['dateText'] = $date->isoFormat('dddd, MMMM, D');
        $data['pagetitle'] = 'Расписание';
        return Inertia::render('Recieption/Timetable', $data);
    }
}
