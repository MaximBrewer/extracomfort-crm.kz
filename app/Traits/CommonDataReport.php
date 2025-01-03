<?php

namespace App\Traits;

use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;

trait CommonDataReport
{
    public function getCommonData(Request $request, Branch $branch, $item = 'common')
    {
        global $filter;

        $menu = $this->getMenu($branch, $item);
        $index = array_search(true, array_column($menu, 'active'));

        $branches = Branch::all();
        $branchCollection = new Collection();
        foreach ($branches as $br) {
            $branchCollection->push([
                'id' => $br->id,
                'title' => $br->title,
                'href' => route(auth()->user()->role->name . '.reports.' . $item, [
                    'branch' => $br->id
                ])
            ]);
        }

        $data = [
            'branch' => new ResourcesBranch($branch),
            'branches' => $branchCollection,
            'report' => $item,
            'data' => $request->all(),
            'directions' => ResourcesDirection::collection(Direction::all()),
            'specialists' => ResourcesUser::collection(User::where('role_id', 4)->get()),
            'title' => $menu[$index]['title'],
            'start' => $filter['start'] ?: Carbon::now(),
            'end' => $filter['end'] ?: Carbon::now(),
            'reports' => $this->getMenu($branch, $item)
        ];

        return $data;
    }

    private function getMenu(Branch $branch, $report = 'common')
    {
        $arr = [];

        if (Route::has(auth()->user()->role->name . '.reports.common'))
            $arr[] = [
                'title' => 'Отчёт по кассе по услугам',
                'href' => route(auth()->user()->role->name . '.reports.common', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'common'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.detailed'))
            $arr[] = [
                'title' => 'Отчет развернутый о деятельности центра',
                'href' => route(auth()->user()->role->name . '.reports.detailed', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'detailed'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.countbalance'))
            $arr[] = [
                'title' => 'Отчет о количестве проведенных услуг с учетом списания с баланса (по подразделениям)',
                'href' => route(auth()->user()->role->name . '.reports.countbalance', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'countbalance'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.reception'))
            $arr[] = [
                'title' => 'Отчёт по приему пациентов (по первичным и повторным пациентам)',
                'href' => route(auth()->user()->role->name . '.reports.reception', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'reception'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.canceled'))
            $arr[] = [
                'title' => 'Отчет по первичным и повторным пациентам, которые не пришли на прием.',
                'href' => route(auth()->user()->role->name . '.reports.canceled', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'canceled'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.debt'))
            $arr[] = [
                'title' => 'Отчёт об услугах  бесплатных, со скидкой, с долгом',
                'href' => route(auth()->user()->role->name . '.reports.debt', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'debt'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.bonus'))
            $arr[] = [
                'title' => 'Отчёт по бонусам консультантов магазина. ',
                'href' => route(auth()->user()->role->name . '.reports.bonus', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'bonus'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.from'))
            $arr[] = [
                'title' => 'Отчёт по рекламным источникам (информации «откуда о нас узнал пациент»)',
                'href' => route(auth()->user()->role->name . '.reports.from', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'from'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.activities'))
            $arr[] = [
                'title' => 'Отчет о деятельности специалистов (в разрезе подразделений) либо по одному специалиству, либо по нескольким, либо по всем',
                'href' => route(auth()->user()->role->name . '.reports.activities', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'activities'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.actions'))
            $arr[] = [
                'title' => 'Отчёт по врачам - в разрезе всех оплачиваемых действий врача, включая элементы стелек (по одному или несколько специалистов)',
                'href' => route(auth()->user()->role->name . '.reports.actions', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'actions'
            ];

        if (Route::has(auth()->user()->role->name . '.reports.attendance'))
            $arr[] = [
                'title' => 'Отчет по посещаемости пациента за период',
                'href' => route(auth()->user()->role->name . '.reports.attendance', [
                    'branch' => $branch->id
                ]),
                'active' => $report === 'attendance'
            ];

        return $arr;
    }
}
