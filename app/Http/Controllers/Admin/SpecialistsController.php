<?php

namespace App\Http\Controllers\Admin;

use App\Events\SpecialistCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\SpecialistStoreRequest;
use App\Http\Requests\SpecialistUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SpecialistsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['specialists'] = User::where('role_id', 4)->get();
        $data['pagetitle'] = 'Специалисты';
        return Inertia::render('Admin/Specialists', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый специалист';
        $data['specialist'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Specialist', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SpecialistStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $specialist = User::create($data);
        $specialist->role_id = 4;
        $specialist->schedule = User::getDayArray();
        $specialist->save();
        $specialist->directions()->sync($request->directions);
        event(new SpecialistCreated($specialist));
        return redirect()->route('admin.specialists.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $specialist)
    {
        $data['pagetitle'] = 'Специалист';
        $data['specialist'] = $specialist;
        return Inertia::render('Admin/Specialist', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $specialist)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Специалист';
        $data['specialist'] = $specialist;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Specialist', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SpecialistUpdateRequest $request, User $specialist)
    {
        $data = $request->all();
        $specialist->update($data);
        $specialist->schedule = User::getDayArray();
        $specialist->save();
        $specialist->directions()->sync($request->directions);
        return redirect()->route('admin.specialists.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $specialist)
    {
        $specialist->delete();
        return redirect()->route('admin.specialists.index');
    }

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

        $data['localities'] = ResourcesLocality::collection(Locality::all());
    }
}
