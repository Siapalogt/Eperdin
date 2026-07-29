<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\FieldKomponen;
use App\Models\Master\KomponenBiaya;
use App\Models\Master\KelompokBiaya;    
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldKomponenController extends Controller
{
    public function index()
    {
        $fieldKomponen = FieldKomponen::with('komponen_biaya')
            ->orderBy('komponen_biaya_id')
            ->orderBy('urutan')
            ->get();
            
        $komponenBiaya = KomponenBiaya::where('status', 'aktif')->get();
        $kelompokBiaya = KelompokBiaya::where('status', 'aktif')->get();

        return Inertia::render('Master/FieldKomponen/Index', [
            'fieldKomponen' => $fieldKomponen,
            'komponenBiaya' => $komponenBiaya,
            'kelompokBiaya' => $kelompokBiaya, // 👈 Disinkronkan menjadi 'kelompokBiaya'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'komponen_biaya_id' => 'required|exists:m_komponen_biaya,id',
            'label' => 'required|string|max:255',
            'field_name' => 'required|string|max:255',
            'input_type' => 'required|string',
            'pilihan' => 'nullable|string', 
            'required' => 'required|boolean',
            'urutan' => 'required|integer',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        FieldKomponen::create($validated);

        return redirect()->route('master.field-komponen.index')->with('success', 'Rincian Biaya berhasil ditambahkan.');
    }

    public function update(Request $request, FieldKomponen $field_komponen)
    {
        $validated = $request->validate([
            'komponen_biaya_id' => 'required|exists:m_komponen_biaya,id',
            'label' => 'required|string|max:255',
            'field_name' => 'required|string|max:255',
            'input_type' => 'required|string',
            'pilihan' => 'nullable|string',
            'required' => 'required|boolean',
            'urutan' => 'required|integer',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $field_komponen->update($validated);

        return redirect()->route('master.field-komponen.index')->with('success', 'Rincian Biaya berhasil diperbarui.');
    }

    public function destroy(FieldKomponen $field_komponen)
    {
        $field_komponen->delete();

        return redirect()->route('master.field-komponen.index')->with('success', 'Rincian Biaya berhasil dihapus.');
    }
}