<?php

namespace App\Console\Commands\Tasks;

use App\Models\Task;
use Illuminate\Console\Command;

class ClearOld extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:clearold';

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
        $tasks = Task::where('status_id', 3)->where('updated_at', '<', now()->addMonth())->get();
        foreach ($tasks as $task) {
            $task->delete();
        }
    }
}
