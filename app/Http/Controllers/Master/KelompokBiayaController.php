<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\KelompokBiaya;
use App\Http\Requests\Master\StoreKelompokBiayaRequest;
use App\Domains\Master\Action\CreateKelompokBiayaAction;
use App\Domains\Master\Action\UpdateKelompokBiayaAction;
use Inertia\Inertia;

class KelompokBiayaController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/KelompokBiaya/Index', [
            'listKelompok' => KelompokBiaya::orderBy('nama')->get()
        ]);
    }

    public function store(StoreKelompokBiayaRequest $request, CreateKelompokBiayaAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Kelompok Biaya berhasil ditambahkan!');
    }

    public function update(StoreKelompokBiayaRequest $request, UpdateKelompokBiayaAction $action, $id)
    {
        $action->execute($id, $request->validated());
        return redirect()->back()->with('success', 'Kelompok Biaya berhasil diperbarui!');
    }

    public function destroy(\App\Models\Master\KelompokBiaya $kelompokBiaya)
    {
        try {
            $kelompokBiaya->delete();
            return redirect()->back()->with('success', 'Data Kelompok Biaya berhasil dihapus!');
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->back()->with('error', 'Data tidak bisa dihapus karena sedang terkait dengan data komponen biaya.');
        }
    }
}