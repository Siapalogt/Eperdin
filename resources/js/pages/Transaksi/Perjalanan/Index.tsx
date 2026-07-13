import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

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
    const [searchQuery, setSearchQuery] = useState('');

    // Filter perjalanan
    const filteredPerjalanan = listPerjalanan.filter(row => 
        row.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.nama_kegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.tujuan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate stats
    const totalCount = listPerjalanan.length;
    const draftCount = listPerjalanan.filter(r => r.status === 'Draft').length;
    const processCount = listPerjalanan.filter(r => r.status === 'Diproses').length;
    const doneCount = listPerjalanan.filter(r => r.status === 'Selesai').length;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Draft':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Diproses':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Selesai':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Ditolak':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <AppLayout title="Transaksi Perjalanan Dinas">
            {/* Header Bagian Atas */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manajemen Perjalanan Dinas</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Kelola draf dokumen, manifes peserta, dan status alur tugas dinas.</p>
                </div>
                <Link 
                    href={route('perjalanan.create')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-md font-bold text-xs transition inline-flex items-center space-x-2 w-fit"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Buat Perjalanan Baru</span>
                </Link>
            </div>

            {/* Statistik Ringkasan */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Usulan</span>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">{totalCount}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Draft</span>
                        <h3 className="text-2xl font-black text-amber-600 mt-1">{draftCount}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sedang Diproses</span>
                        <h3 className="text-2xl font-black text-blue-600 mt-1">{processCount}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selesai / Terbit</span>
                        <h3 className="text-2xl font-black text-emerald-600 mt-1">{doneCount}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Tabel Data Perjalanan */}
            <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-200">
                {/* Search Header */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-xs font-bold text-slate-500">DAFTAR DOKUMEN TUGAS</span>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input 
                            type="text"
                            placeholder="Cari nomor SPT, kegiatan, kota..."
                            className="pl-9 pr-4 py-2 border border-slate-200 text-xs rounded-xl w-full sm:w-64 focus:outline-none focus:border-blue-600 transition"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left">No. SPT / Dokumen</th>
                                <th className="px-6 py-4 text-left">Nama Kegiatan & Tujuan</th>
                                <th className="px-6 py-4 text-left">Tanggal Pelaksanaan</th>
                                <th className="px-6 py-4 text-left">Lama Perjalanan</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-150 text-slate-700">
                            {filteredPerjalanan.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                                        Belum ada data usulan perjalanan dinas yang tercatat.
                                    </td>
                                </tr>
                            ) : (
                                filteredPerjalanan.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-4">
                                            <Link href={route('perjalanan.show', row.id)} className="text-blue-600 hover:text-blue-900 font-bold hover:underline">
                                                {row.nomor}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800 text-sm">{row.nama_kegiatan}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">{row.tujuan} {row.lokasi ? `(${row.lokasi})` : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {row.tanggal_berangkat} s/d {row.tanggal_pulang}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-semibold">
                                            {row.lama_hari} Hari
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${getStatusStyle(row.status)}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={route('perjalanan.show', row.id)} className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline">
                                                Buka Detail &rarr;
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;