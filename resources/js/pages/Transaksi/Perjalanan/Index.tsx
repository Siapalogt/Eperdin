import React from 'react';
import { Link } from '@inertiajs/react';
// 1. Definisikan tipe data objek perjalanan sesuai kolom database kamu
interface Perjalanan {
    id: number;
    nomor: string;
    nama_kegiatan: string;
    tujuan: string;
    lokasi: string | null;
    tanggal_berangkat: string;
    tanggal_pulang: string;
    lama_hari: number;
    status: string;
}

interface Props {
    listPerjalanan: Perjalanan[];
}

const Index: React.FC<Props> = ({ listPerjalanan }) => {
    return (
        <div className="p-6 max-w-7xl mx-auto font-sans">
            {/* Header Bagian Atas */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Daftar Perjalanan Dinas</h1>
                    <p className="text-sm text-gray-500">Sistem Informasi e-Perdin DPRD DKI Jakarta</p>
                </div>
                <Link 
                    href={route('perjalanan.create')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow font-medium transition"
                >
                    + Tambah Perjalanan (Draft)
                </Link>
            </div>

            {/* Tabel Data Perjalanan */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No. Perjalanan</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Kegiatan / Tujuan</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Pelaksanaan</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durasi</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {listPerjalanan.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                                    Belum ada transaksi perjalanan dinas yang tercatat.
                                </td>
                            </tr>
                        ) : (
                            listPerjalanan.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* Mengubah nomor menjadi link yang bisa diklik */}
                                        <Link href={route('perjalanan.show', row.id)} className="text-blue-600 hover:text-blue-900 hover:underline">
                                            {row.nomor}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="font-semibold text-gray-800">{row.nama_kegiatan}</div>
                                        <div className="text-xs text-gray-400">{row.tujuan} {row.lokasi ? `(${row.lokasi})` : ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {row.tanggal_berangkat} s/d {row.tanggal_pulang}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                        {row.lama_hari} Hari
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;