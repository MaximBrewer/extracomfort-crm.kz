<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as ResourcesUser;
use App\Models\TopUp;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    /**
     * Execute an action on the controller.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function callAction($method, $parameters)
    {
        $user = null;
        if (Auth::check()) {
            // request()->user()->touchOnline();
            $user = Auth::user();
        }
        Inertia::share('auth', $user ? ['user' => new ResourcesUser($user)] : []);
        Inertia::share('paymethods', TopUp::getMethodOptions());
        return $this->{$method}(...array_values($parameters));
    }
}
