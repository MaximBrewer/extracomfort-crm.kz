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
        Schema::create('addons', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('appointment_id');

            $table->boolean('rentgen_check')->default(false);
            $table->longText('rentgen_txt')->nullable();
            $table->string('rentgen_opt')->nullable();
            $table->boolean('uzi_check')->default(false);
            $table->longText('uzi_txt')->nullable();
            $table->string('uzi_opt')->nullable();
            $table->boolean('ot_check')->default(false);
            $table->longText('ot_txt')->nullable();
            $table->string('ot_opt')->nullable();
            $table->boolean('mrt_check')->default(false);
            $table->longText('mrt_txt')->nullable();
            $table->string('mrt_opt')->nullable();
            $table->boolean('other_check')->default(false);
            $table->longText('other_txt')->nullable();
            $table->string('other_opt')->nullable();
            $table->boolean('kuc_check')->default(false);
            $table->longText('kuc_txt')->nullable();
            $table->string('kuc_opt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addons');
    }
};
