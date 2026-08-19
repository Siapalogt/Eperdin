<?php

namespace App\Http\Controllers\Transaksi;

use App\Domains\Perjalanan\Action\CreatePerjalananDraftAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\StorePerjalananRequest;
use App\Models\Master\AnggotaDewan;
use App\Models\Master\Asn;
use App\Models\Master\Kategori;
use App\Models\Master\KelompokBiaya; 
use App\Models\Master\KomponenBiaya;
use App\Models\Master\Pjlp;
use App\Models\Master\TemplatePerjalanan;
use App\Models\Master\TenagaAhli;
use App\Models\Transaksi\Perjalanan;
use App\Models\Master\Satuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerjalananController extends Controller
{
    public function index()
    {
        $perjalanan = Perjalanan::with(['peserta.detail_peserta'])
            ->withCount('peserta') 
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Transaksi/Perjalanan/Index/Index', [
            'listPerjalanan' => $perjalanan,
        ]);
    }

    public function create()
    {
        $templates = TemplatePerjalanan::where('status', 'Aktif')->get();
        $kategoris = Kategori::all();
        $bulanAngka = date('n');
        $tahun = date('Y');
        $romawi = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        $bulanRomawi = $romawi[$bulanAngka];
        $jumlahSuratBulanIni = Perjalanan::whereYear('created_at', $tahun)
                                         ->whereMonth('created_at', $bulanAngka)
                                         ->count();
        $urutanSelanjutnya = str_pad($jumlahSuratBulanIni + 1, 3, '0', STR_PAD_LEFT);
        $autoNomor = "{$urutanSelanjutnya}/{$bulanRomawi}/{$tahun}";


        return Inertia::render('Transaksi/Perjalanan/Create/Index', [
            'templates' => $templates,
            'kategoris' => $kategoris,
            'defaultNomor' => $autoNomor,
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
        $perjalanan->load([
            'peserta.detail_peserta',
            'peserta.biaya.komponen_biaya',
            'biaya_bersama.komponen_biaya',
        ]);

        $kelompokBiaya = KelompokBiaya::where('status', 'aktif')->orderBy('nama', 'asc')->get();

        $listKomponen = KomponenBiaya::with(['kelompok_biaya', 'field_komponen' => function($q) {
            $q->where('status', 'aktif')->orderBy('urutan', 'asc');
        }])->where('status', 'aktif')->get();
        $listSatuan = Satuan::orderBy('nama', 'asc')->get();

        return Inertia::render('Transaksi/Perjalanan/Detail/Index', [
            'perjalanan' => $perjalanan,
            'masterAsn' => Asn::where('status', 'Aktif')->get(),
            'masterDewan' => AnggotaDewan::where('status', 'Aktif')->get(),
            'masterPjlp' => Pjlp::where('status', 'Aktif')->get(),
            'masterTa' => TenagaAhli::where('status', 'Aktif')->get(),
            'listKomponen' => $listKomponen,
            'kelompokBiaya' => $kelompokBiaya,
            'listSatuan' => $listSatuan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nomor' => 'required|string|max:100|unique:t_perjalanan,nomor,'.$id,
            'nama_kegiatan' => 'required|string|max:255',
            'kategori_id' => 'required|exists:m_kategori,id',
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

        return Inertia::render('Transaksi/Perjalanan/Edit/Index', [
            'perjalanan' => $perjalanan,
            'kategoris'  => Kategori::all(),
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