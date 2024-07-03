<?php

namespace App\Console\Commands;

use App\Models\Book;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FillRepeat extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:repeat';

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
        $patients = [];
        DB::table('books')->update([
            'repeated' => false
        ]);
        foreach (DB::table('books')->whereRaw('start=time')->orderBy('date')->get() as $book) {
            dump($book->date);
            if (!in_array($book->patient_id, $patients)) {
                $patients[] = $book->patient_id;
            } else {
                DB::table('books')->where('id', $book->id)->update([
                    'repeated' => true
                ]);
            }
        }
    }
}
