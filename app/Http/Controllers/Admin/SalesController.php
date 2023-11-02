<?php

namespace App\Http\Controllers\Admin;

use App\Events\SaleCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaleStoreRequest;
use App\Http\Requests\SaleUpdateRequest;
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

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['sales'] = ResourcesUser::collection(User::where('role_id', 7)->get());
        $data['pagetitle'] = 'Продавцы-консультанты';
        return Inertia::render('Admin/Sales', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Новый продавец-консультант';
        $data['sale'] = null;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Sale', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaleStoreRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make(Str::random(8));
        $sale = User::create($data);
        $sale->role_id = 7;
        $sale->save();
        $sale->directions()->sync($request->directions);
        event(new SaleCreated($sale));
        return redirect()->route('admin.sales.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $sale)
    {
        $data['pagetitle'] = 'Продавцы-консультанты';
        $data['sale'] = $sale;
        return Inertia::render('Admin/Sale', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $sale)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Продавцы-консультанты';
        $data['sale'] = $sale;
        $data['directions'] = ResourcesDirection::collection(Direction::all());
        return Inertia::render('Admin/Sale', $data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SaleUpdateRequest $request, User $sale)
    {
        $data = $request->all();
        $sale->update($data);
        $sale->directions()->sync($request->directions);
        return redirect()->route('admin.sales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $sale)
    {
        $sale->delete();
        return redirect()->route('admin.sales.index');
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
