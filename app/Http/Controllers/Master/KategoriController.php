<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::latest()->get();
        
        return Inertia::render('Master/Kategori/Index', [
            'kategoris' => $kategoris
        ]);
    }

    public function store(Request $request)
    {   

        $request->validate([
            'kode' => 'required|string|max:50|unique:m_kategori,kode',
            'nama' => 'required|string|max:150',
        ]);

        Kategori::create([
            'kode' => $request->kode,
            'nama' => $request->nama,
        ]);

        return redirect()->route('master.kategori.index');
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'kode' => 'required|unique:m_kategori,kode,' . $id,
            'nama' => 'required|string|max:255',
        ]);

        $kategori = Kategori::findOrFail($id);
        $kategori->update([
            'kode' => $request->kode,
            'nama' => $request->nama,
        ]);

        // WAJIB REDIRECT
        return redirect()->route('master.kategori.index');
    }

    public function destroy($id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();

        return redirect()->route('master.kategori.index');
    }
}