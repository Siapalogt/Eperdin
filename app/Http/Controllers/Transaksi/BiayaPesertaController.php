<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\StoreBiayaPesertaRequest;
use App\Domains\Perjalanan\Action\SaveBiayaPesertaAction;
use App\Models\Transaksi\Peserta;
use App\Models\Transaksi\BiayaPeserta;

class BiayaPesertaController extends Controller
{
    /**
     * Menyimpan alokasi anggaran komponen biaya komponen peserta
     */
    public function store(StoreBiayaPesertaRequest $request, SaveBiayaPesertaAction $action, $pesertaId)
    {
        // 1. Ambil data hasil validasi request
        $validated = $request->validated();

        // 2. Delegasikan penyimpanan data ke Action Class
        $biaya = $action->execute($pesertaId, $validated);

        // 3. Ambil ID perjalanan dinas untuk mengarahkan halaman kembali dengan tepat
        $peserta = Peserta::findOrFail($pesertaId);

        return redirect()->route('perjalanan.show', $peserta->perjalanan_id)
            ->with('success', 'Rincian anggaran biaya berhasil ditambahkan!');
    }

    /**
     * Menghapus alokasi anggaran komponen biaya peserta
     */
    public function destroy($id)
    {
        // 1. Cari data rincian biaya berdasarkan ID
        $biaya = BiayaPeserta::findOrFail($id);
        
        // 2. Eksekusi hapus data
        $biaya->delete();

        // 3. Kembalikan ke halaman sebelumnya (redirect back)
        // Inertia akan secara otomatis mempertahankan posisi scroll (preserveScroll)
        return redirect()->back()
            ->with('success', 'Rincian anggaran biaya berhasil dihapus!');
    }
}