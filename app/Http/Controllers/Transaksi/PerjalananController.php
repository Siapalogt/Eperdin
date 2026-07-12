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
    public function store(Request $request)
    {
        // 1. Validasi Input Form
        $validated = $request->validate([
            'nomor' => 'required|unique:t_perjalanan,nomor',
            'template_perjalanan_id' => 'required|exists:m_template_perjalanan,id',
            'nama_kegiatan' => 'required|string|max:255',
            'tujuan' => 'required|string|max:150',
            'lokasi' => 'nullable|string|max:255',
            'tanggal_berangkat' => 'required|date',
            'tanggal_pulang' => 'required|date|after_or_equal:tanggal_berangkat',
            'lama_hari' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        // 2. Set otomatis status menjadi Draft dan catat pembuatnya
        $validated['status'] = 'Draft';
        $validated['created_by'] = Auth::id(); // Mengambil ID admin yang sedang login

        // 3. Simpan ke tabel t_perjalanan
        Perjalanan::create($validated);

        // 4. Redirect kembali ke halaman index dengan pesan sukses
        return redirect()->route('perjalanan.index')->with('success', 'Data perjalanan dinas berhasil dibuat sebagai Draft!');
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
}