<?php

namespace App\Observers;

use App\Models\Notification;
use App\Models\Task as ModelsTask;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class Task
{
    public function created(ModelsTask $model)
    {
        $message = "<p>Новое задание</p>";
        $message .= "<p><b>" . $model->title . "</b></p>";

        foreach ($model->users as $user) {
            $user->notifications()->create([
                'notification' => $message
            ]);
        }
    }
}
