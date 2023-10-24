<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DirectionStoreRequest;
use App\Http\Requests\DirectionUpdateRequest;
use App\Http\Resources\Direction as ResourcesDirection;
use App\Http\Resources\Service as ResourcesService;
use App\Models\Direction;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DirectionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['pagetitle'] = 'Направления';
        $data['directions'] = Direction::all();
        return Inertia::render('Admin/Directions', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DirectionStoreRequest $request)
    {
        $direction = Direction::withTrashed()->where('title', $request->title)->firstOrNew();
        $direction->sort = $request->sort;
        $direction->title = $request->title;
        $direction->save();
        $direction->restore();
        return redirect()->route('admin.directions.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DirectionUpdateRequest $request, Direction $direction)
    {
        $direction->update($request->only([
            'sort',
            'title'
        ]));
        return redirect()->route('admin.directions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Direction $direction)
    {
        $data = [];
        $this->getCommonData($data);
        $data['pagetitle'] = 'Направление';
        $data['direction'] = new ResourcesDirection($direction);
        return Inertia::render('Admin/Direction', $data);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Direction $direction)
    {
        if ($direction->users->count())
            return Redirect::back()->withErrors(['message' => 'Направление имеет привязки']);
        $direction->delete();
        return redirect()->route('admin.directions.index');
    }

    private function getCommonData(&$data)
    {
    }
}
