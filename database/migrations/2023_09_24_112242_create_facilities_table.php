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
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order')->default(1000);
            $table->longText('icon')->nullable();
            $table->string('image', 1023)->nullable();
            $table->string('title', 1023);
            $table->text('subtitle')->nullable();
            $table->string('slug', 1023)->nullable();
            $table->longText('text1')->nullable();
            $table->longText('text2')->nullable();
            $table->longText('text3')->nullable();
            $table->longText('text4')->nullable();
            $table->longText('text5')->nullable();
            $table->longText('text6')->nullable();
            $table->string('text6image', 1023)->nullable();
            $table->string('sign1', 1023)->nullable();
            $table->string('sign2', 1023)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
