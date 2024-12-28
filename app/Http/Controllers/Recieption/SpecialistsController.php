<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialistTizer;
use App\Models\Branch;
use App\Models\DateTime;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\Branch as ResourcesBranch;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SpecialistsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Branch $branch)
    {
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['pagetitle'] = 'Специалисты';
        $data['branch'] = $branch;
        $data['specialists'] = SpecialistTizer::collection(User::where('role_id', 4)->with('directions')->paginate(1000));
        return Inertia::render('Recieption/Specialists', $data);
    }
}
