<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\DirectionReport;
use App\Http\Resources\DirectionWoWrapTizer;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Direction;
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
                'title' => 'Отчёт по кассе по услугам: общий; в разбивке по специалистам; в разбивке по подразделениям; в разбивке по услугам',
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
            ]
        ];
    }


    public function common(Request $request, Branch $branch)
    {

        $specialist = null;
        if ((int)$request->specialist) {
            $specialist = User::find((int)$request->specialist);
        }
        $direction = null;
        if ((int)$request->direction) {
            $direction = Direction::find((int)$request->direction);
        }
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

        $menu = $this->getMenu($branch, 'common');
        $active = $menu[0];
        foreach ($menu as $item) if ($item['active'])  $active = $item;

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
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'specialist' => $specialist ? new ResourcesUser($specialist) : null,
            'start' => $request->start,
            'end' => $request->end,
            'specialists' => ResourcesUser::collection(User::where('role_id', 4)->get()),
            'books' => BookRecieption::collection($books ? $books->orderBy('date')->get() : []),
            'title' => $active['title'],
            'reports' => $this->getMenu($branch, 'common')
        ];

        return Inertia::render('Recieption/Reports/Common', $data);
    }

    public function detailed(Request $request, Branch $branch)
    {
        $direction = null;
        if ((int)$request->direction) {
            $direction = Direction::find((int)$request->direction);
        }

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

        $menu = $this->getMenu($branch, 'detailed');
        $active = $menu[0];
        foreach ($menu as $item) if ($item['active'])  $active = $item;

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
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'directions' => DirectionWoWrapTizer::collection(Direction::all()),
            'results' => DirectionReport::collection($start && $end ? ($direction ? Direction::where('id', $direction->id)->get() : Direction::all()) : []),
            'start' => $request->start,
            'end' => $request->end,
            'title' => $active['title'],
            'reports' => $this->getMenu($branch, 'detailed')
        ];

        return Inertia::render('Recieption/Reports/Detailed', $data);
    }
    public function countbalance(Request $request, Branch $branch)
    {
        $specialist = null;
        if ((int)$request->specialist) {
            $specialist = User::find((int)$request->specialist);
        }
        $direction = null;
        if ((int)$request->direction) {
            $direction = Direction::find((int)$request->direction);
        }

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

        $menu = $this->getMenu($branch, 'countbalance');
        $active = $menu[0];
        foreach ($menu as $item) if ($item['active'])  $active = $item;

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
            'direction' => $direction ? new DirectionWoWrapTizer($direction) : null,
            'specialist' => $specialist ? new ResourcesUser($specialist) : null,
            'start' => $request->start,
            'end' => $request->end,
            'specialists' => ResourcesUser::collection(User::where('role_id', 4)->get()),
            'books' => BookRecieption::collection($books ? $books->orderBy('date')->get() : []),
            'title' => $active['title'],
            'reports' => $this->getMenu($branch, 'countbalance')
        ];

        return Inertia::render('Recieption/Reports/CountBalance', $data);
    }
}
