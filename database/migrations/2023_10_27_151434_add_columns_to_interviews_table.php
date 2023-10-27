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
        Schema::table('interviews', function (Blueprint $table) {
            $table->boolean('reablech')->nullable();
            $table->boolean('farmlech')->nullable();
            $table->boolean('hirurglech')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('interviews', function (Blueprint $table) {
            $table->dropColumn('reablech');
            $table->dropColumn('farmlech');
            $table->dropColumn('hirurglech');
        });
    }
};
