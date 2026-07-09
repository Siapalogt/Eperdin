<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Lampiran extends Model
{
    protected $table = 't_lampiran';
    
    // Matikan timestamps karena di migrasi hanya memakai created_at kustom
    public $timestamps = false;

    // Relasi Polimorfik: Lampiran ini bisa menempel di t_perjalanan atau t_peserta (nota/tiket)
    public function owner(): MorphTo
    {
        return $this->morphsTo(__FUNCTION__, 'owner_type', 'owner_id');
    }
}