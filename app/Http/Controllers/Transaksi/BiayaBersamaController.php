<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\StoreBiayaBersamaRequest;
use App\Domains\Perjalanan\Action\SaveBiayaBersamaAction;
use App\Models\Transaksi\BiayaBersama;

class BiayaBersamaController extends Controller
{
    /**
     * Menyimpan alokasi anggaran biaya bersama / rombongan
     */
    public function store(StoreBiayaBersamaRequest $request, SaveBiayaBersamaAction $action, $perjalananId)
    {
        // 1. Ambil data hasil validasi request
        $validated = $request->validated();

        // 2. Delegasikan penyimpanan data ke Action Class
        $action->execute($perjalananId, $validated);

        // 3. Redirect kembali ke detail perjalanan
        return redirect()->route('perjalanan.show', $perjalananId)
            ->with('success', 'Rincian biaya bersama berhasil ditambahkan!');
    }

    /**
     * Menghapus alokasi anggaran biaya bersama
     */
    public function destroy($id)
    {
        // 1. Cari data rincian biaya bersama berdasarkan ID
        $biaya = BiayaBersama::findOrFail($id);

        // 2. Eksekusi hapus data
        $biaya->delete();

        // 3. Kembalikan ke halaman sebelumnya
        return redirect()->back()
            ->with('success', 'Rincian biaya bersama berhasil dihapus!');
    }
}