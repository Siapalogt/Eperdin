<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_template_detail', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke Master Template
            $table->foreignId('template_perjalanan_id')->constrained('m_template_perjalanan')->cascadeOnDelete();
            
            // Kolom spesifik untuk Rule Engine
            $table->string('jenis_peserta'); // Diisi: Asn, Dewan, Ta, Pjlp
            $table->foreignId('kelompok_biaya_id')->constrained('m_kelompok_biaya')->cascadeOnDelete();
            $table->foreignId('komponen_biaya_id')->constrained('m_komponen_biaya')->cascadeOnDelete();
            
            // Kolom bawaan dari dokumentasi DB
            $table->integer('qty_default')->default(1);
            $table->string('satuan')->nullable();
            $table->integer('urutan')->default(0);
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_template_detail');
    }
};