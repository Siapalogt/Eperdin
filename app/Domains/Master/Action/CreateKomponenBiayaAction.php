<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KomponenBiaya;

class CreateKomponenBiayaAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master ASN baru
     */
    public function execute(array $data): KomponenBiayaAction
    {
        return KomponenBiayaAction::create($data);
    }
}