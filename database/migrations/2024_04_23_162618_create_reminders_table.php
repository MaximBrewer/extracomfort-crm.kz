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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->unsignedBigInteger('branch_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('specialist_id');
            $table->unsignedBigInteger('recieption_id');
            $table->enum('status', [
                'none',
                'confirmed',
                'lost',
                'canceled',
                'completed'
            ])->default('none');
            $table->timestamps();
            $table->softDeletes();
        });
    }
    // id, date, start, time, duration, branch_id, service_id, patient_id, specialist_id, recieption_id, created_at, updated_at, status
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
