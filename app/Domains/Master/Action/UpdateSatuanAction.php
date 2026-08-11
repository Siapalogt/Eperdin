<?php

namespace App\Domains\Master\Action;

use App\Models\Master\Satuan;

class UpdateSatuanAction
{
    public function execute(Satuan $satuan, array $data): Satuan
    {
        $satuan->update([
            'nama' => $data['nama'],
        ]);

        return $satuan;
    }
}