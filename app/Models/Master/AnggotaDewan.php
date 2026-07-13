<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AnggotaDewan extends Model
{
    protected $table = 'm_anggota_dewan';

    protected $guarded = [];

    // Satu Anggota Dewan bisa dibantu oleh beberapa Tenaga Ahli
    public function tenaga_ahli(): HasMany
    {
        return $this->hasMany(TenagaAhli::class, 'anggota_dewan_id');
    }
}