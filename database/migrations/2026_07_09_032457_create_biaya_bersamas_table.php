<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_biaya_bersama', function (Blueprint $table) {
            $table->id(); // [cite: 30]
            $table->foreignId('perjalanan_id')->constrained('t_perjalanan')->onDelete('cascade'); // [cite: 30]
            $table->foreignId('komponen_biaya_id')->constrained('m_komponen_biaya'); // [cite: 30]
            $table->integer('qty')->default(1); // [cite: 30]
            $table->string('satuan', 50); // [cite: 30]
            $table->decimal('harga_satuan', 15, 2)->default(0); // [cite: 30]
            $table->decimal('total', 15, 2)->default(0); // [cite: 30]
            $table->json('detail_json')->nullable(); // [cite: 30]
            $table->text('keterangan')->nullable(); // [cite: 30]
            $table->timestamps(); // [cite: 30]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_biaya_bersama');
    }
};
