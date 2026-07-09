<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Master\KomponenBiaya;

class BiayaBersama extends Model
{
    protected $table = 't_biaya_bersama';

    // 1. Relasi balik ke Perjalanan induknya
    public function perjalanan(): BelongsTo
    {
        return $this->belongsTo(Perjalanan::class, 'perjalanan_id');
    }

    // 2. Relasi ke Master Komponen Biaya
    public function komponen_biaya(): BelongsTo
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}