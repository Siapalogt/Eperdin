<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterPersonelSeeder extends Seeder
{
    public function run(): void
    {
        // 1. DATA MASTER ASN (m_asn) 
        DB::table('m_asn')->insert([
            [
                'nip' => '198503152010011002', 
                'nama' => 'Ahmad Sujak, S.Kom', 
                'golongan' => 'IV/a', 
                'pangkat' => 'Pembina', 
                'jabatan' => 'Kepala Bagian Keuangan', 
                'unit_kerja' => 'Secretariat DPRD', 
                'no_hp' => '081234567890', 
                'email' => 'ahmad.sujak@jakarta.go.id', 
                'status' => 'Aktif', 
                'created_at' => now(), 
                'updated_at' => now() 
            ],
            [
                'nip' => '199207222015032001', 
                'nama' => 'Rina Setyawati, S.E', 
                'golongan' => 'III/b', 
                'pangkat' => 'Penata Muda Tingkat I', 
                'jabatan' => 'Verifikator Anggaran', 
                'unit_kerja' => 'Subag Verifikasi', 
                'no_hp' => '081398765432', 
                'email' => 'rina.setya@jakarta.go.id', 
                'status' => 'Aktif', 
                'created_at' => now(), 
                'updated_at' => now() 
            ]
        ]);

        // 2. DATA MASTER ANGGOTA DEWAN (m_anggota_dewan) 
        $dewanId = DB::table('m_anggota_dewan')->insertGetId([
            'nama' => 'H. Prasetyo Edi Marsudi, S.H', 
            'jabatan' => 'Ketua DPRD', 
            'fraksi' => 'PDI-Perjuangan', 
            'komisi' => 'Pimpinan', 
            'no_hp' => '081122334455', 
            'email' => 'prasetyo.edi@dprd.jakarta.go.id', 
            'status' => 'Aktif', 
            'created_at' => now(), 
            'updated_at' => now() 
        ]);

        // 3. DATA MASTER TENAGA AHLI (m_tenaga_ahli) - Menempel pada Anggota Dewan 
        DB::table('m_tenaga_ahli')->insert([
            [
                'anggota_dewan_id' => $dewanId, // Terhubung ke Ketua DPRD di atas 
                'nama' => 'Dr. Hendra Wijaya, M.Si', 
                'jabatan' => 'Tenaga Ahli Hukum Fraksi', 
                'no_hp' => '081555666777', 
                'email' => 'hendra.ta@gmail.com', 
                'status' => 'Aktif', 
                'created_at' => now(), 
                'updated_at' => now() 
            ]
        ]);

        // 4. DATA MASTER PJLP (m_pjlp) 
        DB::table('m_pjlp')->insert([
            [
                'nama' => 'Budi Setiawan', 
                'bagian' => 'Bagian Umum', 
                'jabatan' => 'Pengemudi Operasional', 
                'no_hp' => '081900112233', 
                'status' => 'Aktif', 
                'created_at' => now(), 
                'updated_at' => now() 
            ]
        ]);
    }
}