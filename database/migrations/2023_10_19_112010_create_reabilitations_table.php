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
        Schema::create('reabilitations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('appointment_id');

            $table->json('lines1')->nullable();
            $table->json('lines2')->nullable();

            $table->longText('ms_txt')->nullable();
            $table->boolean('ms_check')->default(false);

            $table->longText('mn_txt')->nullable();
            $table->boolean('mn_check')->default(false);

            $table->longText('ft_txt')->nullable();
            $table->boolean('ft_check')->default(false);

            $table->longText('kt_txt')->nullable();
            $table->boolean('kt_check')->default(false);

            $table->longText('tp_txt')->nullable();
            $table->boolean('tp_check')->default(false);

            $table->boolean('op_check')->default(false);

            $table->longText('bz_txt')->nullable();
            $table->boolean('bz_check')->default(false);

            $table->boolean('vs_check')->default(false);

            $table->longText('ko_txt')->nullable();
            $table->boolean('ko_check')->default(false);

            $table->longText('fx_txt')->nullable();
            $table->boolean('fx_check')->default(false);

            $table->boolean('om_check')->default(false);

            $table->longText('other_txt')->nullable();
            $table->boolean('other_check')->default(false);

            $table->string('bz_radio')->nullable();
            $table->string('om_radio')->nullable();
            $table->string('ko_radio')->nullable();

            $table->boolean('op_ds')->default(false);
            $table->boolean('op_pp')->default(false);
            $table->boolean('op_st')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reabilitations');
    }
};
