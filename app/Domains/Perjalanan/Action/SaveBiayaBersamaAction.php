<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Transaksi\BiayaBersama;

class SaveBiayaBersamaAction
{
    /**
     * Mengeksekusi Use Case: Menyimpan alokasi anggaran biaya bersama
     */
    public function execute(int|string $perjalananId, array $data): BiayaBersama
    {
        return BiayaBersama::create([
            'perjalanan_id'     => $perjalananId,
            'komponen_biaya_id' => $data['komponen_biaya_id'],
            'qty'               => $data['qty'],
            'satuan'            => $data['satuan'],
            'harga_satuan'      => $data['harga_satuan'],
            'total'             => $data['total'],
            'keterangan'        => $data['keterangan'] ?? null,
            'detail_json'       => $data['detail_json'] ?? [],
        ]);
    }
}