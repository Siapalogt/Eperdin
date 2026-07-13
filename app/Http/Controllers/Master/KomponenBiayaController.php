<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\KomponenBiaya;
use App\Models\Master\KelompokBiaya;
use App\Http\Requests\Master\StoreKomponenBiayaRequest;
use App\Domains\Master\Action\CreateKomponenBiayaAction;
use App\Domains\Master\Action\UpdateKomponenBiayaAction;
use Inertia\Inertia;

class KomponenBiayaController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/KomponenBiaya/Index', [
            // Bawa relasi kelompok untuk tabel
            'listKomponen' => KomponenBiaya::with('kelompok_biaya')->orderBy('nama')->get(),
            // Bawa daftar kelompok untuk dropdown form
            'listKelompok' => KelompokBiaya::orderBy('nama')->get() 
        ]);
    }

    public function store(StoreKomponenBiayaRequest $request, CreateKomponenBiayaAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Komponen Biaya berhasil ditambahkan!');
    }

    public function update(StoreKomponenBiayaRequest $request, UpdateKomponenBiayaAction $action, $id)
    {
        $action->execute($id, $request->validated());
        return redirect()->back()->with('success', 'Komponen Biaya berhasil diperbarui!');
    }
}