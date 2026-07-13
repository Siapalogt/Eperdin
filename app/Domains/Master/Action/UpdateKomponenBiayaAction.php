<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KomponenBiaya;

class UpdateKomponenBiayaAction
{
    /**
     * Mengeksekusi Use Case: Memperbarui data master ASN yang sudah ada
     */
    public function execute(int $id, array $data): KomponenBiaya
    {
        $asn = KomponenBiaya::findOrFail($id);
        $asn->update($data);
        
        return $asn;
    }
}