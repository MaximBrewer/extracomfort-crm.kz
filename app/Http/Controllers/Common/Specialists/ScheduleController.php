<?php

namespace App\Http\Controllers\Common\Specialists;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialistTizer;
use App\Models\Branch;
use App\Models\DateTime;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\Branch as ResourcesBranch;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Branch $branch, User $specialist)
    {
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['pagetitle'] = "Расписание специалиста $specialist->fullName";
        $data['specialist'] = $specialist;
        $data['schedule'] = $specialist->getSchedule($branch);
        $data['branch'] = $branch;
        $data['startOfWeek'] = (new Carbon)->startOfWeek()->format("Y-m-d");
        return Inertia::render('Common/Specialist/Schedule', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function update(Request $request, Branch $branch, User $specialist)
    {
        $datetime = DateTime::find($request->id);
        $datetime->status = $request->status;
        $datetime->save();
        return redirect()->back();
    }

}
