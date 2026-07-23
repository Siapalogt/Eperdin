<?php

namespace App\Domains\Master\Action;

use App\Models\Master\KomponenBiaya;
use Illuminate\Support\Str;

class CreateKomponenBiayaAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master ASN baru
     */
    public function execute(array $data): KomponenBiaya
    {
        $data['kode'] = $this->generateUniqueCode($data['nama']);
        $data['berlaku_untuk'] ??= 'Semua';

        return KomponenBiaya::create($data);
    }

    private function generateUniqueCode(string $nama): string
    {
        $baseCode = Str::limit(Str::upper(Str::slug($nama, '_')) ?: 'KOMPONEN', 45, '');
        $code = $baseCode;
        $suffix = 1;

        while (KomponenBiaya::where('kode', $code)->exists()) {
            $code = $baseCode.'_'.$suffix;
            $suffix++;
        }

        return $code;
    }
}
