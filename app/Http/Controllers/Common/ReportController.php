<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Common\Report\CanceledController;
use App\Http\Controllers\Common\Report\CommonController;
use App\Http\Controllers\Common\Report\CountbalanceController;
use App\Http\Controllers\Common\Report\DetailedController;
use App\Http\Controllers\Common\Report\ReceptionController;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionReceptionResource;
use App\Http\Resources\DirectionReport;
use App\Http\Resources\DirectionSpecialist;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Http\Resources\Patient;
use App\Http\Resources\ReportActvitiesResource;
use App\Http\Resources\ReportAttendanceResource;
use App\Http\Resources\ReportBonusResource;
use App\Http\Resources\ReportFromResource;
use App\Http\Resources\ServiceWoWrapTizer;
use App\Http\Resources\TopUp as ResourcesTopUp;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Hear;
use App\Models\Service;
use App\Models\TopUp;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use stdClass;

class ReportController extends Controller
{
    public function common(Request $request, Branch $branch)
    {
        return (new CommonController)->__invoke($request, $branch, $this->getCommonData($request, $branch, 'common'));
    }

    public function detailed(Request $request, Branch $branch)
    {
        return (new DetailedController)->__invoke($request, $branch, $this->getCommonData($request, $branch, 'detailed'));
    }

    public function countbalance(Request $request, Branch $branch)
    {
        return (new CountbalanceController)->__invoke($request, $branch, $this->getCommonData($request, $branch, 'countbalance'));
    }

    public function reception(Request $request, Branch $branch)
    {
        return (new ReceptionController)->__invoke($request, $branch, $this->getCommonData($request, $branch, 'reception'));
    }

    public function canceled(Request $request, Branch $branch)
    {
        return (new CanceledController)->__invoke($request, $branch, $this->getCommonData($request, $branch, 'canceled'));
    }

    public function actions(Request $request, Branch $branch)
    {
        $direction = (int)$request->direction ?  Direction::find((int)$request->direction) : null;

        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $books = null;
        if ($direction && $start && $end) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end);

