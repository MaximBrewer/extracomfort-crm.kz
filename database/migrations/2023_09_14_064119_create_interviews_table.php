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
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('kinesio_id');


            $table->text('waiting')->nullable();
            $table->text('bornpremature')->nullable();
            $table->string('bornprematureweek', 63)->nullable();
            $table->string('bornprematureweight', 63)->nullable();
            $table->text('pregnancyfactors')->nullable();
            $table->text('abnormalitiesbirth')->nullable();
            $table->text('conditionafterbirth')->nullable();
            $table->text('babyweight')->nullable();
            $table->text('childbreathingsupport')->nullable();
            $table->text('problemsparentschild')->nullable();
            $table->text('formstreatmentusedfar')->nullable();
            $table->text('childfeedingproblems')->nullable();
            $table->text('childsleepingproblems')->nullable();
            $table->text('childcopeprocedures')->nullable();
            $table->text('motorskilldominate')->nullable();
            $table->text('motordevelopmentprogressed')->nullable();
            $table->boolean('motordevelopmentprogress')->default(false);
            $table->boolean('motordevelopmentdeterioration')->default(false);
            $table->text('neurologicaldiseasesfamily')->nullable();
            $table->text('notes')->nullable();
            $table->text('periodhighestlevelmotorskills')->nullable();
            $table->text('biggestproblemfunctions')->nullable();
            $table->text('havepainsymptoms')->nullable();
            $table->text('treatmentbeenfar')->nullable();
            $table->text('treatedbotulinum')->nullable();
            $table->text('treatedbotulinumresult')->nullable();
            $table->text('specialexaminations')->nullable();
            $table->text('xrayshipjoints')->nullable();
            $table->text('intellectualdevelopment')->nullable();
            $table->text('communicationenvironment')->nullable();
            $table->text('extentassistance')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
