<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\Appointment;
use App\Http\Resources\PatientCardSpecialist;
use App\Models\Appointment as ModelsAppointment;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PatientsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data['pagetitle'] = 'Пациенты';
        return Inertia::render('Specialist/Patients', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function show(Request $request, User $patient)
    {
        $data['pagetitle'] = 'Карточка пациента';
        $data['patient'] = new PatientCardSpecialist($patient);
        return Inertia::render('Specialist/Patient/Card', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function appointment(Request $request, Book $book)
    {
        $appointment = $book->appointment()->firstOrCreate([]);

        if (!$appointment->ods)  $appointment->ods()->create([]);
        if (!$appointment->painmap)   $book->appointment->painmap()->create([]);
        if (!$appointment->oda)  $book->appointment->oda()->create([]);
        if (!$appointment->reabilitation)   $book->appointment->reabilitation()->create([]);
        if (!$appointment->addon)   $book->appointment->addon()->create([]);
        if (!$appointment->podiatry)   $book->appointment->podiatry()->create([]);
        if (!$appointment->kinesio)   $book->appointment->kinesio()->create([]);
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
        return Inertia::render('Specialist/Patient/Appointment', $data);
    }

    /**
     * Handle the incoming request.
     */
    public function appointmentUpdate(UpdateAppointmentRequest $request, Book $book)
    {
        $book->appointment()->update($request->except([
            'id',
            'book_id',
            'tab',
            'painmap',
            'ods',
            'kinesio',
            'files',
            'addon',
            'reabilitation',
            'oda',
            'podiatry'
        ]));

        $book->appointment->oda->update($request->oda);

        $book->appointment->ods->update($request->ods);

        $book->appointment->painmap->update($request->painmap);

        $book->appointment->addon->update($request->addon);

        $book->appointment->reabilitation->update($request->reabilitation);

        $podiatryData = $request->podiatry;

        if (isset($podiatryData['file']) && is_object($podiatryData['file']) && $podiatryData['file']::class == 'Illuminate\\Http\\UploadedFile') {
            $file = $podiatryData['file'];
            $book->appointment->podiatry->file = json_encode([
                [
                    "download_link" => $file->store('podiatry/' . $book->appointment->id),
                    "original_name" => $file->getClientOriginalName()
                ]
            ]);
            $book->appointment->podiatry->saveQuietly();
        }
        unset($podiatryData['file']);
        $book->appointment->podiatry->update($podiatryData);

        $book->appointment->kinesio->update($request->kinesio);

        $book->appointment->kinesio->interview->update($request->kinesio['interview']);

        return redirect()->route('specialist.appointment', [
            'book' => $book->id
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function appointmentFile(FileAppointmentRequest $request, Book $book)
    {
        $file = $request->file('file');
        $book->appointment->files()->create([
            'sort' => 100,
            'title' => $request->get('filename'),
            'category_id' => $request->get('category_id'),
            'link' => $file->store('appointments/' . $book->appointment->id)
        ]);
        return redirect()->route('specialist.appointment', [
            'book' => $book->id
        ]);
    }
}
