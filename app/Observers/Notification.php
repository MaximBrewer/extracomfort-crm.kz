<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\Notification as ModelsNotification;

class Notification
{
    public function created(ModelsNotification $model)
    {
        event(new NotificationEvent($model));
    }
}
