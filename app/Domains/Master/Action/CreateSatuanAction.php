<?php

namespace App\Domains\Master\Action;

use App\Models\Master\Satuan;

class CreateSatuanAction
{
    /**
     * Mengeksekusi Use Case: Menambahkan data master Satuan baru
     */
    public function execute(array $data): Satuan
    {
        // Cukup masukkan nama saja sesuai dengan rancangan tabel terakhir
        return Satuan::create([
            'nama' => $data['nama'],
        ]);
    }
}