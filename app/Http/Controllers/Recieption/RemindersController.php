<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\Reminder as ResourcesReminder;
use App\Models\Branch;
use App\Models\Direction;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Models\User;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Locality;
use App\Models\Reminder;
use Illuminate\Database\Eloquent\Builder;
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
        global $filter;

        $filter = [];
        $filter['specialist'] = $request->specialist ? explode("_", $request->specialist) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];

        try {

            $date = Carbon::parse($date ? '01.' . $date : date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

        $data['pagetitle'] = 'Брони';
        $data['year'] = $date->format('Y');
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        $data['specialists'] = ResourcesUser::collection(User::where('role_id', 4)->get());
        $data['date'] = $date->format('m.Y');
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['branch'] = $branch;
        $data['month'] = $date->format('m');
        $data['dateText'] = $date->isoFormat('MMMM YYYY');

        $data['localities'] = ResourcesLocality::collection(Locality::all());

        $data['prevyear'] = $date->format('m') < 7 ? '01.' . ($date->format('Y') - 1) : '06.' . ($date->format('Y'));
        $data['nextyear'] = $date->format('m') < 7 ? '07.' . ($date->format('Y')) : '01.' . ($date->format('Y') + 1);

        $start = $date->format(DATE_ATOM);
        $end = $date->addMonth()->format(DATE_ATOM);

        $reminders = $branch->reminders()->whereBetween('date', [$start, $end]);

        if (!empty($filter['specialist'])) $reminders = $reminders->whereIn('specialist_id', $filter['specialist']);
        if (!empty($filter['direction'])) {
            $direction = $filter['direction'];
            $books = $reminders->whereHas('service', function (Builder $query) use ($direction) {
                $query->whereHas('category', function (Builder $query) use ($direction) {
                    $query->whereIn('direction_id', $direction);
                });
            });
        }

        $data['reminders']  = ResourcesReminder::collection($reminders->get());
        $data['direction'] = DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []);
        $data['specialist'] = ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []);
        return Inertia::render('Recieption/Reminders', $data);
    }
}
