<?php

namespace App\Domains\Master\Action;

use App\Models\Master\Asn;

class CreateAsnAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master ASN baru
     */
    public function execute(array $data): Asn
    {
        return Asn::create($data);
    }
}