            $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                $query->whereHas('category', function (Builder $query) use ($direction) {
                    $query->where('direction_id', $direction->id);
                });
            });
        }

        $data = array_merge($this->getCommonData($request, $branch, 'actions'), [
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'results' => DirectionReport::collection($start && $end ? ($direction ? Direction::where('id', $direction->id)->get() : Direction::all()) : []),
        ]);
        return Inertia::render('Common/Reports/Actions', $data);
    }

    public function activities(Request $request, Branch $branch)
    {

        $direction = (int)$request->direction ? Direction::find((int)$request->direction) : null;
        $directions = (int)$request->direction ? Direction::where('id', (int)$request->direction)->get() : Direction::all();
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


        $data = array_merge($this->getCommonData($request, $branch, 'activities'), [
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'results' => ReportActvitiesResource::collection($results),
        ]);

        return Inertia::render('Common/Reports/Activities', $data);
    }

    public function bonus(Request $request, Branch $branch)
    {
        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $results = new Collection();

        if ($start && $end) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end);

            $results = $books->get();
        }

        $data = array_merge($this->getCommonData($request, $branch, 'bonus'), [
            'results' => ReportBonusResource::collection($results),
        ]);

        return Inertia::render('Common/Reports/Bonus', $data);
    }

    public function debt(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'debt'), []);
        return Inertia::render('Common/Reports/Debt', $data);
    }

    public function from(Request $request, Branch $branch)
    {
        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $results = new Collection();

        if ($start && $end) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end);



            $results = $books->get();
        }

        $data = array_merge($this->getCommonData($request, $branch, 'from'), [
            'results' => ReportFromResource::collection($results),
            'hears' => Hear::all(),
        ]);

        return Inertia::render('Common/Reports/From', $data);
    }

    private function getCommonData(Request $request, Branch $branch, $item = 'common')
    {
        global $filter;

        $menu = $this->getMenu($branch, $item);
        $index = array_search(true, array_column($menu, 'active'));

        $branches = Branch::all();
        $brancCollection = new Collection();
        foreach ($branches as $br) {
            $brancCollection->push([
                'id' => $br->id,
                'title' => $br->title,
                'href' => route(auth()->user()->role->name . '.reports.common', [
                    'branch' => $br->id
                ])
            ]);
        }

        $data = [
            'branch' => new  ResourcesBranch($branch),
            'branches' => $brancCollection,
            'report' => $item,
            'start' => isset($filter['start']) && $filter['start'] ? $filter['start'] : Carbon::now()->subMonths(3),
            'end' => isset($filter['end']) && $filter['end'] ? $filter['end'] : Carbon::now(),
            'data' => $request->all(),
            'directions' => ResourcesDirection::collection(Direction::all()),
            'specialists' => ResourcesUser::collection(User::where('role_id', 4)->get()),
            'title' => $menu[$index]['title'],
            'reports' => $this->getMenu($branch, $item)
        ];

        return $data;
    }

    public function attendance(Request $request, Branch $branch)
    {
        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $books = [];
        $patient = User::find((int)$request->patient);

        if ($start && $end && $patient) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end)
                ->where('patient_id', $patient->id);
        }

        $data = array_merge($this->getCommonData($request, $branch, 'attendance'), [
            'results' => $start && $end ? ReportAttendanceResource::collection($books ? $books->orderBy('date')->get() : []) : ['data' => []],
            'patient' => $patient ? new Patient($patient) : null
        ]);
        return Inertia::render('Common/Reports/Attendance', $data);
    }

    private function getMenu(Branch $branch, $report = 'common')
    {
        return [
            [
                'title' => 'Отчёт по кассе по услугам',
                'href' => route(auth()->user()->role->name . '.reports.common', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'common'
            ],
            [
                'title' => 'Отчет развернутый о деятельности центра',
                'href' => route(auth()->user()->role->name . '.reports.detailed', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'detailed'
            ],
            [
                'title' => 'Отчет о количестве проведенных услуг с учетом списания с баланса (по подразделениям)',
                'href' => route(auth()->user()->role->name . '.reports.countbalance', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'countbalance'
            ],
            [
                'title' => 'Отчёт по приему пациентов (по первичным и повторным пациентам)',
                'href' => route(auth()->user()->role->name . '.reports.reception', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'reception'
            ],
            [
                'title' => 'Отчет по первичным и повторным пациентам, которые не пришли на прием.',
                'href' => route(auth()->user()->role->name . '.reports.canceled', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'canceled'
            ],
            [
                'title' => 'Отчёт об услугах  бесплатных, со скидкой, с долгом',
                'href' => route(auth()->user()->role->name . '.reports.debt', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'debt'
            ],
            [
                'title' => 'Отчёт по бонусам консультантов магазина. ',
                'href' => route(auth()->user()->role->name . '.reports.bonus', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'bonus'
            ],
            [
                'title' => 'Отчёт по рекламным источникам (информации «откуда о нас узнал пациент»)',
                'href' => route(auth()->user()->role->name . '.reports.from', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'from'
            ],
            [
                'title' => 'Отчет о деятельности специалистов (в разрезе подразделений) либо по одному специалиству, либо по нескольким, либо по всем',
                'href' => route(auth()->user()->role->name . '.reports.activities', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'activities'
            ],
            [
                'title' => 'Отчёт по врачам - в разрезе всех оплачиваемых действий врача, включая элементы стелек (по одному или несколько специалистов)',
                'href' => route(auth()->user()->role->name . '.reports.actions', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'actions'
            ],
            [
                'title' => 'Отчет по посещаемости пациента за период',
                'href' => route(auth()->user()->role->name . '.reports.attendance', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'attendance'
            ]
        ];
    }
}
