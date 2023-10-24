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
        Schema::create('odas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('appointment_id');

            $table->json('triggers')->nullable();
            $table->json('viscers')->nullable();

            $table->string('m1standleft')->nullable();
            $table->string('m1standright')->nullable();
            $table->string('m2standleft')->nullable();
            $table->string('m2standright')->nullable();
            $table->string('m3standleft')->nullable();
            $table->string('m3standright')->nullable();
            $table->string('m4standleft')->nullable();
            $table->string('m4standright')->nullable();
            $table->string('m1sitleft')->nullable();
            $table->string('m1sitright')->nullable();
            $table->string('m2sitleft')->nullable();
            $table->string('m2sitright')->nullable();
            $table->string('m3sitleft')->nullable();
            $table->string('m3sitright')->nullable();
            $table->string('m4sitleft')->nullable();
            $table->string('m4sitright')->nullable();
            $table->string('m1lieleft')->nullable();
            $table->string('m1lieright')->nullable();
            $table->string('m2lieleft')->nullable();
            $table->string('m2lieright')->nullable();
            $table->string('m3lieleft')->nullable();
            $table->string('m3lieright')->nullable();
            $table->string('m4lieleft')->nullable();
            $table->string('m4lieright')->nullable();

            $table->text('nevrology')->nullable();

            $table->string('coordrom1')->nullable();
            $table->string('coordfuk1')->nullable();
            $table->string('coordzm1')->nullable();
            $table->string('coordrom2')->nullable();
            $table->string('coordfuk2')->nullable();
            $table->string('coordzm2')->nullable();

            $table->string('addons1I')->nullable();
            $table->string('addons1II')->nullable();
            $table->string('addons1III')->nullable();
            $table->string('addons2I')->nullable();
            $table->string('addons2II')->nullable();
            $table->string('addons2III')->nullable();
            $table->string('addons3I')->nullable();
            $table->string('addons3II')->nullable();
            $table->string('addons3III')->nullable();
            $table->string('addons4I')->nullable();
            $table->string('addons4II')->nullable();
            $table->string('addons4III')->nullable();
            $table->string('addons5I')->nullable();
            $table->string('addons5II')->nullable();
            $table->string('addons5III')->nullable();
            $table->string('addons6I')->nullable();
            $table->string('addons6II')->nullable();
            $table->string('addons6III')->nullable();
            $table->string('addons7I')->nullable();
            $table->string('addons7II')->nullable();
            $table->string('addons7III')->nullable();
            $table->string('addons8I')->nullable();
            $table->string('addons8II')->nullable();
            $table->string('addons8III')->nullable();
            $table->string('addons9I')->nullable();
            $table->string('addons9II')->nullable();
            $table->string('addons9III')->nullable();
            $table->string('addons10I')->nullable();
            $table->string('addons10II')->nullable();
            $table->string('addons10III')->nullable();

            $table->text('mobilisation')->nullable();
            $table->text('stabilization')->nullable();
            $table->text('strengthening')->nullable();

            $table->json('kraus')->nullable();
            $table->json('webber')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('odas');
    }
};
