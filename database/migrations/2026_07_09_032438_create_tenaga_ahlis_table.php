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
        Schema::create('m_tenaga_ahli', function (Blueprint $table) {
            $table->id(); // [cite: 20]
            $table->foreignId('anggota_dewan_id')->constrained('m_anggota_dewan')->onDelete('cascade'); // [cite: 20]
            $table->string('nama', 150); // [cite: 20]
            $table->string('jabatan', 100); // [cite: 20]
            $table->string('no_hp', 20)->nullable(); // [cite: 20]
            $table->string('email', 100)->nullable(); // [cite: 20]
            $table->string('status', 20)->default('Aktif'); // [cite: 20]
            $table->timestamps(); // [cite: 20]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_tenaga_ahli');
    }
};
