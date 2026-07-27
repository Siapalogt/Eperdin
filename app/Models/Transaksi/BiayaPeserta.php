<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Master\KomponenBiaya;

class BiayaPeserta extends Model
{
    protected $table = 't_biaya_peserta';
    protected $guarded = [];

    // Tambahkan baris ini
    protected $casts = [
        'detail_json' => 'array',
    ];

    public function peserta(): BelongsTo
    {
        return $this->belongsTo(Peserta::class, 'peserta_id');
    }

    public function komponen_biaya(): BelongsTo
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}