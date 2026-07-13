<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\AddPesertaRequest;
use App\Domains\Perjalanan\Action\AddPesertaPerjalananAction;

class PesertaController extends Controller
{
    /**
     * Menyimpan data anggota baru ke dalam perjalanan dinas
     */
    public function store(AddPesertaRequest $request, AddPesertaPerjalananAction $action, $perjalananId)
    {
        // 1. Ambil data tervalidasi
        $validated = $request->validated();

        // 2. Eksekusi logika lewat Action
        $action->execute($perjalananId, $validated);

        // 3. Kembalikan ke halaman detail semula
        return redirect()->route('perjalanan.show', $perjalananId)
            ->with('success', 'Peserta berhasil ditambahkan ke perjalanan dinas!');
    }
}