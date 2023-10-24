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
        Schema::create('user_direction', function (Blueprint $table) {
            $table->boolean('base')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('direction_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_direction');
    }
};
