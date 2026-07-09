<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Perjalanan extends Model
{
    protected $table = 't_perjalanan';

    // 1. Relasi ke daftar peserta (Satu perjalanan memiliki banyak peserta)
    public function peserta(): HasMany
    {
        return $this->hasMany(Peserta::class, 'perjalanan_id');
    }

    // 2. Relasi ke biaya bersama (Satu perjalanan memiliki banyak biaya bersama)
    public function biaya_bersama(): HasMany
    {
        return $this->hasMany(BiayaBersama::class, 'perjalanan_id');
    }
}