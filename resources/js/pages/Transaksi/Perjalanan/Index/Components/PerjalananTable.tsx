import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export interface Perjalanan {
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

interface PerjalananTableProps {
    listPerjalanan: Perjalanan[];
    onDelete: (id: number) => void;
}

export const PerjalananTable: React.FC<PerjalananTableProps> = ({
    listPerjalanan,
    onDelete,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter perjalanan berdasarkan nomor SPT, kegiatan, atau tujuan
    const filteredPerjalanan = listPerjalanan.filter(
        (row) =>
            row.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.nama_kegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.tujuan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Draft':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Diproses':
                return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'Selesai':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Ditolak':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            {/* Header Table & Search */}
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Daftar Dokumen Tugas
                </span>
                <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Cari nomor SPT, kegiatan, kota..."
                        className="w-full rounded-xl border border-slate-300 py-2 pr-4 pl-9 text-xs font-medium transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 font-bold tracking-wider text-slate-500 uppercase">
                        <tr>
                            <th className="px-6 py-4 text-left">No. SPT / Dokumen</th>
                            <th className="px-6 py-4 text-left">Nama Kegiatan & Tujuan</th>
                            <th className="px-6 py-4 text-left">Tanggal Pelaksanaan</th>
                            <th className="px-6 py-4 text-left">Lama Perjalanan</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                        {filteredPerjalanan.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center italic text-slate-400">
                                    Belum ada data usulan perjalanan dinas yang tercatat.
                                </td>
                            </tr>
                        ) : (
                            filteredPerjalanan.map((row) => (
                                <tr key={row.id} className="transition hover:bg-slate-50/60">
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route('perjalanan.show', row.id)}
                                            className="font-bold text-indigo-600 hover:text-indigo-900 hover:underline"
                                        >
                                            {row.nomor}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-800">
                                            {row.nama_kegiatan}
                                        </div>
                                        <div className="mt-0.5 text-[10px] font-medium text-slate-400">
                                            {row.tujuan} {row.lokasi ? `(${row.lokasi})` : ''}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">
                                        {row.tanggal_berangkat} s/d {row.tanggal_pulang}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">
                                        {row.lama_hari} Hari
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusStyle(row.status)}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="space-x-3 px-6 py-4 text-center">
                                        <Link
                                            href={route('perjalanan.show', row.id)}
                                            className="font-bold text-indigo-600 hover:text-indigo-900 hover:underline"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={`/perjalanan/${row.id}/edit`}
                                            className="font-bold text-amber-600 hover:text-amber-800 hover:underline transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => onDelete(row.id)}
                                            className="font-bold text-rose-600 hover:text-rose-900 hover:underline transition"
                                        >
                                            Hapus
                                        </button>
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