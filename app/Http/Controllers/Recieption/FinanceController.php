<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data['pagetitle'] = 'Финансы';
        return Inertia::render('Recieption/Finance', $data);
    }
}
