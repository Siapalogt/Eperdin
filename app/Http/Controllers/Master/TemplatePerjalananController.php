<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\TemplatePerjalanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplatePerjalananController extends Controller
{
    /**
     * Menampilkan daftar master data Template Perjalanan
     */
    public function index()
    {
        $listTemplate = TemplatePerjalanan::orderBy('nama', 'asc')->get();

        return Inertia::render('Master/Template/Index', [
            'listTemplate' => $listTemplate
        ]);
    }

    /**
     * Menyimpan data master Template Perjalanan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'keterangan' => 'nullable|string',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        TemplatePerjalanan::create($validated);

        return redirect()->route('master.template.index')
            ->with('success', 'Template Perjalanan berhasil ditambahkan!');
    }

    /**
     * Memperbarui data master Template Perjalanan
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:150',
            'keterangan' => 'nullable|string',
            'status' => 'required|string|in:Aktif,Nonaktif'
        ]);

        $template = TemplatePerjalanan::findOrFail($id);
        $template->update($validated);

        return redirect()->route('master.template.index')
            ->with('success', 'Template Perjalanan berhasil diperbarui!');
    }

    // Tambahkan ini di bawah method store() atau update()
    public function show($id)
    {
        $template = \App\Models\Master\TemplatePerjalanan::with([
            'details.kelompok_biaya', 
            'details.komponen_biaya'
        ])->findOrFail($id);

        return \Inertia\Inertia::render('Master/Template/Show', [
            'template' => $template,
            'listKelompok' => \App\Models\Master\KelompokBiaya::orderBy('nama')->get(),
            'listKomponen' => \App\Models\Master\KomponenBiaya::orderBy('nama')->get(),
        ]);
    }

    /**
     * Menghapus data master Template Perjalanan
     */
    public function destroy($id)
    {
        $template = TemplatePerjalanan::findOrFail($id);
        $template->delete();

        return redirect()->route('master.template.index')
            ->with('success', 'Template Perjalanan berhasil dihapus!');
    }

    
}
