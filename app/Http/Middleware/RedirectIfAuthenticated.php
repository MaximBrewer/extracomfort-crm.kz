<?php

namespace App\Http\Middleware;

use App\Models\Branch;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        $branch = Branch::first();

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if (Auth::user()->role->name === 'admin') return redirect(RouteServiceProvider::HOME_ADMIN);
                if (Auth::user()->role->name === 'manager') return redirect(RouteServiceProvider::HOME_MANGER);
                if (Auth::user()->role->name === 'sale') return redirect(RouteServiceProvider::HOME_SALE);
                if (Auth::user()->role->name === 'supervisor') return redirect(RouteServiceProvider::HOME_SUPERVISOR);
                if (Auth::user()->role->name === 'recieption') return redirect()->route('recieption.timetable', [
                    "branch" => $branch->id
                ]);
                if (Auth::user()->role->name === 'nurse') return redirect(RouteServiceProvider::HOME_NURSE);
                if (Auth::user()->role->name === 'senior') return redirect(RouteServiceProvider::HOME_SENIOR);
                if (Auth::user()->role->name === 'specialist') return redirect(RouteServiceProvider::HOME_SPECIALST);
                return redirect(RouteServiceProvider::HOME_CLIENT);
            }
        }

        return $next($request);
    }
}
