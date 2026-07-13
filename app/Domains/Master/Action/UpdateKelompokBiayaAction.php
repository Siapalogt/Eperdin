<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KelompokBiaya;

class UpdateKelompokBiayaAction
{
    public function execute(int $id, array $data): KelompokBiaya
    {
        // Untuk update, cari data dulu berdasarkan ID
        $kelompok = KelompokBiaya::findOrFail($id);
        $kelompok->update($data);
        
        return $kelompok;
    }
}