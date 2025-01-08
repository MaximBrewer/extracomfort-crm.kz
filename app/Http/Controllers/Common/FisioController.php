<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\FisioBookStoreRequest;
use App\Models\Direction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Fisio as ResourcesFisio;
use App\Http\Resources\FisioCategory as ResourcesFisioCategory;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Fisio;
use App\Models\FisioCategory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FisioController extends Controller
{
    public function index(Request $request, Branch $branch, $date = null)
    {
        try {
            $date = Carbon::parse($date ?: date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

        $data = [];
        $data['pagetitle'] = 'Запись в физиокабинет';
        $data['branch'] = $branch;
        $data['direction'] = new ResourcesDirection(Direction::where('isfisio', true)->first());
        $data['date'] = $date->format('d.m.Y');
        $data['books'] = ResourcesFisio::collection(Fisio::where('branch_id', $branch->id)->where('date', $date)->get());
        $data['dateText'] = $date->isoFormat('dddd, MMMM, D');
        $data['prevDate'] = (new Carbon($date))->subDay()->format('d.m.Y');
        $data['nextDate'] = (new Carbon($date))->addDay()->format('d.m.Y');
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['fisioCategories'] = ResourcesFisioCategory::collection(FisioCategory::all());
        return Inertia::render('Common/Fisio/Index', $data);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function book(FisioBookStoreRequest $request, Branch $branch, $date)
    {
        $date = Carbon::parse($date . ' ' . $request->time);
        $data = [
            'date' => $date->format("Y-m-d"),
            'time' => $date->format("H:i:s"),
            'fservice_id' => $request->fservice,
            'service_id' => $request->service,
            'comment' => $request->comment,
            'second' => !!$request->second,
            'branch_id' => $branch->id,
            'patient_id' => $request->patient,
            'recieption_id' => Auth::id(),
        ];

        try {
            DB::transaction(function () use ($data) {
                Fisio::create($data);
            });

        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => 'На это время записать нельзя!',
                // 'error' => $e->getMessage()
            ]);
        }
        DB::commit();

        return redirect()->back()->with('message', 'Запись добавлена');
    }
}
