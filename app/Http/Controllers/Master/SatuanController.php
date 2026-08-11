<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Satuan;
use App\Http\Requests\Master\StoreSatuanRequest;
use App\Domains\Master\Action\CreateSatuanAction;
use App\Domains\Master\Action\UpdateSatuanAction;
use Inertia\Inertia;

class SatuanController extends Controller
{
    public function index()
    {
        $listSatuan = Satuan::orderBy('nama', 'asc')->get();

        return Inertia::render('Master/Satuan/Index', [
            'listSatuan' => $listSatuan,
        ]);
    }

    public function store(StoreSatuanRequest $request, CreateSatuanAction $action)
    {
        $action->execute($request->validated());

        return redirect()->back()->with('success', 'Satuan berhasil ditambahkan.');
    }

    public function update(StoreSatuanRequest $request, Satuan $satuan, UpdateSatuanAction $action)
    {
        // Menggunakan request yang sama jika aturannya hanya 'nama' (wajib diisi & unique)
        $action->execute($satuan, $request->validated());

        return redirect()->back()->with('success', 'Satuan berhasil diperbarui.');
    }

    public function destroy(Satuan $satuan)
    {
        $satuan->delete();

        return redirect()->back()->with('success', 'Satuan berhasil dihapus.');
    }
}