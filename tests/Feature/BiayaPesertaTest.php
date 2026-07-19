<?php

use App\Models\Master\Asn;
use App\Models\Master\KelompokBiaya;
use App\Models\Master\KomponenBiaya;
use App\Models\Transaksi\Perjalanan;
use App\Models\Transaksi\Peserta;
use App\Models\User;

it('menyimpan biaya peserta dari payload form yang memakai field jumlah', function () {
    $user = User::factory()->create();

    $perjalanan = Perjalanan::create([
        'nomor' => 'SPT-TEST-001',
        'template_perjalanan_id' => 1,
        'nama_kegiatan' => 'Uji Coba',
        'kategori_perjalanan' => 'Dinas',
        'tujuan' => 'Bandung',
        'lokasi' => 'Bandung',
        'tanggal_berangkat' => '2026-07-20',
        'tanggal_pulang' => '2026-07-21',
        'lama_hari' => 2,
        'keterangan' => 'Test',
        'status' => 'Draft',
    ]);

    $asn = Asn::create([
        'nip' => '1234567890',
        'nama' => 'Budi',
        'jabatan' => 'Staff',
        'unit_kerja' => 'Pusat',
    ]);

    $peserta = Peserta::create([
        'perjalanan_id' => $perjalanan->id,
        'jenis_peserta' => Asn::class,
        'peserta_id' => $asn->id,
    ]);

    $kelompok = KelompokBiaya::create([
        'nama' => 'Transport',
    ]);

    $komponen = KomponenBiaya::create([
        'kelompok_biaya_id' => $kelompok->id,
        'nama' => 'Tiket Kereta',
    ]);

    $response = $this->actingAs($user)
        ->post(route('peserta.biaya.store', $peserta), [
            'komponen_biaya_id' => $komponen->id,
            'jumlah' => 2,
            'harga_satuan' => 75000,
            'keterangan' => 'Uji coba',
        ]);

    $response->assertRedirect(route('perjalanan.show', $perjalanan->id));
    $this->assertDatabaseHas('t_biaya_peserta', [
        'peserta_id' => $peserta->id,
        'komponen_biaya_id' => $komponen->id,
        'qty' => 2,
        'satuan' => 'unit',
        'harga_satuan' => '75000.00',
        'total' => '150000.00',
        'keterangan' => 'Uji coba',
    ]);
});
