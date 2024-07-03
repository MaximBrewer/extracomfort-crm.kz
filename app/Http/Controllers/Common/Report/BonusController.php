<?php

namespace App\Http\Controllers\Common\Report;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bonus;
use App\Http\Resources\BookDebt;
use App\Http\Resources\DirectionWoWrapTizer;
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
use Inertia\Inertia;

class BonusController extends Controller
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
        $filter['consultant'] = (int)$request->consultant;
        $filter['service'] = $request->service ? explode("_", $request->service) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];
        $filter['start'] = $request->start ? Carbon::parse($request->start) : null;
        $filter['end'] = $request->end ? Carbon::parse($request->end) : null;
        $filter['branch'] = $branch->id;

        $patient = User::find($filter['patient']);
        $consultant = User::find($filter['consultant']);

        $users = null;

        if ($filter['start'] && $filter['end'] && $filter['consultant']) {
            $users = User::where('role_id', 2)
                ->where('created_at', '>=', $filter['start'])
                ->where('created_at', '<=', $filter['end'])
                ->where('consultant_id', $filter['consultant']);
        }

        $data = array_merge($this->getCommonData($request, $branch, 'bonus'), [
            'direction' => DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []),
            'service' => ServiceWoWrapTizer::collection(!empty($filter['service']) ? Service::whereIn('id', $filter['service'])->get() : []),
            'specialist' => ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []),
            'patient' => [
                'data' => $patient ? [
                    'value' => $patient->id,
                    'label' => trim($patient->fio . ($patient->birthdate ? (' ' . Carbon::parse($patient->birthdate)->format('d.m.Y')) : '') . ($patient->tin ? (' ' . $patient->tin) : ''))
                ] : null
            ],
            'consultant' => [
                'data' => $consultant ? [
                    'value' => $consultant->id,
                    'label' => trim($consultant->fio . ($consultant->birthdate ? (' ' . Carbon::parse($consultant->birthdate)->format('d.m.Y')) : '') . ($consultant->tin ? (' ' . $consultant->tin) : ''))
                ] : null
            ],
            'results' => Bonus::collection($users ? $users->orderBy('created_at')->with('booksPatient', function ($query) use ($filter) {
                $query->whereRaw('start=time')
                    ->where('status', 'completed')
                    ->where('date', '>=', $filter['start'])
                    ->where('date', '<=', $filter['end'])
                    ->where('branch_id', $filter['branch']);;
            })->get() : []),
        ]);

        return Inertia::render('Common/Reports/Bonus', $data);
    }
}
