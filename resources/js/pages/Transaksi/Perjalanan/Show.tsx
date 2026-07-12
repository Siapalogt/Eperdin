import React from 'react';
import { Link } from '@inertiajs/react';

interface Props {
    perjalanan: any;
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
}

const Show: React.FC<Props> = ({ perjalanan, masterAsn, masterDewan, masterPjlp }) => {
    return (
        <div className="p-6 max-w-7xl mx-auto font-sans">
            {/* Navigasi Balik */}
            <div className="mb-4">
                <Link href={route('perjalanan.index')} className="text-sm text-blue-600 hover:underline">
                    &larr; Kembali ke Daftar Perjalanan
                </Link>
            </div>

            {/* Kotak Ringkasan Info Perjalanan */}
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">No. Perjalanan</span>
                    <p className="text-lg font-bold text-gray-800">{perjalanan.nomor}</p>
                    <span className="px-2 py-0.5 mt-1 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                        {perjalanan.status}
                    </span>
                </div>
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Agenda & Tujuan</span>
                    <p className="text-sm font-semibold text-gray-800">{perjalanan.nama_kegiatan}</p>
                    <p className="text-xs text-gray-500">{perjalanan.tujuan} {perjalanan.lokasi ? `(${perjalanan.lokasi})` : ''}</p>
                </div>
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Waktu Pelaksanaan</span>
                    <p className="text-sm font-semibold text-gray-800">{perjalanan.tanggal_berangkat} s/d {perjalanan.tanggal_pulang}</p>
                    <p className="text-xs text-gray-500">Durasi: {perjalanan.lama_hari} Hari</p>
                </div>
            </div>

            {/* Layout Utama Manajemen Peserta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Daftar Peserta Terdaftar */}
                <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-xl border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Anggota / Peserta</h2>
                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                        Belum ada peserta yang dimasukkan ke dalam perjalanan dinas ini.
                    </div>
                </div>

                {/* Kanan: Form Cepat Tambah Peserta */}
                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 h-fit">
                    <h2 className="text-md font-bold text-gray-800 mb-3">Tambah Peserta Baru</h2>
                    <p className="text-xs text-gray-400 mb-4">Pilih tipe personel dan tentukan nama pegawai yang akan ditugaskan.</p>
                    
                    {/* Disini nanti ditaruh form dropdown interaktif pemilih jenis peserta */}
                    <div className="text-xs bg-gray-50 p-3 rounded-lg text-gray-500 italic text-center border">
                        Form input polimorfik siap dikonfigurasi.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;