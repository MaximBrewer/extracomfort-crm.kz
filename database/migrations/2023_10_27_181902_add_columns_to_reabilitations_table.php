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
        Schema::table('reabilitations', function (Blueprint $table) {
            $table->unsignedInteger('ms_opt')->nullable();
            $table->unsignedInteger('ft_opt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reabilitations', function (Blueprint $table) {
            $table->dropColumn('ms_opt');
            $table->dropColumn('ft_opt');
        });
    }
};
