<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterBiayaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. MENGISI DATA KELOMPOK BIAYA (m_kelompok_biaya)
        $idTransportasi = DB::table('m_kelompok_biaya')->insertGetId([
            'kode' => 'TRN',
            'nama' => 'Transportasi',
            'urutan' => 1,
            'status' => 'Aktif',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $idAkomodasi = DB::table('m_kelompok_biaya')->insertGetId([
            'kode' => 'AKM',
            'nama' => 'Akomodasi',
            'urutan' => 2,
            'status' => 'Aktif',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $idUangHarian = DB::table('m_kelompok_biaya')->insertGetId([
            'kode' => 'UHR',
            'nama' => 'Uang Harian',
            'urutan' => 3,
            'status' => 'Aktif',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $idOperasional = DB::table('m_kelompok_biaya')->insertGetId([
            'kode' => 'OPS',
            'nama' => 'Operasional',
            'urutan' => 4,
            'status' => 'Aktif',
            'created_at' => now(),
            'updated_at' => now()
        ]);


        // 2. MENGISI DATA KOMPONEN BIAYA (m_komponen_biaya)
        // Rumpun Transportasi
        DB::table('m_komponen_biaya')->insert([
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-01',
                'nama' => 'Pesawat',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Tiket',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-02',
                'nama' => 'Kereta',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Tiket',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-03',
                'nama' => 'BBM',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Liter/Nota',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-04',
                'nama' => 'Tol',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Struk',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-05',
                'nama' => 'Parkir',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Struk',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idTransportasi,
                'kode' => 'TRN-06',
                'nama' => 'Bus',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Unit',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Rumpun Akomodasi
            [
                'kelompok_biaya_id' => $idAkomodasi,
                'kode' => 'AKM-01',
                'nama' => 'Hotel',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Malam',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idAkomodasi,
                'kode' => 'AKM-02',
                'nama' => 'Penginapan',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Malam',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Rumpun Operasional
            [
                'kelompok_biaya_id' => $idOperasional,
                'kode' => 'OPS-01',
                'nama' => 'Dokumentasi',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Paket',
                'wajib_bukti' => false,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'kelompok_biaya_id' => $idOperasional,
                'kode' => 'OPS-02',
                'nama' => 'Banner',
                'berlaku_untuk' => 'Semua',
                'satuan_default' => 'Pcs',
                'wajib_bukti' => true,
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}