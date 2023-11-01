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


class ParseCSV13 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:csv13';

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
        if (($handle = fopen(storage_path('csv/Уфанюков.csv'), "r")) !== FALSE) {
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
                    $direction = Direction::find(2);
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
                                'specialist_id' => 37,
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
}
