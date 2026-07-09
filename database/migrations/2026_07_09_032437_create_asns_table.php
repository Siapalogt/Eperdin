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
        Schema::create('m_asn', function (Blueprint $table) {
            $table->id(); // [cite: 18]
            $table->string('nip', 50)->unique(); // [cite: 18]
            $table->string('nama', 150); // [cite: 18]
            $table->string('golongan', 20)->nullable(); // [cite: 18]
            $table->string('pangkat', 50)->nullable(); // [cite: 18]
            $table->string('jabatan', 100); // [cite: 18]
            $table->string('unit_kerja', 100); // [cite: 18]
            $table->string('no_hp', 20)->nullable(); // [cite: 18]
            $table->string('email', 100)->nullable(); // [cite: 18]
            $table->string('status', 20)->default('Aktif'); // [cite: 18]
            $table->timestamps(); // [cite: 18]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_asn');
    }
};
