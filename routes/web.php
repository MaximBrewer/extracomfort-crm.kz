<?php

use App\Http\Controllers\Client;
use App\Http\Controllers\Specialist;
use App\Http\Controllers\Recieption;
use App\Http\Controllers\Admin;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Sale;
use App\Http\Controllers\Senior;
use App\Http\Controllers\Nurse;
use App\Http\Controllers\Supervisor;
use App\Http\Controllers\ProfileController;
use App\Models\CallIn;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'pagetitle' => 'Добро пожаловать',
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth', 'admin']],  function () {
    Route::resource('supervisors', Admin\SupervisorsController::class);
    Route::resource('seniors', Admin\SeniorsController::class);
    Route::resource('sales', Admin\SalesController::class);
    Route::resource('recieptions', Admin\RecieptionsController::class);
    Route::resource('nurses', Admin\NursesController::class);
    Route::resource('specialists', Admin\SpecialistsController::class);
    Route::resource('localities', Admin\LocalitiesController::class);
    Route::resource('directions', Admin\DirectionsController::class);
    Route::resource('branches', Admin\BranchesController::class);
    Route::resource('tasks', Admin\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Admin\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Admin\CommentsController::class);
        });
    });
});

Route::group(['prefix' => 'supervisor', 'as' => 'supervisor.', 'middleware' => ['auth', 'supervisor']],  function () {
    Route::resource('tasks', Supervisor\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [supervisor\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', supervisor\CommentsController::class);
        });
    });
});

Route::group(['prefix' => 'recieption', 'as' => 'recieption.', 'middleware' => ['auth', 'recieption']],  function () {
    Route::get('{branch}/timetable/{date?}', [Recieption\TimetableController::class, 'index'])->name('timetable');
    Route::get('{branch}/notifications/{date?}', [Recieption\NotificationsController::class, 'index'])->name('notifications');
    Route::get('patients', Recieption\PatientsController::class)->name('patients');
    Route::get('patient/create', [Recieption\PatientsController::class, 'create'])->name('patient.create');
    Route::get('patient/edit/{patient}', [Recieption\PatientsController::class, 'edit'])->name('patient.edit');
    Route::post('patient', [Recieption\PatientsController::class, 'store'])->name('patients.store');
    Route::patch('patient/topup/{patient}', [Recieption\PatientsController::class, 'topup'])->name('patient.topup');
    Route::patch('patient/{patient}', [Recieption\PatientsController::class, 'update'])->name('patients.update');
    Route::get('patient/card/{patient}', [Recieption\PatientsController::class, 'card'])->name('patient.card');
    Route::get('specialists', Recieption\SpecialistsController::class)->name('specialists');
    Route::get('finance', Recieption\FinanceController::class)->name('finance');

    Route::get('specialist/{specialist}/schedule', [Recieption\SpecialistsController::class, 'schedule'])->name('specialist.schedule');
    Route::patch('specialist/{specialist}/schedule', [Recieption\SpecialistsController::class, 'updateSchedule'])->name('specialist.schedule.update');

    Route::get('book/{patient}/{branch}', [Recieption\BookController::class, 'branch'])->name('book.branch');
    Route::get('book/{patient}/{branch}/direction/{direction}/{date}', [Recieption\BookController::class, 'direction'])->name('book.direction');
    Route::get('book/{patient}/{branch}/specialist/{specialist}/{year}/{week}', [Recieption\BookController::class, 'specialist'])->name('book.specialist');
    Route::post('book/{patient}/{branch}/{specialist}', [Recieption\BookController::class, 'store'])->name('book.store');
    Route::patch('book/{book}/{patient}/{branch}/{specialist}', [Recieption\BookController::class, 'update'])->name('book.update');
    Route::patch('book/{book}/status', [Recieption\BookController::class, 'status'])->name('book.status');
    Route::post('book/{book}/payment', [Recieption\BookController::class, 'payment'])->name('book.payment');

    Route::resource('tasks', Recieption\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Recieption\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Recieption\CommentsController::class);
        });
    });
});

Route::group(['prefix' => 'nurse', 'as' => 'nurse.', 'middleware' => ['auth', 'nurse']],  function () {
    Route::get('{branch}/timetable/{date?}', [Nurse\TimetableController::class, 'index'])->name('timetable');
    Route::get('{branch}/notifications/{date?}', [Nurse\NotificationsController::class, 'index'])->name('notifications');
    Route::get('patients', Nurse\PatientsController::class)->name('patients');
    Route::get('patient/create', [Nurse\PatientsController::class, 'create'])->name('patient.create');
    Route::get('patient/edit/{patient}', [Nurse\PatientsController::class, 'edit'])->name('patient.edit');
    Route::post('patient', [Nurse\PatientsController::class, 'store'])->name('patients.store');
    Route::patch('patient/topup/{patient}', [Nurse\PatientsController::class, 'topup'])->name('patient.topup');
    Route::patch('patient/{patient}', [Nurse\PatientsController::class, 'update'])->name('patients.update');
    Route::get('patient/card/{patient}', [Nurse\PatientsController::class, 'card'])->name('patient.card');
    Route::get('specialists', Nurse\SpecialistsController::class)->name('specialists');
    Route::get('finance', Nurse\FinanceController::class)->name('finance');

    Route::get('specialist/{specialist}/schedule', [Nurse\SpecialistsController::class, 'schedule'])->name('specialist.schedule');
    Route::patch('specialist/{specialist}/schedule', [Nurse\SpecialistsController::class, 'updateSchedule'])->name('specialist.schedule.update');

    Route::get('book/{patient}/{branch}', [Nurse\BookController::class, 'branch'])->name('book.branch');
    Route::get('book/{patient}/{branch}/direction/{direction}/{date}', [Nurse\BookController::class, 'direction'])->name('book.direction');
    Route::get('book/{patient}/{branch}/specialist/{specialist}/{year}/{week}', [Nurse\BookController::class, 'specialist'])->name('book.specialist');
    Route::post('book/{patient}/{branch}/{specialist}', [Nurse\BookController::class, 'store'])->name('book.store');
    Route::patch('book/{book}/{patient}/{branch}/{specialist}', [Nurse\BookController::class, 'update'])->name('book.update');
    Route::patch('book/{book}/status', [Nurse\BookController::class, 'status'])->name('book.status');
    Route::post('book/{book}/payment', [Nurse\BookController::class, 'payment'])->name('book.payment');

    Route::resource('tasks', Nurse\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Nurse\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Nurse\CommentsController::class);
        });
    });
});

