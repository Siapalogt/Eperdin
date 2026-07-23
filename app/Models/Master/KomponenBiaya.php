<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KomponenBiaya extends Model
{
    protected $table = 'm_komponen_biaya';

    protected $fillable = ['kelompok_biaya_id', 'nama', 'kode', 'berlaku_untuk'];

    // Relasi balik ke Kelompok Biaya induknya
    public function kelompok_biaya(): BelongsTo
    {
        return $this->belongsTo(KelompokBiaya::class, 'kelompok_biaya_id');
    }

    // Hubungan ke struktur inputan dinamis field (Satu komponen punya banyak inputan)
    public function field_komponen(): HasMany
    {
        return $this->hasMany(FieldKomponen::class, 'komponen_biaya_id');
    }
}
