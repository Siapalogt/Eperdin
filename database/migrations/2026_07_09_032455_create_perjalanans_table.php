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
        Schema::create('t_perjalanan', function (Blueprint $table) {
            $table->id(); // [cite: 27]
            $table->string('nomor', 100)->unique(); // [cite: 27]
            $table->foreignId('template_perjalanan_id')->constrained('m_template_perjalanan'); // [cite: 27]
            $table->string('nama_kegiatan', 255); // [cite: 27]
            $table->string('kategori_perjalanan', 100);
            $table->string('tujuan', 150); // [cite: 27]
            $table->string('lokasi', 255)->nullable(); // [cite: 27]
            $table->date('tanggal_berangkat'); // [cite: 27]
            $table->date('tanggal_pulang'); // [cite: 27]
            $table->integer('lama_hari'); // [cite: 27]
            $table->text('keterangan')->nullable(); // [cite: 27]
            $table->string('status', 30)->default('Draft'); // [cite: 27]
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // [cite: 27]
            $table->timestamps(); // [cite: 27]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_perjalanan');
    }
};
