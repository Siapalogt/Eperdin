<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Transaksi\Perjalanan;
use App\Models\Transaksi\Peserta;

class AddPesertaPerjalananAction
{
    /**
     * Use Case: Menambahkan peserta ke dalam perjalanan dinas menggunakan konsep Polimorfik
     */
    public function execute(int $perjalananId, array $data): Peserta
    {
        $perjalanan = Perjalanan::findOrFail($perjalananId);

        // Mapping string dari form ke Class Model Eloquent
        $mapping = [
            'Dewan' => \App\Models\Master\AnggotaDewan::class,
            'Asn'   => \App\Models\Master\Asn::class,
            'Pjlp'  => \App\Models\Master\Pjlp::class,
        ];

        $peserta = new Peserta();
        $peserta->perjalanan_id = $perjalanan->id;
        $peserta->jenis_peserta = $mapping[$data['jenis_peserta']];
        $peserta->peserta_id = $data['peserta_id'];
        $peserta->uang_harian_kustom = $data['uang_harian_kustom'] ?? 0;
        $peserta->save();

        return $peserta;
    }
}