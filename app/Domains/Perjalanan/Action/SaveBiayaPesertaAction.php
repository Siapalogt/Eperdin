<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Transaksi\Peserta;
use App\Models\Transaksi\BiayaPeserta;
use Illuminate\Support\Facades\DB; // Tambahkan ini untuk transaction

class SaveBiayaPesertaAction
{
    /**
     * Mengeksekusi Use Case: Menyimpan rincian biaya untuk peserta tertentu
     */
    public function execute(int $pesertaId, array $data): BiayaPeserta
    {
        // Bungkus dengan DB::transaction untuk keamanan data
        return DB::transaction(function () use ($pesertaId, $data) {
            
            // 1. Pastikan entitas peserta dinasnya valid
            $peserta = Peserta::findOrFail($pesertaId);

            // 2. Paksa kalkulasi total di back-end
            $qty = (int) ($data['qty'] ?? 1);
            $hargaSatuan = (float) ($data['harga_satuan'] ?? 0);
            $satuan = (string) ($data['satuan'] ?? 'Unit');
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
    
            $biaya->detail_json = $data['detail_json'] ?? null; 

            $biaya->save();

            return $biaya;
        });
    }
}