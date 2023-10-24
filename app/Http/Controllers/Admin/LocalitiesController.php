<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocalityStoreRequest;
use App\Http\Requests\LocalityUpdateRequest;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LocalitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['pagetitle'] = 'Населенные пункты';
        $data['localities'] = Locality::all();
        return Inertia::render('Admin/Localities', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LocalityStoreRequest $request)
    {
        $locality = Locality::withTrashed()->where('title', $request->title)->firstOrNew();
        $locality->sort = $request->sort;
        $locality->title = $request->title;
        $locality->save();
        $locality->restore();
        return redirect()->route('admin.localities.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LocalityUpdateRequest $request, Locality $locality)
    {
        $locality->update($request->only([
            'sort',
            'title'
        ]));
        return redirect()->route('admin.localities.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locality $locality)
    {
        if (User::where('locality_id', $locality->id)->exists())
            return Redirect::back()->withErrors(['message' => 'Местоположение имеет привязки']);
        $locality->delete();
        return redirect()->route('admin.localities.index');
    }
}