Route::group(['prefix' => 'client', 'as' => 'client.', 'middleware' => ['auth', 'client']],  function () {
    Route::get('timetable', Client\TimetableController::class)->name('timetable');
    Route::get('history', Client\HistoryController::class)->name('history');
    Route::get('specialists', Client\SpecialistsController::class)->name('specialists');
    Route::get('finance', Client\FinanceController::class)->name('finance');
});

Route::group(['prefix' => 'specialist', 'as' => 'specialist.', 'middleware' => ['auth', 'specialist']],  function () {
    Route::get('timetable/{date?}', [Specialist\TimetableController::class, 'index'])->name('timetable');
    Route::get('patient/{patient}', [Specialist\PatientsController::class, 'show'])->name('patient.show');
    Route::get('appointment/{book}', [Specialist\PatientsController::class, 'appointment'])->name('appointment');
    Route::post('appointment/{book}', [Specialist\PatientsController::class, 'appointmentUpdate'])->name('appointment.update');
    Route::post('appointment/{book}/file', [Specialist\PatientsController::class, 'appointmentFile'])->name('appointment.file');
    Route::patch('appointment/{book}/toshop', [Specialist\PatientsController::class, 'toShop'])->name('appointment.toshop');
    Route::patch('appointment/{book}/torecieption', [Specialist\PatientsController::class, 'toRecieption'])->name('appointment.torecieption');

    Route::get('patients', Specialist\PatientsController::class)->name('patients');
    Route::get('specialists', Specialist\SpecialistsController::class)->name('specialists');
    Route::get('finance', Specialist\FinanceController::class)->name('finance');

    Route::resource('tasks', Specialist\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Specialist\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Specialist\CommentsController::class);
        });
    });



    Route::delete('file/{file}', [Specialist\FilesController::class, 'destroy'])->name('file.delete');
});

// Магазин

Route::group(['prefix' => 'senior', 'as' => 'senior.', 'middleware' => ['auth', 'senior']],  function () {
    Route::get('patients', Senior\PatientsController::class)->name('patients');
    Route::get('patient/create', [Senior\PatientsController::class, 'create'])->name('patient.create');
    Route::get('patient/edit/{patient}', [Senior\PatientsController::class, 'edit'])->name('patient.edit');
    Route::post('patient', [Senior\PatientsController::class, 'store'])->name('patients.store');
    Route::patch('patient/topup/{patient}', [Senior\PatientsController::class, 'topup'])->name('patient.topup');
    Route::patch('patient/{patient}', [Senior\PatientsController::class, 'update'])->name('patients.update');
    Route::get('patient/card/{patient}', [Senior\PatientsController::class, 'card'])->name('patient.card');

    Route::resource('tasks', Senior\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Senior\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Senior\CommentsController::class);
        });
    });
});

Route::group(['prefix' => 'sale', 'as' => 'sale.', 'middleware' => ['auth', 'sale']],  function () {
    Route::get('patients', Sale\PatientsController::class)->name('patients');
    Route::get('patient/create', [Sale\PatientsController::class, 'create'])->name('patient.create');
    Route::get('patient/edit/{patient}', [Sale\PatientsController::class, 'edit'])->name('patient.edit');
    Route::post('patient', [Sale\PatientsController::class, 'store'])->name('patients.store');
    Route::patch('patient/topup/{patient}', [Sale\PatientsController::class, 'topup'])->name('patient.topup');
    Route::patch('patient/{patient}', [Sale\PatientsController::class, 'update'])->name('patients.update');
    Route::get('patient/card/{patient}', [Sale\PatientsController::class, 'card'])->name('patient.card');

    Route::resource('tasks', Sale\TasksController::class);
    Route::group(['prefix' => 'tasks', 'as' => 'tasks.'],  function () {
        Route::patch('{task}/status', [Sale\TasksController::class, 'status'])->name('status');
        Route::group(['prefix' => '{task}'],  function () {
            Route::resource('comments', Sale\CommentsController::class);
        });
    });
});

Route::middleware('auth')->group(function () {

    Route::get('appointment/{book}', AppointmentController::class)->name('appointment');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::get('/migrate', function () {
    Artisan::call('migrate');
    return redirect('/');
});

Route::post('ringostat/incoming', function (Request $request) {
    CallIn::create(['data' => $request->all()]);
    return true;
});


Route::post('ringostat/incall', function (Request $request) {
    // CallIn::create(['data' => $request->all()]);
    return true;
});



Route::get('/clear', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    return redirect('/');
});
