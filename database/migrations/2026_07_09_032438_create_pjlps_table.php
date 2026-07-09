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
        Schema::create('m_pjlp', function (Blueprint $table) {
            $table->id(); // [cite: 21]
            $table->string('nama', 150); // [cite: 21]
            $table->string('bagian', 100); // [cite: 21]
            $table->string('jabatan', 100); // [cite: 21]
            $table->string('no_hp', 20)->nullable(); // [cite: 21]
            $table->string('status', 20)->default('Aktif'); // [cite: 21]
            $table->timestamps(); // [cite: 21]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_pjlp');
    }
};
