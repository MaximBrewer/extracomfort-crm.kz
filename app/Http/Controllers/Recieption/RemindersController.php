<?php

namespace App\Http\Controllers\Recieption;

use App\Http\Controllers\Controller;
use App\Http\Resources\Branch as ResourcesBranch;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class RemindersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request, Branch $branch, $date = null)
    {
        try {

            $date = Carbon::parse($date ? '01.' . $date : date('d.m.Y'));
        } catch (\Throwable $e) {
            abort(404);
        }

        $data['pagetitle'] = 'Напоминания';
        $data['year'] = $date->format('Y');
        $data['date'] = $date->format('m.Y');
        $data['branches'] = ResourcesBranch::collection(Branch::all());
        $data['branch'] = $branch;
        $data['month'] = $date->format('m');
        $data['dateText'] = $date->isoFormat('MMMM YYYY');

        $data['prevyear'] = $date->format('m') < 7 ? '01.' . ($date->format('Y') - 1) : '06.' . ($date->format('Y'));
        $data['nextyear'] = $date->format('m') < 7 ? '07.' . ($date->format('Y')) : '01.' . ($date->format('Y') + 1);


        $data['reminders']  = [
            'data' => [
                [
                    'id'=> 1,
                    'date'=> '23.03.2023',
                    'patient'=> [
                        'id'=> 1,
                        'fullName'=> "Сергей Борисов",
                        'email'=> "mail@mail.mail",
                        'phone'=> null
                    ],
                    'specialist'=> [
                        'id'=> 1,
                        'fullName'=> "Островский Серей Алексеевич",
                        'directions'=> [
                            [
                                'id'=> 1,
                                'title'=> "Физиотерапевт"
                                ]
                        ]
                        ]
                ],
            ]
            ];

        return Inertia::render('Recieption/Reminders', $data);
    }
}
