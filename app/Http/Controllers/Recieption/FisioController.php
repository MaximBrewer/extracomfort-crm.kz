<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Resources\BookRecieption;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Http\Resources\FisioCategory as ResourcesFisioCategory;
use App\Models\Book;
use App\Models\Branch;
use App\Models\FisioCategory;
use Illuminate\Support\Carbon;

class FisioController extends Controller
{
    public function index(Request $request, Branch $branch, $date = null)
    {
        $data = [];
        $data['pagetitle'] = 'Запись в физиокабинет';
        $data['branch'] = $branch;
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['fisioCategories'] = ResourcesFisioCategory::collection(FisioCategory::all());
        return Inertia::render('Recieption/Fisio/Index', $data);
    }
}
