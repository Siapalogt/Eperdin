<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Master\KomponenBiaya;

class BiayaPeserta extends Model
{
    protected $table = 't_biaya_peserta';

    // 1. Relasi balik ke Peserta (Biaya ini milik siapa)
    public function peserta(): BelongsTo
    {
        return $this->belongsTo(Peserta::class, 'peserta_id');
    }

    // 2. Relasi ke Master Komponen Biaya (Untuk tahu ini biaya Hotel, Tiket, dll)
    public function komponen_biaya(): BelongsTo
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}