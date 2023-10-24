<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name', 1023)->nullable();
            $table->string('lastname', 1023)->nullable();
            $table->string('phone', 1023)->nullable();
            $table->string('email', 1023)->nullable();
            $table->text('comment')->nullable();
            $table->unsignedBigInteger('delivery_id')->nullable();
            $table->string('region', 1023)->nullable();
            $table->string('city', 1023)->nullable();
            $table->string('street', 1023)->nullable();
            $table->string('house', 1023)->nullable();
            $table->string('appartement', 1023)->nullable();
            $table->unsignedBigInteger('payment_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
