<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function patients(Request $request)
    {
        $q = $request->get('query');

        $patients = User::where(function (Builder $query) use ($q) {
            $query
                ->where('name', 'like',  $q . '%')
                ->orWhere('email', 'like', $q . '%')
                ->orWhere('phone', 'like', $q . '%')
                ->orWhere('lastname', 'like', $q . '%')
                ->orWhere('surname', 'like', $q . '%');
        })->where('role_id', 2)->limit(20)->get();

        return ['options' => $patients->map(function ($patient) {
            return [
                'value' => $patient->id,
                'label' => $patient->lastname . ' ' . $patient->name . ' ' . $patient->surname . ' ' . $patient->phone
            ];
        })];
    }
}
// id, role_id, name, email, phone, avatar, email_verified_at, password, remember_token, settings, created_at, updated_at, lastname,
// surname, tin, balance, locality_id, birthdate, gender, addon, branch_id, schedule, external_id, ais_id