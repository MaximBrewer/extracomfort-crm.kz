<?php

namespace App\Observers;

use App\Models\CallIn as ModelsCallIn;
use App\Models\Notification;
use App\Models\User;

class CallIn
{
    public function created(ModelsCallIn $model)
    {
        if ($model->data['numberE164']) {
            $message = "<p>Входящий звонок от <b>" . $model->data['numberE164'] . "</b></p>";
            $user = User::where('phone', $model->data['numberE164'])->first();
            if ($user) {
                if ($user->lastname) $message .= "<p>Фамилия: " . $user->lastname . "</p>";
                if ($user->name) $message .= "<p>Имя: " . $user->name . "</p>";
                if ($user->surname) $message .= "<p>Отчество: " . $user->surname . "</p>";
            }

            User::find(5)->notifications()->create([
                'notification' => $message,
                // 'link' => [
                //     'text' => 'перейти',
                //     'route' => 'appointment',
                //     'params' => [
                //         'appointment' => 19
                //     ]
                // ]
            ]);
            // Notification::create([

            // ]);
        }
    }
}
