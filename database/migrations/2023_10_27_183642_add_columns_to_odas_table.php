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
            $table->string('sagc3I',31)->nullable();
            $table->string('sagc3II',31)->nullable();
            $table->string('sagc3III',31)->nullable();
            $table->string('sagc7I',31)->nullable();
            $table->string('sagc7II',31)->nullable();
            $table->string('sagc7III',31)->nullable();
            $table->string('sagcomI',31)->nullable();
            $table->string('sagcomII',31)->nullable();
            $table->string('sagcomIII',31)->nullable();
            $table->string('sagheadI',31)->nullable();
            $table->string('sagheadII',31)->nullable();
            $table->string('sagheadIII',31)->nullable();
            $table->string('sagl3I',31)->nullable();
            $table->string('sagl3II',31)->nullable();
            $table->string('sagl3III',31)->nullable();
            $table->string('sags1I',31)->nullable();
            $table->string('sags1II',31)->nullable();
            $table->string('sags1III',31)->nullable();
            $table->string('sagth4I',31)->nullable();
            $table->string('sagth4II',31)->nullable();
            $table->string('sagth4III',31)->nullable();
            $table->string('sagth12I',31)->nullable();
            $table->string('sagth12II',31)->nullable();
            $table->string('sagth12III',31)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('odas', function (Blueprint $table) {
            $table->dropColumn('sagc3I');
            $table->dropColumn('sagc3II');
            $table->dropColumn('sagc3III');
            $table->dropColumn('sagc7I');
            $table->dropColumn('sagc7II');
            $table->dropColumn('sagc7III');
            $table->dropColumn('sagcomI');
            $table->dropColumn('sagcomII');
            $table->dropColumn('sagcomIII');
            $table->dropColumn('sagheadI');
            $table->dropColumn('sagheadII');
            $table->dropColumn('sagheadIII');
            $table->dropColumn('sagl3I');
            $table->dropColumn('sagl3II');
            $table->dropColumn('sagl3III');
            $table->dropColumn('sags1I');
            $table->dropColumn('sags1II');
            $table->dropColumn('sags1III');
            $table->dropColumn('sagth4I');
            $table->dropColumn('sagth4II');
            $table->dropColumn('sagth4III');
            $table->dropColumn('sagth12I');
            $table->dropColumn('sagth12II');
            $table->dropColumn('sagth12III');
        });
    }
};
