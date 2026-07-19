<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_biaya_peserta', function (Blueprint $table) {
            $table->id(); // [cite: 29]
            $table->foreignId('peserta_id')->constrained('t_peserta')->onDelete('cascade'); // [cite: 29]
            $table->foreignId('komponen_biaya_id')->constrained('m_komponen_biaya'); // [cite: 29]
            $table->integer('qty')->default(1); // [cite: 29]
            $table->string('satuan',50); // [cite: 29]
            $table->decimal('harga_satuan', 15, 2)->default(0); // [cite: 29]
            $table->decimal('total', 15, 2)->default(0); // [cite: 29]
            $table->json('detail_json')->nullable(); // Menampung struktur dinamis form komponen [cite: 29]
            $table->text('keterangan')->nullable(); // [cite: 29]
            $table->timestamps(); // [cite: 29]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_biaya_peserta');
    }
};
