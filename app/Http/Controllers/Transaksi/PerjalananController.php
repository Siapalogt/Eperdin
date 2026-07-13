<?php

namespace App\Http\Controllers\Transaksi;

use App\Models\Master\Asn;
use App\Models\Master\AnggotaDewan;
use App\Models\Master\Pjlp;
use App\Http\Controllers\Controller;
use App\Models\Transaksi\Perjalanan;
use App\Models\Master\TemplatePerjalanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Transaksi\StorePerjalananRequest;
use App\Domains\Perjalanan\Action\CreatePerjalananDraftAction;

class PerjalananController extends Controller
{
    /**
     * Menampilkan halaman daftar perjalanan dinas
     */
    public function index()
    {
        // Mengambil data perjalanan terbaru beserta relasi pesertanya
        $perjalanan = Perjalanan::with(['peserta.detail_peserta'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Transaksi/Perjalanan/Index', [
            'listPerjalanan' => $perjalanan
        ]);
    }

    /**
     * Menampilkan form tambah perjalanan baru
     */
    public function create()
    {
        // Mengambil template perjalanan aktif untuk pilihan dropdown di form
        $templates = TemplatePerjalanan::where('status', 'Aktif')->get();

        return Inertia::render('Transaksi/Perjalanan/Create', [
            'templates' => $templates
        ]);
    }

    /**
     * Menyimpan data perjalanan dinas baru (Status awal: Draft)
     */
    public function store(StorePerjalananRequest $request, CreatePerjalananDraftAction $action)
    {
        // 1. Ambil data yang sudah lolos validasi dari Form Request
        $validatedData = $request->validated();

        // 2. Delegasikan tugas eksekusi logika bisnis ke lapisan Action
        $action->execute($validatedData);

        // 3. Kembalikan respon HTTP / Inertia redirect
        return redirect()->route('perjalanan.index')
            ->with('success', 'Data perjalanan dinas berhasil dibuat sebagai Draft!');
    }

    public function show($id)
{
    // 1. Ambil data perjalanan ini beserta peserta yang sudah terdaftar didalamnya
    $perjalanan = Perjalanan::with(['peserta.detail_peserta'])->findOrFail($id);

    // 2. Ambil semua data master personel untuk pilihan dropdown tambah peserta nanti
    $masterAsn = Asn::where('status', 'Aktif')->get();
    $masterDewan = AnggotaDewan::where('status', 'Aktif')->get();
    $masterPjlp = Pjlp::where('status', 'Aktif')->get();

    return Inertia::render('Transaksi/Perjalanan/Show', [
        'perjalanan' => $perjalanan,
        'masterAsn' => $masterAsn,
        'masterDewan' => $masterDewan,
        'masterPjlp' => $masterPjlp
    ]);
}

    /**
     * Memperbarui data perjalanan dinas
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
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

    /**
     * Menghapus data perjalanan dinas
     */
    public function destroy($id)
    {
        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->delete();

        return redirect()->route('perjalanan.index')
            ->with('success', 'Perjalanan dinas berhasil dihapus!');
    }

    /**
     * Memperbarui status perjalanan dinas (Draft -> Diproses -> Selesai)
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Draft,Diproses,Selesai,Ditolak',
        ]);

        $perjalanan = Perjalanan::findOrFail($id);
        $perjalanan->update(['status' => $validated['status']]);

        return redirect()->route('perjalanan.show', $id)
            ->with('success', 'Status perjalanan dinas berhasil diubah menjadi ' . $validated['status'] . '!');
    }
}