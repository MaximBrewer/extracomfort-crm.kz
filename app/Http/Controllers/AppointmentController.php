<?php

namespace App\Http\Controllers;

use App\Http\Resources\Appointment;
use App\Http\Resources\PatientCardSpecialist;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Book $book)
    {
        $appointment = $book->appointment()->firstOrCreate([]);

        if (!$appointment->ods)  $appointment->ods()->create([]);
        if (!$appointment->painmap)   $book->appointment->painmap()->create([]);
        if (!$appointment->oda)  $book->appointment->oda()->create([]);
        if (!$appointment->reabilitation)   $book->appointment->reabilitation()->create([]);
        if (!$appointment->addon)   $book->appointment->addon()->create([]);
        if (!$appointment->podiatry)   $book->appointment->podiatry()->create([]);
        if (!$appointment->kinesio) {
            $book->appointment->kinesio()->create([]);
            $appointment = $book->appointment()->first();
        }
        if (!$appointment->kinesio->interview)   $book->appointment->kinesio->interview()->create([]);

        $appointment = $book->appointment()->first();
        $spr = DB::table('settings')->where('key', 'site.spravkababy')->first();
        $data['spravkababy'] = $spr ? $spr->value : "";
        $spr = DB::table('settings')->where('key', 'site.spravkayoung')->first();
        $data['spravkayoung'] = $spr ? $spr->value : "";

        $data['pagetitle'] = 'Запись №-(Жолжаксинов Арман Тасбулатович)';
        $data['patient'] = new PatientCardSpecialist($book->patient);
        $data['appointment'] = new Appointment($appointment);
        $data['scrollpage'] = true;
        $data['disabled'] = true;
        return Inertia::render('Appointment', $data);
    }
}
