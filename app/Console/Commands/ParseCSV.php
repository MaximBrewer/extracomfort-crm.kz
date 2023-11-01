<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ParseCSV extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:csv';

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
            0 => "Регион", //
            1 => "Состояние записи", // 
            2 => "Файлы", //
            3 => "№ АК", //
            4 => "Шифр АК",
            5 => "Дата заведения АК",
            6 => "Ф.И.О.",
            7 => "Пол",
            8 => "Дата рождения",
            9 => "ИИН",
            10 => "№ документа, удостоверяющего личность",
            11 => "Категория льготности",
            12 => "Телефоны",
            13 => "Адрес",
            14 => "Участок"
        ];
        $row = 1;
        if (($handle = fopen(Storage::path('../../csv/пациенты.csv'), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                if ($row > 1) {

                    if ($data[12]) $phones = $data[12];
                    elseif ($data[4]) $phones = $data[4];
                    else $phones = "";
                    $phones = preg_split('/[,;]/', $phones, -1, PREG_SPLIT_NO_EMPTY);
                    foreach ($phones as &$phone) {
                        $phone = preg_replace("/[^0-9]/", '', $phone);
                        if (strlen($phone) > 11 || strlen($phone) < 10) continue;
                        if (strlen($phone) === 11) $phone = substr($phone, 1);
                        $phone = "+7" . $phone;
                    }
                    $fio = $data[6];
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


                    if ($data[3]) $user = User::where('ais_id', $data[3])->first();
                    elseif (preg_replace("/[^0-9]/", '', $data[9])) $user = User::where('tin', preg_replace("/[^0-9]/", '', $data[9]))->first();
                    else $user = count($phones) ? User::whereIn('phone', $phones)->first() : null;


                    if (!$user) {
                        $user = User::where(function (Builder $query) use ($firstname, $lastname, $surname) {
                            $query
                                ->where('name', $firstname)
                                ->where('lastname', $lastname)
                                ->where('surname', $surname);
                        })
                            ->orWhere(function (Builder $query) use ($data) {
                                $query->whereNot('ais_id', "")
                                    ->whereNotNull('ais_id')
                                    ->where('ais_id', $data[3]);
                            })
                            ->first();
                    }

                    $user = $user ?: new User();

                    if ($user->role && $user->role->id !== 2) continue;
                    $user->name = $firstname;
                    $user->lastname = $lastname;
                    $user->surname = $surname;
                    $user->tin = preg_replace("/[^0-9]/", '', $data[9]);
                    $user->email = Str::random(8) . '@extracomfort.kz';
                    $user->phone = (count($phones) ? $phones[0] : null);
                    $user->birthdate = $data[8] ? Carbon::parse(str_replace("/", ".", $data[8])) : null;
                    $user->gender = ($data[7] === "жен" ? 'female' : 'male');
                    $user->ais_id = $data[3];
                    $user->created_at = ($data[5] ? Carbon::parse(str_replace("/", ".", $data[5])) : now());
                    $user->save();
                }
                $row++;
            }
            fclose($handle);
        }
    }
}
