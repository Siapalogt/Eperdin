<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Transaksi\Peserta;

class Asn extends Model
{
    protected $table = 'm_asn';

    // Relasi balik polimorfik untuk melihat riwayat perjalanan ASN ini
    public function perjalanan_dinas(): MorphMany
    {
        return $this->morphMany(Peserta::class, 'peserta', 'jenis_peserta', 'peserta_id');
    }
}