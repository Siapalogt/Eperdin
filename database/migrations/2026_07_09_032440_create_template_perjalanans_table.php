<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_template_perjalanan', function (Blueprint $table) {
            $table->id(); // [cite: 25]
            $table->string('nama', 150); // [cite: 25]
            $table->text('keterangan')->nullable(); // [cite: 25]
            $table->string('status', 20)->default('Aktif'); // [cite: 25]
            $table->timestamps(); // [cite: 25]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_template_perjalanan');
    }
};
