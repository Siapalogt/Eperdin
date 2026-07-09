<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KelompokBiaya extends Model
{
    protected $table = 'm_kelompok_biaya';

    // Satu kelompok biaya (misal: Transportasi) punya banyak komponen (Pesawat, Kereta, Tol)
    public function komponen_biaya(): HasMany
    {
        return $this->hasMany(KomponenBiaya::class, 'kelompok_biaya_id');
    }
}