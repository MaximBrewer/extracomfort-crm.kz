<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start');
            $table->time('time');
            $table->unsignedInteger('duration');
            $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('specialist_id');
            $table->unsignedBigInteger('recieption_id')->nullable();
            $table->unique(['date', 'time', 'specialist_id', 'canceled']);
            $table->unique(['date', 'time', 'patient_id', 'canceled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
