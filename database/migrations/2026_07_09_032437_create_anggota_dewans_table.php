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
        Schema::create('m_anggota_dewan', function (Blueprint $table) {
            $table->id(); // [cite: 19]
            $table->string('nama', 150); // [cite: 19]
            $table->string('jabatan', 100); // [cite: 19]
            $table->string('fraksi', 50); // [cite: 19]
            $table->string('komisi', 50)->nullable(); // [cite: 19]
            $table->string('no_hp', 20)->nullable(); // [cite: 19]
            $table->string('email', 100)->nullable(); // [cite: 19]
            $table->string('status', 20)->default('Aktif'); // [cite: 19]
            $table->timestamps(); // [cite: 19]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_anggota_dewan');
    }
};
