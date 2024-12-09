<?php

namespace App\Http\Controllers\Admin;

use App\Events\AccountantCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountantStoreRequest;
use App\Http\Requests\AccountantUpdateRequest;
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

class AccountantsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['accountants'] = ResourcesUser::collection(User::where('role_id', 11)->get());
        $data['pagetitle'] = 'Бухгалтер';
        return Inertia::render('Admin/Accountants', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый бухгалтер';
        $data['accountant'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Accountant', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AccountantStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $accountant = User::create($data);
        $accountant->role_id = 11;
        $accountant->save();
        $accountant->directions()->sync($request->directions);
        event(new AccountantCreated($accountant));
        return redirect()->route('admin.accountants.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $accountant)
    {
        $data['pagetitle'] = 'Бухгалтер';
        $data['accountant'] = $accountant;
        return Inertia::render('Admin/Accountant', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $accountant)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Бухгалтер';
        $data['accountant'] = $accountant;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Accountant', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(AccountantUpdateRequest $request, User $accountant)
    {
        $data = $request->all();
        $accountant->update($data);
        $accountant->directions()->sync($request->directions);
        return redirect()->route('admin.accountants.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $accountant)
    {
        $accountant->delete();
        return redirect()->route('admin.accountants.index');
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
