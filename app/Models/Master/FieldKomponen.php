<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FieldKomponen extends Model
{
    protected $table = 'm_field_komponen';

    // Relasi balik ke Komponen Biaya induknya
    public function komponen_biaya(): BelongsTo
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}