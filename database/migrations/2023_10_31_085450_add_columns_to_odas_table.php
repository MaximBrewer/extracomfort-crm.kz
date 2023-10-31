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
        Schema::table('odas', function (Blueprint $table) {
            $table->longText('adds')->nullable();
            $table->boolean('i2r', 31)->default(false);
            $table->boolean('i2l')->default(false);
            $table->boolean('i2to')->default(false);
            $table->json('i2lines')->nullable();
            $table->json('i3lines')->nullable();
            $table->json('i4lines')->nullable();
            $table->unsignedInteger('i5e1')->nullable();
            $table->unsignedInteger('i5e2')->nullable();
            $table->unsignedInteger('i5e3')->nullable();
            $table->unsignedInteger('i5e4')->nullable();
            $table->unsignedInteger('s5e1')->nullable();
            $table->unsignedInteger('s5e2')->nullable();
            $table->unsignedInteger('s5e3')->nullable();
            $table->unsignedInteger('s5e4')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('odas', function (Blueprint $table) {
            $table->dropColumn('adds');
            $table->dropColumn('i2r');
            $table->dropColumn('i2l');
            $table->dropColumn('i2lines');
            $table->dropColumn('i2to');
            $table->dropColumn('i3lines');
            $table->dropColumn('i4lines');
            $table->dropColumn('i5e1');
            $table->dropColumn('i5e2');
            $table->dropColumn('i5e3');
            $table->dropColumn('i5e4');
            $table->dropColumn('s5e1');
            $table->dropColumn('s5e2');
            $table->dropColumn('s5e3');
            $table->dropColumn('s5e4');
        });
    }
};
