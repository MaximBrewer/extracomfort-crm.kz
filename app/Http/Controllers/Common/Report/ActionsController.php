<?php

namespace App\Http\Controllers\Common\Report;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookDebt;
use App\Http\Resources\DirectionReport;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Http\Resources\ReportActvitiesResource;
use App\Http\Resources\ServiceWoWrapTizer;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Service;
use App\Models\User;
use App\Traits\CommonDataReport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use stdClass;

class ActionsController extends Controller
{
    use CommonDataReport;
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Branch $branch)
    {
        global $filter;

        $filter = [];
        $filter['specialist'] = Auth::user()->role->name === 'specialist' ? [Auth::id()] : ($request->specialist ? explode("_", $request->specialist) : []);
        $filter['patient'] = (int)$request->patient;
        $filter['service'] = $request->service ? explode("_", $request->service) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];
        $filter['start'] = $request->start ? Carbon::parse($request->start) : null;
        $filter['end'] = $request->end ? Carbon::parse($request->end) : null;
        $filter['branch'] = $branch->id;

        $patient = User::find($filter['patient']);


        $books = null;

        if ($filter['start'] && $filter['end']) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where(function (Builder $query) {
                    $query->whereDoesntHave('payment')
                        ->orWhereHas('payment', function (Builder $q) {
                            $q->whereRaw('price <> sum');
                        });
                })
                ->where('date', '>=', $filter['start'])
                ->where('date', '<=', $filter['end'])
                ->where('branch_id', $branch->id);
            if (!empty($filter['specialist'])) $books = $books->whereIn('specialist_id', $filter['specialist']);
            if (!empty($filter['patient'])) $books = $books->where('patient_id', $filter['patient']);
            if (!empty($filter['service'])) $books = $books->whereIn('service_id', $filter['service']);
            if (!empty($filter['direction'])) {
                $direction = $filter['direction'];
                $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                    $query->whereHas('category', function (Builder $query) use ($direction) {
                        $query->whereIn('direction_id', $direction);
                    });
                });
            }
        }

        $directions = !empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : Direction::all();

        $results = $directions->map(function ($direction) use ($request) {

            $direction->specialists = (array)$request->specialists ? $direction->specialists->filter(function ($specialist) use ($request) {
                return in_array($specialist->id, (array)$request->specialists);
            }) : $direction->specialists;

            $object = new stdClass;
            $object->title = $direction->title;
            $object->specialists = $direction->specialists->map(function ($specialist) use ($direction, $request) {

                $start = $request->start ? Carbon::parse($request->start) : null;
                $end = $request->end ? Carbon::parse($request->end) : null;

                $object = new stdClass;
                $object->fullName = $specialist->fullName;
                $object->books = new Collection();

                if ($start && $end) {
                    $books = Book::whereRaw('start=time')
                        ->where('status', 'completed')
                        ->where('date', '>=', $start)
                        ->where('specialist_id', $specialist->id)
                        ->where('date', '<=', $end);
                    $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                        $query->whereHas('category', function (Builder $query) use ($direction) {
                            $query->where('direction_id', $direction->id);
                        });
                    });
                    $object->books = $books->get();
                }

                return $object;
            });
            return $object;
        });

        $data = array_merge($this->getCommonData($request, $branch, 'actions'), [
            'direction' => DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []),
            'service' => ServiceWoWrapTizer::collection(!empty($filter['service']) ? Service::whereIn('id', $filter['service'])->get() : []),
            'specialist' => ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []),
            'patient' => [
                'data' => $patient ? [
                    'value' => $patient->id,
                    'label' => trim($patient->fio . ($patient->birthdate ? (' ' . Carbon::parse($patient->birthdate)->format('d.m.Y')) : '') . ($patient->tin ? (' ' . $patient->tin) : ''))
                ] : null
            ],
            'results' => ReportActvitiesResource::collection($results),
        ]);

        return Inertia::render('Common/Reports/Actions', $data);
    }
}
