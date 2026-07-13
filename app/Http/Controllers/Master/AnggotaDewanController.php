<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\AnggotaDewan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaDewanController extends Controller
{
    /**
     * Menampilkan daftar master data Anggota Dewan
     */
    public function index()
    {
        $listDewan = AnggotaDewan::orderBy('nama', 'asc')->get();

        return Inertia::render('Master/AnggotaDewan/Index', [
            'listDewan' => $listDewan
        ]);
    }

    /**
     * Menyimpan data master Anggota Dewan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'jabatan' => 'required|string|max:100',
            'fraksi' => 'required|string|max:50',
            'komisi' => 'nullable|string|max:50',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        AnggotaDewan::create($validated);

        return redirect()->route('master.dewan.index')
            ->with('success', 'Data Anggota Dewan berhasil ditambahkan!');
    }

    /**
     * Memperbarui data master Anggota Dewan
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'jabatan' => 'required|string|max:100',
            'fraksi' => 'required|string|max:50',
            'komisi' => 'nullable|string|max:50',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        $dewan = AnggotaDewan::findOrFail($id);
        $dewan->update($validated);

        return redirect()->route('master.dewan.index')
            ->with('success', 'Data Anggota Dewan berhasil diperbarui!');
    }

    /**
     * Menghapus data master Anggota Dewan
     */
    public function destroy($id)
    {
        $dewan = AnggotaDewan::findOrFail($id);
        $dewan->delete();

        return redirect()->route('master.dewan.index')
            ->with('success', 'Data Anggota Dewan berhasil dihapus!');
    }
}
