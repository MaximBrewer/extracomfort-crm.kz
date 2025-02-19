<?php

namespace App\Http\Controllers\Common\Report;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Http\Resources\ServiceWoWrapTizer;
use App\Http\Resources\TopUp as ResourcesTopUp;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Service;
use App\Models\TopUp;
use App\Models\User;
use App\Traits\CommonDataReport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CommonController extends Controller
{
    use CommonDataReport;
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Branch $branch)
    {
        global $filter;

        $filter = [];
        $filter['specialist'] = $request->specialist ? explode("_", $request->specialist) : [];
        $filter['patient'] = (int)$request->patient;
        $filter['service'] = $request->service ? explode("_", $request->service) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];
        $filter['start'] = $request->start ? Carbon::parse($request->start) : null;
        $filter['end'] = $request->end ? Carbon::parse($request->end) : null;
        $filter['branch'] = $branch->id;

        $books = null;
        $topups = null;

        if ($filter['start'] && $filter['end']) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $filter['start'])
                ->where('date', '<=', $filter['end'])
                ->where('branch_id', $branch->id);
            $topups = TopUp::where('created_at', '>=', $filter['start'])
                ->where('created_at', '<=', $filter['end']);
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


        $patient = User::find($filter['patient']);

        // DB::enableQueryLog();
        $data = array_merge($this->getCommonData($request, $branch, 'common'), [
            'direction' => DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []),
            'service' => ServiceWoWrapTizer::collection(!empty($filter['service']) ? Service::whereIn('id', $filter['service'])->get() : []),
            'specialist' => ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []),
            'patient' => [
                'data' => $patient ? [
                    'value' => $patient->id,
                    'label' => trim($patient->fio . ($patient->birthdate ? (' ' . Carbon::parse($patient->birthdate)->format('d.m.Y')) : '') . ($patient->tin ? (' ' . $patient->tin) : ''))
                ] : null
            ],
            'books' => BookRecieption::collection($books ? $books->orderBy('date')->with('service')->with('patient')->with('payments')->get() : []),
            'topups' => ResourcesTopUp::collection($topups ? $topups->orderBy('created_at')->get() : [])
        ]);
        // dd(DB::getQueryLog());

        return Inertia::render('Common/Reports/Common', $data);
    }
}
