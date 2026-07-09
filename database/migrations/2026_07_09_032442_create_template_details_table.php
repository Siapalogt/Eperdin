<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_template_detail', function (Blueprint $table) {
            $table->id(); // [cite: 26]
            $table->foreignId('template_perjalanan_id')->constrained('m_template_perjalanan')->onDelete('cascade'); // [cite: 26]
            $table->foreignId('komponen_biaya_id')->constrained('m_komponen_biaya')->onDelete('cascade'); // [cite: 26]
            $table->integer('qty_default')->default(1); // [cite: 26]
            $table->string('satuan', 50); // [cite: 26]
            $table->integer('urutan')->default(0); // [cite: 26]
            $table->timestamps(); // [cite: 26]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_template_detail');
    }
};
