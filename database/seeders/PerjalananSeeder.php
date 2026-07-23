<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Transaksi\Perjalanan;
use App\Models\Transaksi\Peserta;
use App\Models\Transaksi\BiayaPeserta;
use App\Models\Transaksi\BiayaBersama;
use App\Models\Transaksi\Lampiran;
use App\Models\Transaksi\Log;
use App\Models\Master\Asn;
use App\Models\Master\AnggotaDewan;
use App\Models\Master\TemplatePerjalanan;

class PerjalananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan tabel transaksi terkait terlebih dahulu
        Schema::disableForeignKeyConstraints();
        
        BiayaPeserta::truncate();
        BiayaBersama::truncate();
        Lampiran::truncate();
        Log::truncate();
        Peserta::truncate();
        Perjalanan::truncate();
        
        Schema::enableForeignKeyConstraints();

        // 💡 Cek template perjalanan, jika belum ada buat secara otomatis agar tidak error null
        $template = TemplatePerjalanan::where('status', 'Aktif')->first() ?? TemplatePerjalanan::first();
        
        if (!$template) {
            $template = TemplatePerjalanan::create([
                'nama' => 'Template Standar Perjalanan Dinas',
                'status' => 'Aktif',
            ]);
        }
        
        $templateId = $template->id;

        // 1. Buat data dummy Perjalanan 1 (Status: Draft)
        $perjalanan1 = Perjalanan::create([
            'template_perjalanan_id' => $templateId,
            'nomor' => '001/SPT-DPRD/DKI/2026',
            'nama_kegiatan' => 'Studi Banding Pengelolaan Anggaran dan Pendapatan Daerah',
            'kategori_perjalanan' => 'Kunjungan Kerja',
            'tujuan' => 'Bandung',
            'lokasi' => 'Kantor DPRD Provinsi Jawa Barat',
            'tanggal_berangkat' => '2026-08-01',
            'tanggal_pulang' => '2026-08-03',
            'lama_hari' => 3,
            'status' => 'Draft',
            'keterangan' => 'Kunjungan kerja spesifik komisi bidang keuangan dan anggaran.',
        ]);

        // 2. Buat data dummy Perjalanan 2 (Status: Diproses)
        $perjalanan2 = Perjalanan::create([
            'template_perjalanan_id' => $templateId,
            'nomor' => '002/SPT-DPRD/DKI/2026',
            'nama_kegiatan' => 'Bimbingan Teknis Penyusunan Peraturan Daerah',
            'kategori_perjalanan' => 'Bimtek',
            'tujuan' => 'Yogyakarta',
            'lokasi' => 'Hotel Melia Purosani Yogyakarta',
            'tanggal_berangkat' => '2026-08-10',
            'tanggal_pulang' => '2026-08-12',
            'lama_hari' => 3,
            'status' => 'Diproses',
            'keterangan' => 'Peningkatan kapasitas teknis perundang-undangan.',
        ]);

        // 3. Buat data dummy Perjalanan 3 (Status: Selesai)
        $perjalanan3 = Perjalanan::create([
            'template_perjalanan_id' => $templateId,
            'nomor' => '003/SPT-DPRD/DKI/2026',
            'nama_kegiatan' => 'Rapat Koordinasi Nasional Sekretariat DPRD',
            'kategori_perjalanan' => 'Rapat',
            'tujuan' => 'Bali',
            'lokasi' => 'The Stones Hotel Legian Bali',
            'tanggal_berangkat' => '2026-07-05',
            'tanggal_pulang' => '2026-07-07',
            'lama_hari' => 3,
            'status' => 'Selesai',
            'keterangan' => 'Rapat koordinasi nasional tahunan.',
        ]);

        // Menambahkan contoh relasi Peserta jika data master personel sudah ada
        $asnSample = Asn::first();
        $dewanSample = AnggotaDewan::first();

        if ($asnSample) {
            Peserta::create([
                'perjalanan_id' => $perjalanan1->id,
                'jenis_peserta' => 'Asn',
                'peserta_id' => $asnSample->id,
            ]);
        }

        if ($dewanSample) {
            Peserta::create([
                'perjalanan_id' => $perjalanan1->id,
                'jenis_peserta' => 'Dewan',
                'peserta_id' => $dewanSample->id,
            ]);
        }
    }
}