<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\Appointment;
use App\Http\Resources\PatientCardSpecialist;
use App\Models\Appointment as ModelsAppointment;
use App\Models\Book;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

use App\Events\PatientCreated;
use App\Http\Requests\PatientStoreRequest;
use App\Http\Requests\PatientTopUpRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\Patient as ResourcesPatient;
use App\Http\Resources\SpecialistPatientCard;
use App\Http\Resources\SpecialistPatientCardBook;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\Patient;
use App\Models\TopUp;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Jenssegers\Date\Date;


class PatientsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $this->getCommonData($data);
        $data['pagetitle'] = 'Пациенты';
        $data['patients'] =  ResourcesPatient::collection(Patient::paginate(50));
        return Inertia::render('Specialist/Patients', $data);
    }

    /**
     * Display the specified resource.
     */
    public function card(Patient $patient)
    {
        $data = [];
        $this->getCommonData($data);
        $data['patient'] = new SpecialistPatientCard($patient);
        $data['books'] = SpecialistPatientCardBook::collection($patient->books()->paginate(
            $perPage = 5,
            $columns = ['*'],
            $pageName = 'ab'
        ));
        $data['appointments'] = SpecialistPatientCardBook::collection($patient->appointments()->paginate(
            $perPage = 5,
            $columns = ['*'],
            $pageName = 'ap'
        ));
        $data['pagetitle'] = 'Карточка пациента';
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

        $data['pagetitle'] = 'Запись №' . $book->id . "(" . $book->patient->fullName . ")";
        $data['patient'] = new PatientCardSpecialist($book->patient);
        $data['appointment'] = new Appointment($appointment);
        $data['scrollpage'] = true;

        $data['successshop'] = !!Session::get('successshop');
        $data['successrecieption'] = !!Session::get('successrecieption');

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

    public function toShop(Request $request, Book $book)
    {
        $task = User::find(Auth::id())->tasks()->create([
            'title' => $request->type == 0 ? 'Изготовление обуви' : 'Изготовление стелеек',
            'user_id' => Auth::id(),
            'entity_type' => Book::class,
            'entity_id' => $book->id,
            'start' => now(),
            'deadline' => now()->addDay(),
            'data' => [
                'link' => [
                    'route' => 'appointment',
                    'params' => [
                        'book' => $book->id
                    ]
                ]
            ]
        ]);
        $task->users()->attach(User::whereHas('role', function (Builder $query) {
            $query->where('name', 'sale');
        })->where('branch_id', Auth::user()->branch_id)->pluck('id'));
        return redirect()->back()->with('successshop', true);
    }

    public function toRecieption(Request $request, Book $book)
    {
        $task = User::find(Auth::id())->tasks()->create([
            'title' => 'План реабилитации',
            'user_id' => Auth::id(),
            'entity_type' => Book::class,
            'entity_id' => $book->id,
            'start' => now(),
            'deadline' => now()->addDay(),
            'data' => [
                'link' => [
                    'route' => 'appointment',
                    'params' => [
                        'book' => $book->id
                    ]
                ]
            ]
        ]);

        $users = User::whereHas('role', function (Builder $query) {
            $query->where('name', 'recieption');
        })->where('branch_id', Auth::user()->branch_id)->get();

        $message = "<p>Новое задание</p>";
        $message .= "<p><b>" . $task->title . "</b></p>";

        foreach ($users as $user) {
            $task->users()->attach($user);
            $user->notifications()->create([
                'notification' => $message
            ]);
        }

        return redirect()->back()->with('successrecieption', true);
    }

    /**
     * Common data for crud.
     */
    private function getCommonData(&$data)
    {
        $data['genders'] = [
            [
                'value' => 'male',
                'label' => 'Мужской',
            ], [
                'value' => 'female',
                'label' => 'Женский'
            ]
        ];

        $data['directions'] = ResourcesDirection::collection(Direction::all());
        $data['localities'] = ResourcesLocality::collection(Locality::all());
    }
}
