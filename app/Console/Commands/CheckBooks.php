<?php

namespace App\Console\Commands;

use App\Models\Book;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class CheckBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:books';

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
        foreach (Book::all() as $book) {
            $start = Carbon::parse($book->date . ' ' . $book->start);
            $book2 = Book::firstOrCreate([
                "date" => $start->format('Y-m-d'),
                "start" => $start->format('H:i:s'),
                "time" => $start->addMinutes(5)->format('H:i:s'),
                "duration" => $book->duration,
                "branch_id" => $book->branch_id,
                "service_id" => $book->service_id,
                "patient_id" => $book->patient_id,
                "specialist_id" => $book->specialist_id,
                "recieption_id" => $book->recieption_id,
                "status" => $book->status
            ], []);
        }
    }
}
