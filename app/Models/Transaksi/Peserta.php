<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo; 
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Peserta extends Model
{
    // Mengunci nama tabel kustom
    protected $table = 't_peserta'; 

    // 1. Relasi Polimorfik ke m_asn, m_anggota_dewan, m_tenaga_ahli, m_pjlp
    // Fungsi ini akan otomatis membaca kolom 'jenis_peserta' dan 'peserta_id'
    public function detail_peserta(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'jenis_peserta', 'peserta_id');
    }

    // 2. Relasi balik ke tabel perjalanan (Setiap peserta memiliki satu induk perjalanan)
    public function perjalanan(): BelongsTo
    {
        return $this->belongsTo(Perjalanan::class, 'perjalanan_id');
    }

    // 3. Relasi ke tabel biaya_peserta (Satu peserta bisa punya banyak komponen biaya)
    public function biaya(): HasMany
    {
        return $this->hasMany(BiayaPeserta::class, 'peserta_id');
    }
}