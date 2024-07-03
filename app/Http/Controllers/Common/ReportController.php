<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Common\Report\ActionsController;
use App\Http\Controllers\Common\Report\ActivitiesController;
use App\Http\Controllers\Common\Report\AttendanceController;
use App\Http\Controllers\Common\Report\BonusController;
use App\Http\Controllers\Common\Report\CanceledController;
use App\Http\Controllers\Common\Report\CommonController;
use App\Http\Controllers\Common\Report\CountbalanceController;
use App\Http\Controllers\Common\Report\DebtController;
use App\Http\Controllers\Common\Report\DetailedController;
use App\Http\Controllers\Common\Report\FromController;
use App\Http\Controllers\Common\Report\ReceptionController;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function common(Request $request, Branch $branch)
    {
        return (new CommonController)->__invoke($request, $branch);
    }

    public function detailed(Request $request, Branch $branch)
    {
        return (new DetailedController)->__invoke($request, $branch);
    }

    public function countbalance(Request $request, Branch $branch)
    {
        return (new CountbalanceController)->__invoke($request, $branch);
    }

    public function reception(Request $request, Branch $branch)
    {
        return (new ReceptionController)->__invoke($request, $branch);
    }

    public function canceled(Request $request, Branch $branch)
    {
        return (new CanceledController)->__invoke($request, $branch);
    }

    public function debt(Request $request, Branch $branch)
    {
        return (new DebtController)->__invoke($request, $branch);
    }

    public function bonus(Request $request, Branch $branch)
    {
        return (new BonusController)->__invoke($request, $branch);
    }

    public function from(Request $request, Branch $branch)
    {
        return (new FromController)->__invoke($request, $branch);
    }

    public function activities(Request $request, Branch $branch)
    {
        return (new ActivitiesController)->__invoke($request, $branch);
    }

    public function actions(Request $request, Branch $branch)
    {
        return (new ActionsController)->__invoke($request, $branch);
    }

    public function attendance(Request $request, Branch $branch)
    {
        return (new AttendanceController)->__invoke($request, $branch);
    }
}
