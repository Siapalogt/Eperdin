<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Transaksi\Peserta;

class Pjlp extends Model
{
    protected $table = 'm_pjlp';

    // Relasi balik polimorfik untuk melihat riwayat perjalanan PJLP ini
    public function perjalanan_dinas(): MorphMany
    {
        return $this->morphMany(Peserta::class, 'peserta', 'jenis_peserta', 'peserta_id');
    }
}