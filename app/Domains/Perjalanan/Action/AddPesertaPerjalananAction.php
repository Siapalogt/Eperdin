<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Master\AnggotaDewan;
use App\Models\Master\Asn;
use App\Models\Master\Pjlp;
use App\Models\Master\TenagaAhli;
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
            'Dewan' => AnggotaDewan::class,
            'Asn' => Asn::class,
            'Pjlp' => Pjlp::class,
            'Ta' => TenagaAhli::class,
        ];

        $peserta = new Peserta;
        $peserta->perjalanan_id = $perjalanan->id;
        $peserta->jenis_peserta = $mapping[$data['jenis_peserta']];
        $peserta->peserta_id = $data['peserta_id'];
        $peserta->save();

        return $peserta;
    }
}
