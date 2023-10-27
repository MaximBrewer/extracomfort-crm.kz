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
        Schema::create('podiatries', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('appointment_id');

            $table->json('insoleslines')->nullable();
            $table->json('insoleselements')->nullable();
            $table->longText('heading')->nullable();
            $table->string('file')->nullable();
            $table->json('fpi')->nullable();
            $table->longText('insolesnote')->nullable();

            $table->string('medical_check')->nullable();
            $table->string('medical_opt')->nullable();
            $table->string('medical_txt')->nullable();
            $table->string('semi_check')->nullable();
            $table->string('semi_opt')->nullable();
            $table->string('semi_txt')->nullable();
            $table->string('stable_check')->nullable();
            $table->string('stable_opt')->nullable();
            $table->string('stable_txt')->nullable();
            $table->json('extensions')->nullable();
            $table->json('ledges')->nullable();
            $table->json('shoeslines')->nullable();
            $table->json('shoeselements')->nullable();
            $table->longText('shoesnote')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('podiatries');
    }
};
