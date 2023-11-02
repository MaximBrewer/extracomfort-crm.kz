<?php

namespace App\Http\Controllers\Admin;

use App\Events\RecieptionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecieptionStoreRequest;
use App\Http\Requests\RecieptionUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Http\Resources\User as ResourcesUser;
use App\Models\Direction;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RecieptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['recieptions'] = ResourcesUser::collection(User::where('role_id', 3)->get());
        $data['pagetitle'] = 'Ресепшн';
        return Inertia::render('Admin/Recieptions', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый сотрудник ресепшн';
        $data['recieption'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Recieption', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecieptionStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $recieption = User::create($data);
        $recieption->role_id = 3;
        $recieption->save();
        $recieption->directions()->sync($request->directions);
        event(new RecieptionCreated($recieption));
        return redirect()->route('admin.recieptions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $recieption)
    {
        $data['pagetitle'] = 'Ресепшн';
        $data['recieption'] = $recieption;
        return Inertia::render('Admin/Recieption', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $recieption)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Ресепшн';
        $data['recieption'] = $recieption;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Recieption', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(RecieptionUpdateRequest $request, User $recieption)
    {
        $data = $request->all();
        $recieption->update($data);
        $recieption->directions()->sync($request->directions);
        return redirect()->route('admin.recieptions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $recieption)
    {
        $recieption->delete();
        return redirect()->route('admin.recieptions.index');
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
