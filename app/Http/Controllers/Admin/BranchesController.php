<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BranchStoreRequest;
use App\Http\Requests\BranchUpdateRequest;
use App\Http\Resources\Locality as ResourcesLocality;
use App\Models\Branch;
use App\Models\Locality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BranchesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['pagetitle'] = 'Филиалы';
        $data['branches'] = Branch::all();
        $data['localities'] = ResourcesLocality::collection(Locality::all());
        return Inertia::render('Admin/Branches', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BranchStoreRequest $request)
    {
        $branch = Branch::withTrashed()->where('title', $request->title)->firstOrNew();
        $branch->sort = $request->sort;
        $branch->title = $request->title;
        $branch->locality_id = $request->locality_id;
        $branch->save();
        $branch->restore();
        return redirect()->route('admin.branches.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BranchUpdateRequest $request, Branch $branch)
    {
        $branch->update($request->only([
            'sort',
            'title',
            'locality_id'
        ]));
        return redirect()->route('admin.branches.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        if (User::where('branch_id', $branch->id)->exists())
            return Redirect::back()->withErrors(['message' => 'Филиал имеет привязки']);
        $branch->delete();
        return redirect()->route('admin.branches.index');
    }
}
