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
            $table->unsignedInteger('rise')->nullable();
            $table->unsignedInteger('rise2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('odas', function (Blueprint $table) {
            $table->dropColumn('icondark');
        });
    }
};
