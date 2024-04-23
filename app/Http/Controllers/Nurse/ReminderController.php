<?php

namespace App\Http\Controllers\Nurse;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReminderStoreRequest;
use App\Http\Requests\ReminderUpdateRequest;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Resources\ReminderDirection;
use App\Http\Resources\ReminderSpecialist;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionSpecialist;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\Specialist;
use App\Models\Reminder;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReminderController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function branch(User $patient, Branch $branch)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Расписание';
        $data['patient'] = $patient;
        $data['branch'] = $branch;
        $data['week'] = Carbon::now()->startOfWeek()->format('W');
        $data['specialists'] = Specialist::collection($branch->specialists);
        return Inertia::render('Recieption/Reminder/Branch/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function specialist(User $patient, Branch $branch, User $specialist, $year, $week)
    {
        if (!$specialist->schedule || $specialist->schedule === "null") {
            $specialist->schedule = User::getDayArray();
            $specialist->save();
        }
        $data = [];
        $weeks = [];
        $cnt = 0;
        $date = Carbon::now()->startOfWeek();
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        do {
            $weekday = new Carbon($date);
            $days = [];
            for ($i = 0; $i < 7; $i++) {
                $days[] = [
                    'date' => $weekday->format('d.m.Y'),
                    'today' => $weekday == Carbon::now()->startOfDay(),
                    'title' => $weekday->isoFormat('dddd, D')
                ];
                $weekday->addDay();
            }
            if ($week === $date->format('W')) {
                $startOfWeek = (new Carbon($date))->startOfWeek();
                $endOfWeek = (new Carbon($date))->endOfWeek();
            }
            $weeks[] = [
                'value' => $date->format('W'),
                'days' => $days,
                'label' => $date->isoFormat('MMMM, D') . ' - ' . $date->addDays(6)->isoFormat('MMMM, D')
            ];
            $date->addDay();
            ++$cnt;
        } while ($cnt < 8);

        $this->getCommonData($data);
        $data['reminders'] = ReminderSpecialist::collection($specialist->remindersSpecialist()->where('date', '>=', $startOfWeek)->where('date', '<=', $endOfWeek)->get());
        $data['specialists'] = $branch->specialists;
        $data['pagetitle'] = 'Расписание специалиста';
        $data['specialist'] = new Specialist($specialist);
        $data['patient'] = $patient;
        $data['branch'] = $branch;
        $data['week'] = $week;
        $data['year'] = $year;
        $data['weeks'] = $weeks;
        return Inertia::render('Recieption/Reminder/Branch/Specialist', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function direction(User $patient, Branch $branch, Direction $direction, $date)
    {
        $date = Carbon::parse($date);
        foreach ($direction->specialists as $specialist) {
            if (!$specialist->schedule || $specialist->schedule === "null") {
                $specialist->schedule = User::getDayArray();
                $specialist->save();
            }
        }

        $this->getCommonData($data);
        $data['specialists'] = DirectionSpecialist::collection($direction->specialists()
            ->with(['booksSpecialist' => function (HasMany $hasMany) use ($date) {
                $hasMany->where('date', $date);
            }])
            ->get());
        $data['pagetitle'] = 'Расписание направления';
        $data['patient'] = $patient;
        $data['branch'] = $branch;
        $data['direction'] = $direction;
        $data['services'] = $direction->services;
        $data['date'] = $date->format('d.m.Y');
        $data['dateText'] = $date->isoFormat('dddd, MMMM, D');
        $data['prevDate'] = (new Carbon($date))->subDay()->format('d.m.Y');
        $data['nextDate'] = (new Carbon($date))->addDay()->format('d.m.Y');
        return Inertia::render('Recieption/Reminder/Branch/Direction', $data);
    }

    /**
     * Common data for crud.
     */
    private function getCommonData(&$data)
    {
        $data['genders'] = [
            [
                'value' => 'male',
                'label' => 'Мужской',
            ], [
                'value' => 'female',
                'label' => 'Женский'
            ]
        ];

        $data['directions'] = ResourcesDirection::collection(Direction::all());
        $data['localities'] = ResourcesLocality::collection(Locality::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function status(Request $request, Reminder $Reminder)
    {
        $Reminder->update([
            'status' => $request->status
        ]);
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function payment(PaymentStoreRequest $request, Reminder $Reminder)
    {
        $Reminder->payments()->create($request->all());
        return redirect()->back();
    }
    /**
     * Show the form for creating a new resource.
     */
    public function store(ReminderStoreRequest $request, User $patient, Branch $branch, User $specialist)
    {

        $data = [
            'date' => Carbon::parse($request->date),
            'service_id' => $request->service,
            'duration' => $request->duration,
            'branch_id' => $request->branch->id,
            'patient_id' => $patient->id,
            'specialist_id' => $specialist->id,
            'recieption_id' => Auth::id(),
        ];

        try {
            DB::transaction(function () use ($request, $data, $specialist) {
                Reminder::create($data);
            });
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => 'На это время записать нельзя!',
                'error' => $e->getMessage()
            ]);
        }
        DB::commit();
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(ReminderUpdateRequest $request, Reminder $Reminder, User $patient, Branch $branch, User $specialist)
    {
    }
}
