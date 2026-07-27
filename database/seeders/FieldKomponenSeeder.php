<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FieldKomponenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $fields = [
            // ==========================================
            // KOMPONEN 1: PENGINAPAN / HOTEL (Misal ID = 1)
            // ==========================================
            [
                'komponen_biaya_id' => 1,
                'label'             => 'Nama Hotel',
                'field_name'        => 'nama_hotel',
                'input_type'        => 'text',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 1,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 1,
                'label'             => 'Kelas Bintang',
                'field_name'        => 'kelas_bintang',
                'input_type'        => 'select',
                'pilihan'           => 'Bintang 3, Bintang 4, Bintang 5, Non-Bintang',
                'required'          => true,
                'urutan'            => 2,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 1,
                'label'             => 'Tanggal Check-in',
                'field_name'        => 'tanggal_checkin',
                'input_type'        => 'date',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 3,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 1,
                'label'             => 'Tanggal Check-out',
                'field_name'        => 'tanggal_checkout',
                'input_type'        => 'date',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 4,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 1,
                'label'             => 'Nomor Kamar',
                'field_name'        => 'nomor_kamar',
                'input_type'        => 'text',
                'pilihan'           => null,
                'required'          => false, // Opsional
                'urutan'            => 5,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],

            // ==========================================
            // KOMPONEN 2: TIKET PESAWAT (Misal ID = 2)
            // ==========================================
            [
                'komponen_biaya_id' => 2,
                'label'             => 'Nama Maskapai',
                'field_name'        => 'maskapai',
                'input_type'        => 'select',
                'pilihan'           => 'Garuda Indonesia, Citilink, Batik Air, Lion Air, Super Air Jet, Pelita Air',
                'required'          => true,
                'urutan'            => 1,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 2,
                'label'             => 'Nomor Tiket / PNR',
                'field_name'        => 'nomor_tiket',
                'input_type'        => 'text',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 2,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 2,
                'label'             => 'Kota Asal Keberangkatan',
                'field_name'        => 'kota_asal',
                'input_type'        => 'text',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 3,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 2,
                'label'             => 'Kota Tujuan',
                'field_name'        => 'kota_tujuan',
                'input_type'        => 'text',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 4,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
            [
                'komponen_biaya_id' => 2,
                'label'             => 'Tanggal Penerbangan',
                'field_name'        => 'tanggal_penerbangan',
                'input_type'        => 'date',
                'pilihan'           => null,
                'required'          => true,
                'urutan'            => 5,
                'status'            => 'aktif',
                'created_at'        => $now,
                'updated_at'        => $now,
            ],
        ];

        // Hapus data lama agar tidak duplikat jika dijalankan ulang
        DB::table('m_field_komponen')->truncate();

        DB::table('m_field_komponen')->insert($fields);
    }
}