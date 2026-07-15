<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Transaksi\Perjalanan;
use App\Models\Master\TemplatePerjalanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Transaksi\StorePerjalananRequest;
use App\Domains\Perjalanan\Action\CreatePerjalananDraftAction;

class PerjalananController extends Controller
{
    public function index()
    {
        // 💡 KITA KEMBALIKAN relasi detail_peserta karena MorphTo sudah dikonfigurasi dengan benar di Model Peserta
        $perjalanan = Perjalanan::with(['peserta.detail_peserta'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Transaksi/Perjalanan/Index', [
            'listPerjalanan' => $perjalanan
        ]);
    }

    public function create()
    {
        $templates = TemplatePerjalanan::where('status', 'Aktif')->get();
        return Inertia::render('Transaksi/Perjalanan/Create', [
            'templates' => $templates
        ]);
    }

    public function store(StorePerjalananRequest $request, CreatePerjalananDraftAction$action)
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
            'peserta.biaya.komponen_biaya' 
        ]);

        return Inertia::render('Transaksi/Perjalanan/Show', [
            'perjalanan'   => $perjalanan,
            'masterAsn'    => \App\Models\Master\Asn::where('status', 'Aktif')->get(),
            'masterDewan'  => \App\Models\Master\AnggotaDewan::where('status', 'Aktif')->get(),
            'masterPjlp'   => \App\Models\Master\Pjlp::where('status', 'Aktif')->get(),
            'masterTa'     => \App\Models\Master\TenagaAhli::where('status', 'Aktif')->get(),
            'listKomponen' => \App\Models\Master\KomponenBiaya::with('kelompok_biaya')->orderBy('nama')->get(),
        ]);
    }

    public function update(Request $request,$id)
    {
        $validated =$request->validate([
            'nomor' => 'required|string|max:100|unique:t_perjalanan,nomor,' . $id,
            'nama_kegiatan' => 'required|string|max:255',
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

    public function destroy($id)
    {
        $perjalanan = Perjalanan::findOrFail($id);$perjalanan->delete();

        return redirect()->route('perjalanan.index')
            ->with('success', 'Perjalanan dinas berhasil dihapus!');
    }

    public function updateStatus(Request $request,$id)
    {
        $validated =$request->validate([
            'status' => 'required|string|in:Draft,Diproses,Selesai,Ditolak',
        ]);

        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->update(['status' =>$validated['status']]);

        return redirect()->route('perjalanan.show', $id)
            ->with('success', 'Status perjalanan dinas diubah menjadi ' . $validated['status']);
    }
}