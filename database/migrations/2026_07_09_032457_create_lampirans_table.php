<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_lampiran', function (Blueprint $table) {
            $table->id(); // [cite: 31]
            $table->string('owner_type', 100); // Polimorfik: T_Perjalanan, T_Peserta, dll [cite: 31]
            $table->unsignedBigInteger('owner_id'); // Target ID [cite: 31]
            $table->string('kategori', 100); // Tiket, Hotel, Struk Tol, dll [cite: 31]
            $table->string('nama_file', 255); // [cite: 31]
            $table->string('file_path', 255); // [cite: 31]
            $table->integer('file_size'); // [cite: 31]
            $table->text('keterangan')->nullable(); // [cite: 31]
            $table->timestamp('created_at')->useCurrent(); // [cite: 31]

            $table->index(['owner_type', 'owner_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_lampiran');
    }
};
