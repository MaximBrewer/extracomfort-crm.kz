<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\DirectionReceptionResource;
use App\Http\Resources\DirectionReport;
use App\Http\Resources\DirectionSpecialist;
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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class ReportController extends Controller
{

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

    public function actions(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'actions'), []);
        return Inertia::render('Common/Reports/Actions', $data);
    }

    public function activities(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'activities'), []);
        return Inertia::render('Common/Reports/Activities', $data);
    }

    public function attendance(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'attendance'), []);
        return Inertia::render('Common/Reports/Attendance', $data);
    }

    public function bonus(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'bonus'), []);
        return Inertia::render('Common/Reports/Bonus', $data);
    }

    public function canceled(Request $request, Branch $branch)
    {
        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $data = array_merge($this->getCommonData($request, $branch, 'reception'), [
            'results' => $start && $end ? DirectionReceptionResource::collection(Direction::all()) : ['data' => []]
        ]);
        return Inertia::render('Common/Reports/Canceled', $data);
    }

    public function common(Request $request, Branch $branch)
    {
        $specialist = (int)$request->specialist ?  User::find((int)$request->specialist) : null;
        $direction = (int)$request->direction ?  Direction::find((int)$request->direction) : null;
        $service = (int)$request->service ?  Service::find((int)$request->service) : null;

        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $books = null;
        $topups = null;

        if ($start && $end) {
            $books = Book::whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end);
            $topups = TopUp::where('created_at', '>=', $start)
                ->where('created_at', '<=', $end);
            if ($specialist) $books = $books->where('specialist_id', $specialist->id);

            if ($service) {
                $books = $books->where('service_id', $service->id);
            } elseif ($direction) {
                $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                    $query->whereHas('category', function (Builder $query) use ($direction) {
                        $query->where('direction_id', $direction->id);
                    });
                });
            }
        }

        $data = array_merge($this->getCommonData($request, $branch, 'common'), [
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'service' => $service ? new ServiceWoWrapTizer($service) : null,
            'specialist' => $specialist ? new ResourcesUser($specialist) : null,
            'books' => BookRecieption::collection($books ? $books->orderBy('date')->get() : []),
            'topups' => ResourcesTopUp::collection($topups ? $topups->orderBy('created_at')->get() : [])
        ]);

        return Inertia::render('Common/Reports/Common', $data);
    }

    public function reception(Request $request, Branch $branch)
    {
        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $data = array_merge($this->getCommonData($request, $branch, 'reception'), [
            'results' => $start && $end ? DirectionReceptionResource::collection(Direction::all()) : ['data' => []]
        ]);
        return Inertia::render('Common/Reports/Reception', $data);
    }

    public function debt(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'debt'), []);
        return Inertia::render('Common/Reports/Debt', $data);
    }

    public function from(Request $request, Branch $branch)
    {
        $data = array_merge($this->getCommonData($request, $branch, 'from'), []);
        return Inertia::render('Common/Reports/From', $data);
    }

    public function detailed(Request $request, Branch $branch)
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

        $data = array_merge($this->getCommonData($request, $branch, 'detailed'), [
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'results' => DirectionReport::collection($start && $end ? ($direction ? Direction::where('id', $direction->id)->get() : Direction::all()) : []),
        ]);

        return Inertia::render('Common/Reports/Detailed', $data);
    }

    public function countbalance(Request $request, Branch $branch)
    {
        $specialist = (int)$request->specialist ?  User::find((int)$request->specialist) : null;
        $direction = (int)$request->direction ?  Direction::find((int)$request->direction) : null;

        $start = $request->start ? Carbon::parse($request->start) : null;
        $end = $request->end ? Carbon::parse($request->end) : null;

        $books = null;
        if ($specialist && $start && $end) {
            $books = Book::where('specialist_id', $specialist->id)
                ->whereRaw('start=time')
                ->where('status', 'completed')
                ->where('date', '>=', $start)
                ->where('date', '<=', $end);
            if ($direction) {
                $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                    $query->whereHas('category', function (Builder $query) use ($direction) {
                        $query->where('direction_id', $direction->id);
                    });
                });
            }
        }

        $data = array_merge($this->getCommonData($request, $branch, 'countbalance'), [
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'specialist' => $specialist ? new ResourcesUser($specialist) : null,
            'books' => BookRecieption::collection($books ? $books->orderBy('date')->get() : [])
        ]);

        return Inertia::render('Common/Reports/CountBalance', $data);
    }

    private function getCommonData(Request $request, Branch $branch, $item = 'common')
    {
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
            'start' => $request->start,
            'end' => $request->end,
            'directions' => ResourcesDirection::collection(Direction::all()),
            'specialists' => ResourcesUser::collection(User::where('role_id', 4)->get()),
            'title' => $menu[$index]['title'],
            'reports' => $this->getMenu($branch, $item)
        ];

        return $data;
    }
}
