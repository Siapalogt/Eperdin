<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Perjalanan extends Model
{
    protected $table = 't_perjalanan';

    protected $fillable = [
        'nomor',
        'template_perjalanan_id',
        'kategori_id', 
        'nama_kegiatan',
        'tujuan',
        'lokasi',
        'tanggal_berangkat',
        'tanggal_pulang',
        'lama_hari',
        'keterangan',
        'status',     
        'created_by',  
    ];

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