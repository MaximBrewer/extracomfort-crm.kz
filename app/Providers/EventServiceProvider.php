<?php

namespace App\Providers;

use App\Events\NurseCreated;
use App\Events\PatientCreated;
use App\Events\RecieptionCreated;
use App\Events\SaleCreated;
use App\Events\SeniorCreated;
use App\Events\SupervisorCreated;
use App\Events\SpecialistCreated;
use App\Models\User;
use App\Listeners\SendNurseCreatedNotification;
use App\Listeners\SendPatientCreatedNotification;
use App\Listeners\SendRecieptionCreatedNotification;
use App\Listeners\SendSaleCreatedNotification;
use App\Listeners\SendSeniorCreatedNotification;
use App\Listeners\SendSpecialistCreatedNotification;
use App\Listeners\SendSupervisorCreatedNotification;
use App\Models\CallIn;
use App\Models\Notification;
use App\Models\Offer;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Reminder;
use App\Models\Task;
use App\Models\TopUp;
use App\Models\WithDraw;
use App\Observers\CallIn as ObserversCallIn;
use App\Observers\Notification as ObserversNotification;
use App\Observers\Offer as ObserversOffer;
use App\Observers\Payment as ObserversPayment;
use App\Observers\Product as ObserversProduct;
use App\Observers\Reminder as ObserversReminder;
use App\Observers\Task as ObserversTask;
use App\Observers\TopUp as ObserversTopUp;
use App\Observers\User as ObserversUser;
use App\Observers\WithDraw as ObserversWithDraw;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        NurseCreated::class => [
            SendNurseCreatedNotification::class
        ],
        SaleCreated::class => [
            SendSaleCreatedNotification::class
        ],
        SeniorCreated::class => [
            SendSeniorCreatedNotification::class
        ],
        SupervisorCreated::class => [
            SendSupervisorCreatedNotification::class
        ],
        SpecialistCreated::class => [
            SendSpecialistCreatedNotification::class
        ],
        RecieptionCreated::class => [
            SendRecieptionCreatedNotification::class
        ],
        PatientCreated::class => [
            SendPatientCreatedNotification::class
        ],
        \Bigperson\Exchange1C\Events\AfterOffersSync::class => [
            \App\Listeners\AfterOffersSync::class,
        ],
        \Bigperson\Exchange1C\Events\AfterProductsSync::class => [
            \App\Listeners\AfterProductsSync::class,
        ],

    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        Product::observe(ObserversProduct::class);
        Offer::observe(ObserversOffer::class);
        Task::observe(ObserversTask::class);
        TopUp::observe(ObserversTopUp::class);
        User::observe(ObserversUser::class);
        Payment::observe(ObserversPayment::class);
        Notification::observe(ObserversNotification::class);
        Reminder::observe(ObserversReminder::class);
        CallIn::observe(ObserversCallIn::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
