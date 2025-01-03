<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SearchController extends Controller
{
    public function patients(Request $request)
    {
        $q = $request->get('query');

        $patients = User::whereFullText('searchcontent', $q)->where('role_id', 2)->limit(20)->get();

        return ['options' => $patients->map(function ($patient) {
            return [
                'value' => $patient->id,
                'label' => trim($patient->fullName . ($patient->tin ? (' ' . $patient->tin) : ''))
            ];
        })];
    }
    public function consultants(Request $request)
    {
        $q = $request->get('query');

        $patients = User::where(function (Builder $query) use ($q) {
            $query
                ->where('name', 'like',  $q . '%')
                ->orWhere('email', 'like', $q . '%')
                ->orWhere('phone', 'like', $q . '%')
                ->orWhere('lastname', 'like', $q . '%')
                ->orWhere('surname', 'like', $q . '%');
        })->where('role_id', 7)->limit(20)->get();

        return ['options' => $patients->map(function ($patient) {
            return [
                'value' => $patient->id,
                'label' => trim($patient->fio . ($patient->birthdate ? (' ' . Carbon::parse($patient->birthdate)->format('d.m.Y')) : '') . ($patient->tin ? (' ' . $patient->tin) : ''))
            ];
        })];
    }
}
