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
        Schema::create('m_kelompok_biaya', function (Blueprint $table) {
            $table->id(); // [cite: 22]
            $table->string('kode', 50)->unique(); // [cite: 22]
            $table->string('nama', 100); // [cite: 22]
            $table->integer('urutan')->default(0); // [cite: 22]
            $table->string('status', 20)->default('Aktif'); // [cite: 22]
            $table->timestamps(); // [cite: 22]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_kelompok_biaya');
    }
};
