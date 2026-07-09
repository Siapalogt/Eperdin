<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_field_komponen', function (Blueprint $table) {
            $table->id(); // [cite: 24]
            $table->foreignId('komponen_biaya_id')->constrained('m_komponen_biaya')->onDelete('cascade'); // [cite: 24]
            $table->string('label', 100); // [cite: 24]
            $table->string('field_name', 100); // [cite: 24]
            $table->string('input_type', 50); // [cite: 24]
            $table->text('pilihan')->nullable(); // [cite: 24]
            $table->boolean('required')->default(false); // [cite: 24]
            $table->integer('urutan')->default(0); // [cite: 24]
            $table->string('status', 20)->default('Aktif'); // [cite: 24]
            $table->timestamps(); // [cite: 24]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_field_komponen');
    }
};
