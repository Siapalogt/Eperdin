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
        Schema::create('t_peserta', function (Blueprint $table) {
            $table->id(); // [cite: 28]
            $table->foreignId('perjalanan_id')->constrained('t_perjalanan')->onDelete('cascade'); // [cite: 28]
            $table->string('jenis_peserta', 100); // Penanda model (m_asn, m_anggota_dewan, dll) [cite: 28]
            $table->unsignedBigInteger('peserta_id'); // ID dari target personal [cite: 28]
            $table->string('jabatan_saat_perjalanan', 150)->nullable(); // [cite: 28]
            $table->string('status_hadir', 50)->default('Hadir'); // [cite: 28]
            $table->text('keterangan')->nullable(); // [cite: 28]
            $table->timestamps(); // [cite: 28]

            // Membuat indeks gabungan untuk performa query relasi polimorfik
            $table->index(['jenis_peserta', 'peserta_id']); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_peserta');
    }
};
