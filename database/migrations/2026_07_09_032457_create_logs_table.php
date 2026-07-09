<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_log', function (Blueprint $table) {
            $table->id(); // [cite: 32]
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // [cite: 32]
            $table->string('aktivitas', 255); // [cite: 32]
            $table->string('referensi_tabel', 100)->nullable(); // [cite: 32]
            $table->unsignedBigInteger('referensi_id')->nullable(); // [cite: 32]
            $table->text('keterangan')->nullable(); // [cite: 32]
            $table->timestamp('created_at')->useCurrent(); // [cite: 32]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_log');
    }
};
