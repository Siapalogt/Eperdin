<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Log extends Model
{
    protected $table = 't_log';
    public $timestamps = false; // Hanya menggunakan created_at bawaan diagram

    // Mencatat user siapa yang melakukan aktivitas/perubahan data
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}