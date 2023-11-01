<?php

namespace App\Console\Commands;

use App\Models\Book;
use App\Models\Direction;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ParseCSV11 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:csv11';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */


    public function handle(): void
    {
        $columns = [
            0 => "п/п", //
            1 => "Пациент", // 
            2 => "Наименование услуги", //
            3 => "", //
            4 => "Информация об оплате",
            5 => "Информация о скидке",
            6 => "Сумма с учетом скидки",
            7 => ""
        ];
        $row = 1;
        $date = now();
        $time = $date = Carbon::parse($date->format('Y-m-d 09:00:00'));
        $errcnt = 0;
        if (($handle = fopen(storage_path('csv/Мишин.csv'), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                if (strstr($data[0], 'Дата приема:')) {
                    $date = Carbon::parse(trim(str_replace('Дата приема:', '', $data[0])));
                    $time = $date = Carbon::parse($date->format('Y-m-d 09:00:00'));
                } elseif ($id = (int)$data[0]) {
                    $fio = $data[1];
                    $fio = preg_split('/\s/', $fio, -1, PREG_SPLIT_NO_EMPTY);
                    if (!count($fio)) continue;
                    switch (count($fio)) {
                        case 1;
                            $firstname = $fio[0];
                            $lastname = "";
                            $surname = "";
                            break;
                        case 2;
                            $lastname = $fio[0];
                            $firstname = $fio[1];
                            $surname = "";
                            break;
                        case 3;
                            $lastname = $fio[0];
                            $firstname = $fio[1];
                            $surname = $fio[2];
                            break;
                    }
                    if ($surname) {
                        $user = User::where('name', $firstname)
                            ->where('lastname', $lastname)
                            ->where('surname', $surname)
                            ->first();
                    } else {
                        $user = User::where('name', $firstname)
                            ->where('lastname', $lastname)
                            ->first();
                    }
                    if (!$user) {
                        dump($fio);
                        $errcnt++;
                        continue;
                    }
                    $direction = Direction::find(11);
                    $service = $direction->services()->firstOrCreate(['title' => $data[2]]);
                    $book = false;
                    do {
                        try {
                            $book = Book::firstOrCreate([
                                'date' => $date->format("Y-m-d"),
                                'status' => 'completed',
                                'service_id' => $service->id,
                                'branch_id' => 1,
                                'patient_id' => $user->id,
                                'specialist_id' => 7,
                                'recieption_id' => null,
                                'duration' => 10
                            ], [
                                'start' => $time->format("H:i:s"),
                                'time' => $time->format("H:i:s"),
                            ]);
                        } catch (\Throwable $e) {
                        }
                        $time->addMinutes(10);
                    } while (!$book);
                }
                $row++;
            }
            fclose($handle);
            dump($errcnt);
        }
    }



    // public function handle(): void
    // {
    //     $columns = [
    //         0 => "Регион", //
    //         1 => "Состояние записи", // 
    //         2 => "Файлы", //
    //         3 => "№ АК", //
    //         4 => "Шифр АК",
    //         5 => "Дата заведения АК",
    //         6 => "Ф.И.О.",
    //         7 => "Пол",
    //         8 => "Дата рождения",
    //         9 => "ИИН",
    //         10 => "№ документа, удостоверяющего личность",
    //         11 => "Категория льготности",
    //         12 => "Телефоны",
    //         13 => "Адрес",
    //         14 => "Участок"
    //     ];
    //     $row = 1;
    //     if (($handle = fopen(storage_path('csv/пациенты.csv'), "r")) !== FALSE) {
    //         while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
    //             if ($row > 1) {
    //                 if ($data[12]) $phones = $data[12];
    //                 elseif ($data[4]) $phones = $data[4];
    //                 else $phones = "";
    //                 $phones = preg_split('/[,;]/', $phones, -1, PREG_SPLIT_NO_EMPTY);
    //                 foreach ($phones as &$phone) {
    //                     $phone = preg_replace("/[^0-9]/", '', $phone);
    //                     if (strlen($phone) > 11 || strlen($phone) < 10) continue;
    //                     if (strlen($phone) === 11) $phone = substr($phone, 1);
    //                     $phone = "+7" . $phone;
    //                 }
    //                 $fio = $data[6];
    //                 $fio = preg_split('/\s/', $fio, -1, PREG_SPLIT_NO_EMPTY);
    //                 if (!count($fio)) continue;
    //                 switch (count($fio)) {
    //                     case 1;
    //                         $firstname = $fio[0];
    //                         $lastname = "";
    //                         $surname = "";
    //                         break;
    //                     case 2;
    //                         $lastname = $fio[0];
    //                         $firstname = $fio[1];
    //                         $surname = "";
    //                         break;
    //                     case 3;
    //                         $lastname = $fio[0];
    //                         $firstname = $fio[1];
    //                         $surname = $fio[2];
    //                         break;
    //                 }
    //                 $user = count($phones) ? User::whereIn('phone', $phones)->first() : null;
    //                 if (!$user) {
    //                     $user = User::where(function (Builder $query) use ($data) {
    //                         $query->whereNot('tin', "")
    //                             ->whereNotNull('tin')
    //                             ->where('tin', preg_replace("/[^0-9]/", '', $data[9]));
    //                     })
    //                         ->orWhere(function (Builder $query) use ($firstname, $lastname, $surname) {
    //                             $query
    //                                 ->where('name', $firstname)
    //                                 ->where('lastname', $lastname)
    //                                 ->where('surname', $surname);
    //                         })
    //                         ->orWhere(function (Builder $query) use ($data) {
    //                             $query->whereNot('ais_id', "")
    //                                 ->whereNotNull('ais_id')
    //                                 ->where('ais_id', $data[3]);
    //                         })
    //                         ->first();
    //                 }
    //                 $user = $user ?: new User();
    //                 $user->name = $user->name ?: $firstname;
    //                 $user->lastname = $user->lastname ?: $lastname;
    //                 $user->surname = $user->surname ?: $surname;
    //                 $user->email = $user->email ?: ((count($phones) && $phones[0] ? $phones[0] : Str::random(8)) . '@extracomfort.kz');
    //                 $user->phone = $user->phone ?: (count($phones) ? $phones[0] : null);
    //                 $user->tin = $user->tin ? $user->tin : preg_replace("/[^0-9]/", '', $data[9]);
    //                 $user->birthdate = $user->birthdate ?: ($data[8] ? Carbon::parse(str_replace("/", ".", $data[8])) : null);
    //                 $user->gender = $user->gender ?: ($data[7] === "жен" ? 'female' : 'male');
    //                 $user->ais_id = $data[3];
    //                 $user->role_id = $user->role_id ?: 2;
    //                 $user->created_at = $user->created_at ?: ($data[5] ? Carbon::parse(str_replace("/", ".", $data[5])) : now());
    //                 $user->save();
    //             }
    //             $row++;
    //         }
    //         fclose($handle);
    //     }
    // }
}
