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
        Schema::table('painmaps', function (Blueprint $table) {
            $table->json('lines')->nullable();
            $table->json('paindata')->nullable();
            $table->json('repeatpaindata')->nullable();
            $table->json('dynamicpaindata')->nullable();
            $table->string('frequency')->nullable();
            $table->string('frequencytext')->nullable();
            $table->string('worsing')->nullable();
            $table->string('worsingtext')->nullable();
            $table->string('pomed')->nullable();
            $table->string('pomedtext')->nullable();
            $table->string('ponomed')->nullable();
            $table->string('ponomedtext')->nullable();
            $table->json('sideeffects')->nullable();
            $table->string('sideeffecttext')->nullable();
            $table->string('therapyeffect')->nullable();
            $table->text('comment')->nullable();
            $table->text('localisation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('painmaps', function (Blueprint $table) {
            $table->dropColumn('lines');
            $table->dropColumn('paindata');
            $table->dropColumn('repeatpaindata');
            $table->dropColumn('dynamicpaindata');
            $table->dropColumn('frequency');
            $table->dropColumn('frequencytext');
            $table->dropColumn('worsing');
            $table->dropColumn('worsingtext');
            $table->dropColumn('pomed');
            $table->dropColumn('pomedtext');
            $table->dropColumn('ponomed');
            $table->dropColumn('ponomedtext');
            $table->dropColumn('sideeffects');
            $table->dropColumn('sideeffecttext');
            $table->dropColumn('therapyeffect');
            $table->dropColumn('comment');
            $table->dropColumn('localisation');
        });
    }
};
