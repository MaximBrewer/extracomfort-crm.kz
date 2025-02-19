<?php

namespace App\Http\Controllers\Common\Report;

use App\Http\Controllers\Controller;
use App\Http\Resources\DirectionReceptionResource;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Http\Resources\ServiceWoWrapTizer;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Service;
use App\Models\User;
use App\Traits\CommonDataReport;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class ReceptionController extends Controller
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
        $filter['patient'] = (int) $request->patient;
        $filter['service'] = $request->service ? explode("_", $request->service) : [];
        $filter['direction'] = $request->direction ? explode("_", $request->direction) : [];
        $filter['start'] = $request->start ? Carbon::parse($request->start) : null;
        $filter['end'] = $request->end ? Carbon::parse($request->end) : null;
        $filter['branch'] = $branch->id;

        $patient = User::find($filter['patient']);

        $data = array_merge($this->getCommonData($request, $branch, 'reception'), [
            'direction' => DirectionWoWrapTizer::collection(!empty($filter['direction']) ? Direction::whereIn('id', $filter['direction'])->get() : []),
            'service' => ServiceWoWrapTizer::collection(!empty($filter['service']) ? Service::whereIn('id', $filter['service'])->get() : []),
            'specialist' => ResourcesUser::collection(!empty($filter['specialist']) ? User::whereIn('id', $filter['specialist'])->get() : []),
            'patient' => [
                'data' => $patient ? [
                    'value' => $patient->id,
                    'label' => trim($patient->fio . ($patient->birthdate ? (' ' . Carbon::parse($patient->birthdate)->format('d.m.Y')) : '') . ($patient->tin ? (' ' . $patient->tin) : ''))
                ] : null
            ],
            'results' => $filter['start'] && $filter['end'] ? DirectionReceptionResource::collection($filter['direction'] ? Direction::whereIn('id', $filter['direction'])->get() : Direction::all()) : ['data' => []]
        ]);

        return Inertia::render('Common/Reports/Reception', $data);
    }
}
