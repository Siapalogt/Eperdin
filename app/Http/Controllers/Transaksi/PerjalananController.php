<?php

namespace App\Http\Controllers\Transaksi;

use App\Domains\Perjalanan\Action\CreatePerjalananDraftAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\StorePerjalananRequest;
use App\Models\Master\AnggotaDewan;
use App\Models\Master\Asn;
use App\Models\Master\KomponenBiaya;
use App\Models\Master\Pjlp;
use App\Models\Master\TemplatePerjalanan;
use App\Models\Master\TenagaAhli;
use App\Models\Transaksi\Perjalanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerjalananController extends Controller
{
    public function index()
    {
        $perjalanan = Perjalanan::with(['peserta.detail_peserta'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Transaksi/Perjalanan/Index', [
            'listPerjalanan' => $perjalanan,
        ]);
    }

    public function create()
    {
        $templates = TemplatePerjalanan::where('status', 'Aktif')->get();

        return Inertia::render('Transaksi/Perjalanan/Create', [
            'templates' => $templates,
        ]);
    }

    public function store(StorePerjalananRequest $request, CreatePerjalananDraftAction $action)
    {
        $action->execute($request->validated());

        return redirect()->route('perjalanan.index')
            ->with('success', 'Data perjalanan dinas berhasil dibuat sebagai Draft!');
    }

    public function show(Perjalanan $perjalanan)
    {
        // 💡 PERBAIKAN FATAL: Memanggil relasi 'biaya' sesuai dengan yang ada di Model Peserta.php
        $perjalanan->load([
            'peserta.detail_peserta',
            'peserta.biaya.komponen_biaya',
        ]);

        return Inertia::render('Transaksi/Perjalanan/Show', [
            'perjalanan' => $perjalanan,
            'masterAsn' => Asn::where('status', 'Aktif')->get(),
            'masterDewan' => AnggotaDewan::where('status', 'Aktif')->get(),
            'masterPjlp' => Pjlp::where('status', 'Aktif')->get(),
            'masterTa' => TenagaAhli::where('status', 'Aktif')->get(),
            'listKomponen' => KomponenBiaya::with('kelompok_biaya')->orderBy('nama')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nomor' => 'required|string|max:100|unique:t_perjalanan,nomor,'.$id,
            'nama_kegiatan' => 'required|string|max:255',
            'kategori_perjalanan' => 'required|string|in:Bimtek,Kunjungan Kerja,Konsultasi,Rapat',
            'tujuan' => 'required|string|max:150',
            'lokasi' => 'nullable|string|max:255',
            'tanggal_berangkat' => 'required|date',
            'tanggal_pulang' => 'required|date',
            'lama_hari' => 'required|integer',
            'keterangan' => 'nullable|string',
        ]);

        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->update($validated);

        return redirect()->route('perjalanan.show', $id)
            ->with('success', 'Data perjalanan dinas berhasil diperbarui!');
    }

    public function edit($id)
    {
        $perjalanan = Perjalanan::findOrFail($id);

        return Inertia::render('Transaksi/Perjalanan/Edit', [
            'perjalanan' => $perjalanan,
        ]);
    }

    public function destroy($id)
    {
        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->delete();

        return redirect()->route('perjalanan.index')
            ->with('success', 'Perjalanan dinas berhasil dihapus!');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Draft,Diproses,Selesai,Ditolak',
        ]);

        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->update(['status' => $validated['status']]);

        return redirect()->route('perjalanan.show', $id)
            ->with('success', 'Status perjalanan dinas diubah menjadi '.$validated['status']);
    }
}
