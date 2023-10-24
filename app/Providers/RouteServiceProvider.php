<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */

    public const HOME = '/';
    public const HOME_NURSE = '/nurse/patients';
    public const HOME_SALE = '/sale/patients';
    public const HOME_MANGER = '/manager/patients';
    public const HOME_SUPERVISOR = '/supervisor/patients';
    public const HOME_SENIOR = '/senior/patients';
    public const HOME_CLIENT = '/client/timetable';
    public const HOME_SPECIALST = '/specialist/timetable';
    public const HOME_RECIEPTION = '/recieption/timetable';
    public const HOME_ADMIN = '/admin/recieptions';
    public const LOGIN = '/login';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
