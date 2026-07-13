<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Pjlp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PjlpController extends Controller
{
    /**
     * Menampilkan daftar master data PJLP
     */
    public function index()
    {
        $listPjlp = Pjlp::orderBy('nama', 'asc')->get();

        return Inertia::render('Master/Pjlp/Index', [
            'listPjlp' => $listPjlp
        ]);
    }

    /**
     * Menyimpan data master PJLP baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'bagian' => 'required|string|max:100',
            'jabatan' => 'required|string|max:100',
            'no_hp' => 'nullable|string|max:20',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        Pjlp::create($validated);

        return redirect()->route('master.pjlp.index')
            ->with('success', 'Data PJLP berhasil ditambahkan!');
    }

    /**
     * Memperbarui data master PJLP
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'bagian' => 'required|string|max:100',
            'jabatan' => 'required|string|max:100',
            'no_hp' => 'nullable|string|max:20',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        $pjlp = Pjlp::findOrFail($id);
        $pjlp->update($validated);

        return redirect()->route('master.pjlp.index')
            ->with('success', 'Data PJLP berhasil diperbarui!');
    }

    /**
     * Menghapus data master PJLP
     */
    public function destroy($id)
    {
        $pjlp = Pjlp::findOrFail($id);
        $pjlp->delete();

        return redirect()->route('master.pjlp.index')
            ->with('success', 'Data PJLP berhasil dihapus!');
    }
}
