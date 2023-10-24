<?php

namespace App\Traits;

use App\Http\Resources\ExecutorOpton;
use App\Http\Resources\Task as ResourcesTask;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait TaskTrait
{
    public function getTasks()
    {
        if (!Auth::check()) return [];
        $tasks = [
            [
                'status_id' => 1,
                'title' => 'К работе',
                'tasks' => ResourcesTask::collection(Task::where(function (Builder $query) {
                    $query->where('user_id', Auth::id())->orWhereHas('users', function (Builder $query) {
                        $query->where('id', Auth::id());
                    });
                })->where('status_id', 1)->get())
            ],
            [
                'status_id' => 2,
                'title' => 'На проверке',
                'tasks' => ResourcesTask::collection(Task::where('status_id', 2)->where(function (Builder $query) {
                    $query->where('user_id', Auth::id())->orWhereHas('users', function (Builder $query) {
                        $query->where('id', Auth::id());
                    });
                })->get())
            ],
            [
                'status_id' => 3,
                'title' => 'Выполненные',
                'tasks' => ResourcesTask::collection(Task::where(function (Builder $query) {
                    $query->where('user_id', Auth::id())->orWhereHas('users', function (Builder $query) {
                        $query->where('id', Auth::id());
                    });
                })->where('status_id', 3)->get())
            ],
        ];
        return $tasks;
    }

    public function getExecutors()
    {
        return ExecutorOpton::collection(User::whereHas('role', function (Builder $query) {
            $query->whereIn('name', User::$canTask[Auth::user()->role->name]);
        })->whereNot('id', Auth::id())->get());
    }
}
