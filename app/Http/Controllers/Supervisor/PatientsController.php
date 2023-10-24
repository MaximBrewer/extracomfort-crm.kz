<?php

namespace App\Http\Controllers\Supervisor;

use App\Events\PatientCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\PatientStoreRequest;
use App\Http\Requests\PatientTopUpRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Models\Branch;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\TopUp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
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
        $data['patients'] = User::where('role_id', 2)->get();
        return Inertia::render('Senior/Patients', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый пациент';
        $data['patient'] = null;
        return Inertia::render('Senior/Patient/Form', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PatientStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $patient = User::create($data);
        $patient->role_id = 2;
        $patient->save();
        event(new PatientCreated($patient));
        return redirect()->route('supervisor.patient.card', [
            'patient' => $patient->id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function card(User $patient)
    {
        $data = [];
        $this->getCommonData($data);
        $data['patient'] = $patient;
        $data['pagetitle'] = 'Карточка пациента';
        return Inertia::render('Senior/Patient/Card', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $patient)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Редактирование пациента';
        $data['patient'] = $patient;
        return Inertia::render('Senior/Patient/Form', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function topup(PatientTopUpRequest $request, User $patient)
    {
        TopUp::create([
            'supervisor_id' => Auth::id(),
            'user_id' => $patient->id,
            'sum' => $request->sum,
            'paymethod' => $request->paymethod
        ]);
        return redirect()->back();
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PatientUpdateRequest $request, User $patient)
    {
        $data = $request->all();
        $patient->update($data);
        return redirect()->route('supervisor.patient.card', [
            'patient' => $patient->id
        ]);
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
