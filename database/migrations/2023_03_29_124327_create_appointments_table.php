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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_id');
            $table->unsignedSmallInteger('status_id')->default(1);
            $table->enum('current', [
                'consult',
                'ods',
                'painmap',
                'addon',
                'podiatry',
                'plan',
                'kinesio',
                'taping',
                'manual',
                'other',

            ])->default('consult');
            $table->text('сomplaints')->nullable(); //жалобы
            $table->text('anmorbi')->nullable(); //An.morbi:
            $table->text('anvitae')->nullable(); //An.vitae:
            $table->text('stlocalic')->nullable(); //St.localis:
            $table->text('traumasurgery')->nullable(); //Хирургические вмешательства или травмы:
            $table->text('laboratorydata')->nullable(); //Данные лабораторных/инструментальных методов обследования:
            $table->text('adddiagnosticexam')->nullable(); //Дополнительное диагностическое обследование:
            $table->text('consultspecialists')->nullable(); //Конультация специалистов:
            $table->text('conclusion')->nullable(); //Заключение:
            $table->text('recommendations')->nullable(); //Рекомендации:

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
