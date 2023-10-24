<?php

namespace App\Http\Controllers\Admin;

use App\Events\SeniorCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\SeniorStoreRequest;
use App\Http\Requests\SeniorUpdateRequest;
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

class SeniorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['seniors'] = User::where('role_id', 9)->get();
        $data['pagetitle'] = 'Старший менеджер';
        return Inertia::render('Admin/Seniors', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый старший менеджер';
        $data['senior'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Senior', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SeniorStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $senior = User::create($data);
        $senior->role_id = 9;
        $senior->save();
        $senior->directions()->sync($request->directions);
        event(new SeniorCreated($senior));
        return redirect()->route('admin.seniors.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $senior)
    {
        $data['pagetitle'] = 'Старший менеджер';
        $data['senior'] = $senior;
        return Inertia::render('Admin/Senior', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $senior)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Старший менеджер';
        $data['senior'] = $senior;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Senior', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SeniorUpdateRequest $request, User $senior)
    {
        $data = $request->all();
        $senior->update($data);
        $senior->directions()->sync($request->directions);
        return redirect()->route('admin.seniors.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $senior)
    {
        $senior->delete();
        return redirect()->route('admin.seniors.index');
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
