<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Models\Direction;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Models\User;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Book;
use App\Models\Branch;
use Illuminate\Database\Eloquent\Builder;
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
        global $filter;

        $filter = [];
        $filter['specialist'] = $request->specialist ? explode("_", $request->specialist) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];

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

        $books = $branch->books()->where('date', $date->format('Y-m-d'))->orderBy('time', 'asc');

        if (!empty($filter['specialist'])) $books = $books->whereIn('specialist_id', $filter['specialist']);
        if (!empty($filter['direction'])) {
            $direction = $filter['direction'];
            $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                $query->whereHas('category', function (Builder $query) use ($direction) {
                    $query->whereIn('direction_id', $direction);
                });
            });
        }

        $data['books'] = BookRecieption::collection($books->get());
        $data['branch'] = $branch;
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        $data['specialists'] = ResourcesUser::collection(User::where('role_id', 4)->get());
        $data['weekdays'] = $weekdays;
        $data['nextweek'] = (new Carbon($date))->endOfWeek()->addDay()->format('d.m.Y');
        $data['prevweek'] = (new Carbon($date))->startOfWeek()->subDay()->format('d.m.Y');
        $data['date'] = $date->format('d.m.Y');
        $data['dateText'] = $date->isoFormat('dddd, MMMM, D');
        $data['pagetitle'] = 'Расписание';

        $data['direction'] = DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []);
        $data['specialist'] = ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []);
        return Inertia::render('Recieption/Timetable', $data);
    }
}
