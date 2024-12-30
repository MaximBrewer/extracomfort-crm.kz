<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookStoreRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Resources\BookDirection;
use App\Http\Resources\BookSpecialist;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionSpecialist;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\Specialist as ResourcesSpecialist;
use App\Models\Specialist;
use App\Models\Book;
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

class BookController extends Controller
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
        $data['specialists'] = Specialist::with('directions')->get();
        return Inertia::render('Recieption/Book/Branch/Index', $data);
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
        $books = $specialist->booksSpecialist()->where('date', '>=', $startOfWeek)->where('status', '<>', 'canceled')->where('date', '<=', $endOfWeek)->get();
        $data['books'] = BookSpecialist::collection($books);
        $data['specialists'] = Specialist::with('directions')->get();
        $data['pagetitle'] = 'Расписание специалиста';
        $data['specialist'] = new ResourcesSpecialist($specialist);
        $data['schedule'] = $specialist->getSchedule($branch, $startOfWeek, $endOfWeek);
        $data['patient'] = $patient;
        $data['branch'] = $branch;
        $data['week'] = $week;
        $data['year'] = $year;
        $data['weeks'] = $weeks;
        return Inertia::render('Recieption/Book/Branch/Specialist', $data);
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
            ->with([
                'booksSpecialist' => function (HasMany $hasMany) use ($date) {
                    $hasMany->where('date', $date);
                }
            ])
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
        return Inertia::render('Recieption/Book/Branch/Direction', $data);
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
            ],
            [
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
    public function status(Request $request, Book $book)
    {
        try {
            $date = Carbon::parse($book->date)->format("Y-m-d H:i:s");
            $books = Book::where('date', $date)
                ->where('start', $book->start)
                ->where('created_at', $book->created_at)
                ->where('branch_id', $book->branch_id)
                ->where('service_id', $book->service_id)
                ->where('patient_id', $book->patient_id)
                ->where('specialist_id', $book->specialist_id)
                ->get();
            foreach ($books as $b) {
                $b->update([
                    'canceled' => $request->status === 'canceled' ? time() : 0,
                    'status' => $request->status
                ]);
            }
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => 'На это время уже есть запись!',
                'error' => $e->getMessage()
            ]);
        }
        DB::commit();
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function payment(PaymentStoreRequest $request, Book $book)
    {
        $data = $request->all();
        if ($data['method'] === 'free') {
            unset($data['sum']);
            unset($data['prepay']);
        }
        $book->payments()->create($data);
        return redirect()->back();
    }
    /**
     * Show the form for creating a new resource.
     */
    public function store(BookStoreRequest $request, User $patient, Branch $branch, User $specialist)
    {
        $shedule = $specialist->schedules()->where('branch_id', $branch->id)->first();

        if (!$request->date) {
            $date = Carbon::createFromDate($request->year . "-01-01 00:00:00");
            $date->addWeeks($request->week - 1);
            $date->addDays($request->day);
            $date = Carbon::parse($date->format('Y-m-d' . ' ' . $request->time . ':00'));
        } else {
            $date = Carbon::parse($request->date . ' ' . $request->time . ':00');
        }
        $data = [
            'date' => $date->format("Y-m-d"),
            'time' => $date->format("H:i:s"),
            'start' => $date->format("H:i:s"),
            'service_id' => $request->service,
            'duration' => $request->duration,
            'branch_id' => $request->branch->id,
            'patient_id' => $patient->id,
            'specialist_id' => $specialist->id,
            'recieption_id' => Auth::id(),
        ];

        try {
            DB::transaction(function () use ($request, $date, $data, $shedule) {
                for ($i = 0; ceil($i < ($request->duration / 5)); ++$i) {
                    $sdate = (new Carbon($date))->addMinutes($i * 5);
                    if ($shedule->datetimes()->where('datetime', $sdate)->first()->status === 'rest') {
                        DB::rollBack();
                        return redirect()->back()->withErrors(['duration' => 'Выходной!']);
                    }
                    $data['date'] = $sdate->format("Y-m-d");
                    $data['time'] = $sdate->format("H:i:s");
                    Book::create($data);
                }
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
    public function update(BookUpdateRequest $request, Book $book, User $patient, Branch $branch, User $specialist)
    {
    }
}
