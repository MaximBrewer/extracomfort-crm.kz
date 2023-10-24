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
        Schema::table('users', function (Blueprint $table) {
            // $table->string('phone')->unique();
            // $table->timestamp('phone_verified_at')->nullable();
            $table->string('lastname')->nullable();
            $table->string('surname')->nullable();
            $table->unsignedBigInteger('tin')->nullable();
            $table->unsignedBigInteger('balance')->default(0);
            $table->unsignedBigInteger('locality_id')->nullable();
            $table->timestamp('birthdate')->nullable();
            $table->enum('gender', [
                'male',
                'female',
                'nonbinary'
            ])->nullable();
            $table->text('addon')->nullable();
            // $table->string('email')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->dropColumn('phone');
            // $table->dropColumn('phone_verified_at');
            $table->dropColumn('lastname');
            $table->dropColumn('surname');
            $table->dropColumn('tin');
            $table->dropColumn('balance');
            $table->dropColumn('locality_id');
            $table->dropColumn('birthdate');
            $table->dropColumn('gender');
            $table->dropColumn('addon');
        });
    }
};
