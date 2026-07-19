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
        $qty = (int) ($data['qty'] ?? $data['jumlah'] ?? 1);
        $hargaSatuan = (float) ($data['harga_satuan'] ?? 0);
        $satuan = (string) ($data['satuan'] ?? 'unit');
        $totalKalkulasi = $qty * $hargaSatuan;

        // 3. Simpan data rincian anggaran ke tabel t_biaya_peserta
        $biaya = new BiayaPeserta();
        $biaya->peserta_id = $peserta->id;
        $biaya->komponen_biaya_id = $data['komponen_biaya_id'];
        $biaya->qty = $qty;
        $biaya->satuan = $satuan;
        $biaya->harga_satuan = $hargaSatuan;
        $biaya->total = $totalKalkulasi;
        $biaya->keterangan = $data['keterangan'] ?? null;
        $biaya->save();

        return $biaya;
    }
}