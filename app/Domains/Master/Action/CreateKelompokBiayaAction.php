<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KelompokBiaya;

class CreateKelompokBiayaAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master ASN baru
     */
    public function execute(array $data): KelompokBiaya
    {
        return KelompokBiaya::create($data);
    }
}