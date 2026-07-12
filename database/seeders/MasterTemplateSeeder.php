<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterTemplateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('m_template_perjalanan')->insert([
            [
                'nama' => 'Kunjungan Kerja Dalam Daerah',
                'keterangan' => 'Template biaya untuk perjalanan dinas di dalam wilayah provinsi DKI Jakarta / Bodetabek',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Kunjungan Kerja Luar Daerah (Komisi / Badan)',
                'keterangan' => 'Template paket biaya kunjungan kerja antar provinsi untuk Anggota Dewan',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Perjalanan Dinas Biasa (Sekretariat DPRD)',
                'keterangan' => 'Template standar perjalanan dinas rutin untuk pejabat ASN dan staf sekretariat',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}