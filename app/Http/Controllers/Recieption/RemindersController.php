<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\Reminder as ResourcesReminder;
use App\Models\Branch;
use App\Models\Locality;
use App\Models\Reminder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RemindersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request, Branch $branch, $date = null)
    {
        try {

            $date = Carbon::parse($date ? '01.' . $date : date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

        $data['pagetitle'] = 'Напоминания';
        $data['year'] = $date->format('Y');
        $data['date'] = $date->format('m.Y');
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['branch'] = $branch;
        $data['month'] = $date->format('m');
        $data['dateText'] = $date->isoFormat('MMMM YYYY');

        $data['localities'] = ResourcesLocality::collection(Locality::all());

        $data['prevyear'] = $date->format('m') < 7 ? '01.' . ($date->format('Y') - 1) : '06.' . ($date->format('Y'));
        $data['nextyear'] = $date->format('m') < 7 ? '07.' . ($date->format('Y')) : '01.' . ($date->format('Y') + 1);

        DB::enableQueryLog();

        $start = $date->format(DATE_ATOM);
        $end = $date->addMonth()->format(DATE_ATOM);

        $data['reminders']  = ResourcesReminder::collection($branch->reminders()->whereBetween('date', [$start, $end])->get());
        return Inertia::render('Recieption/Reminders', $data);
    }
}