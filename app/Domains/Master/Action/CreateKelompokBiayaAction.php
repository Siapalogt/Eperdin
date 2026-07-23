<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KelompokBiaya;
use Illuminate\Support\Str;

class CreateKelompokBiayaAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master ASN baru
     */
    public function execute(array $data): KelompokBiaya
    {
        $data['kode'] = $this->generateUniqueCode($data['nama']);

        return KelompokBiaya::create($data);
    }

    private function generateUniqueCode(string $nama): string
    {
        $baseCode = Str::limit(Str::upper(Str::slug($nama, '_')) ?: 'KELOMPOK', 45, '');
        $code = $baseCode;
        $suffix = 1;

        while (KelompokBiaya::where('kode', $code)->exists()) {
            $code = $baseCode.'_'.$suffix;
            $suffix++;
        }

        return $code;
    }
}
