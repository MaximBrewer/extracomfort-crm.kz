<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('painmaps')->update(['pomed' => null, 'ponomed' => null]);
        Schema::table('painmaps', function (Blueprint $table) {
            $table->json('pomed')->change();
            $table->json('ponomed')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('painmaps', function (Blueprint $table) {
            $table->string('pomed')->change();
            $table->string('ponomed')->change();
        });
    }
};
