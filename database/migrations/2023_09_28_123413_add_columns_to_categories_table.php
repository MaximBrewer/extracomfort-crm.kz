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
        Schema::table('categories', function (Blueprint $table) {
            $table->string('sizes_men')->nullable();
            $table->string('sizes_women')->nullable();
            $table->string('sizes_girlteen')->nullable();
            $table->string('sizes_boyteen')->nullable();
            $table->string('sizes_girl')->nullable();
            $table->string('sizes_boy')->nullable();
            $table->string('sizes_girlbaby')->nullable();
            $table->string('sizes_boybaby')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('bg');
        });
    }
};
