<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Perjalanan extends Model
{
    protected $table = 't_perjalanan';

    // 💡 TAMBAHKAN BARIS INI UNTUK MEMBUKA GERBANG VALIDASI ELOQUENT
    protected $guarded = []; 

    // Relasi yang sudah kita buat sebelumnya jangan dibuang:
    public function peserta(): HasMany
    {
        return $this->hasMany(Peserta::class, 'perjalanan_id');
    }

    public function biaya_bersama(): HasMany
    {
        return $this->hasMany(BiayaBersama::class, 'perjalanan_id');
    }
}