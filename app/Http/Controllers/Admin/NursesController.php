<?php

namespace App\Http\Controllers\Admin;

use App\Events\NurseCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\NurseStoreRequest;
use App\Http\Requests\NurseUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['nurses'] = User::where('role_id', 8)->get();
        $data['pagetitle'] = 'Медсестры';
        return Inertia::render('Admin/Nurses', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новая медсестра';
        $data['nurse'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Nurse', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NurseStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $nurse = User::create($data);
        $nurse->role_id = 8;
        $nurse->save();
        $nurse->directions()->sync($request->directions);
        event(new NurseCreated($nurse));
        return redirect()->route('admin.nurses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $nurse)
    {
        $data['pagetitle'] = 'Медсестры';
        $data['nurse'] = $nurse;
        return Inertia::render('Admin/Nurse', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $nurse)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Медсестры';
        $data['nurse'] = $nurse;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Nurse', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(NurseUpdateRequest $request, User $nurse)
    {
        $data = $request->all();
        $nurse->update($data);
        $nurse->directions()->sync($request->directions);
        return redirect()->route('admin.nurses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $nurse)
    {
        $nurse->delete();
        return redirect()->route('admin.nurses.index');
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
