<?php

namespace App\Domains\Master\Action;

use App\Models\Master\Asn;

class UpdateAsnAction
{
    /**
     * Mengeksekusi Use Case: Memperbarui data master ASN yang sudah ada
     */
    public function execute(int $id, array $data): Asn
    {
        $asn = Asn::findOrFail($id);
        $asn->update($data);
        
        return $asn;
    }
}