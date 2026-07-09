<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenagaAhli extends Model
{
    protected $table = 'm_tenaga_ahli';

    // Mengetahui Tenaga Ahli ini mendampingi Anggota Dewan yang mana
    public function anggota_dewan(): BelongsTo
    {
        return $this->belongsTo(AnggotaDewan::class, 'anggota_dewan_id');
    }
}