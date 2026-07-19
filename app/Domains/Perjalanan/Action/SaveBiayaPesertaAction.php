<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Transaksi\Peserta;
use App\Models\Transaksi\BiayaPeserta;

class SaveBiayaPesertaAction
{
    /**
     * Mengeksekusi Use Case: Menyimpan rincian biaya untuk peserta tertentu
     */
    public function execute(int $pesertaId, array $data): BiayaPeserta
    {
        // 1. Pastikan entitas peserta dinasnya valid
        $peserta = Peserta::findOrFail($pesertaId);

        // 2. Paksa kalkulasi total di back-end untuk menghindari manipulasi request dari luar
        $totalKalkulasi = $data['jumlah'] * $data['harga_satuan'];

        // 3. Simpan data rincian anggaran ke tabel t_biaya_peserta
        $biaya = new BiayaPeserta();
        $biaya->peserta_id = $peserta->id;
        $biaya->komponen_biaya_id = $data['komponen_biaya_id'];
        $biaya->qty = $data['qty'];
        $biaya->satuan = $data['satuan'];
        $biaya->harga_satuan = $data['harga_satuan'];
        $biaya->total = $totalKalkulasi;
        $biaya->keterangan = $data['keterangan'] ?? null;
        $biaya->save();

        return $biaya;
    }
}