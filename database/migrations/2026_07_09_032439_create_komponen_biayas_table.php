<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_komponen_biaya', function (Blueprint $table) {
            $table->id(); // [cite: 23]
            $table->foreignId('kelompok_biaya_id')->constrained('m_kelompok_biaya')->onDelete('cascade'); // [cite: 23]
            $table->string('kode', 50)->unique(); // [cite: 23]
            $table->string('nama', 100); // [cite: 23]
            $table->string('berlaku_untuk', 50); // [cite: 23]
            $table->string('satuan_default', 50)->nullable(); // [cite: 23]
            $table->boolean('wajib_bukti')->default(false); // [cite: 23]
            $table->string('status', 20)->default('Aktif'); // [cite: 23]
            $table->timestamps(); // [cite: 23]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_komponen_biaya');
    }
};
