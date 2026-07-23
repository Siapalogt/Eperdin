import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
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

    const handleDelete = (id: number) => {
        if (
            confirm('Apakah Anda yakin ingin menghapus perjalanan dinas ini?')
        ) {
            router.delete(route('perjalanan.destroy', id));
        }
    };

    // Filter perjalanan
    const filteredPerjalanan = listPerjalanan.filter(
        (row) =>
            row.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.nama_kegiatan
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            row.tujuan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Calculate stats
    const totalCount = listPerjalanan.length;
    const draftCount = listPerjalanan.filter(
        (r) => r.status === 'Draft',
    ).length;
    const processCount = listPerjalanan.filter(
        (r) => r.status === 'Diproses',
    ).length;
    const doneCount = listPerjalanan.filter(
        (r) => r.status === 'Selesai',
    ).length;

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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Manajemen Perjalanan Dinas
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-400">
                        Kelola draf dokumen, manifes peserta, dan status alur
                        tugas dinas.
                    </p>
                </div>
                <Link
                    href={route('perjalanan.create')}
                    className="inline-flex w-fit items-center space-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <span>Buat Perjalanan Baru</span>
                </Link>
            </div>

            {/* Statistik Ringkasan */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Total Usulan
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-slate-800">
                            {totalCount}
                        </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Status Draft
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-amber-600">
                            {draftCount}
                        </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Sedang Diproses
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-blue-600">
                            {processCount}
                        </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Selesai / Terbit
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-emerald-600">
                            {doneCount}
                        </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Tabel Data Perjalanan */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Search Header */}
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-bold text-slate-500">
                        DAFTAR DOKUMEN TUGAS
                    </span>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari nomor SPT, kegiatan, kota..."
                            className="w-full rounded-xl border border-slate-200 py-2 pr-4 pl-9 text-xs transition focus:border-blue-600 focus:outline-none sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-xs">
                        <thead className="bg-slate-50 font-bold tracking-wider text-slate-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    No. SPT / Dokumen
                                </th>
                                <th className="px-6 py-4 text-left">
                                    Nama Kegiatan & Tujuan
                                </th>
                                <th className="px-6 py-4 text-left">
                                    Tanggal Pelaksanaan
                                </th>
                                <th className="px-6 py-4 text-left">
                                    Lama Perjalanan
                                </th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-slate-150 divide-y bg-white text-slate-700">
                            {filteredPerjalanan.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-slate-400 italic"
                                    >
                                        Belum ada data usulan perjalanan dinas
                                        yang tercatat.
                                    </td>
                                </tr>
                            ) : (
                                filteredPerjalanan.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="transition hover:bg-slate-50/50"
                                    >
                                        <td className="px-6 py-4">
                                            <Link
                                                href={route(
                                                    'perjalanan.show',
                                                    row.id,
                                                )}
                                                className="font-bold text-blue-600 hover:text-blue-900 hover:underline"
                                            >
                                                {row.nomor}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-800">
                                                {row.nama_kegiatan}
                                            </div>
                                            <div className="mt-0.5 text-[10px] text-slate-400">
                                                {row.tujuan}{' '}
                                                {row.lokasi
                                                    ? `(${row.lokasi})`
                                                    : ''}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">
                                            {row.tanggal_berangkat} s/d{' '}
                                            {row.tanggal_pulang}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-600">
                                            {row.lama_hari} Hari
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusStyle(row.status)}`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="space-x-3 px-6 py-4 text-center">
                                            <Link
                                                href={route(
                                                    'perjalanan.show',
                                                    row.id,
                                                )}
                                                className="font-bold text-indigo-600 hover:text-indigo-900 hover:underline"
                                            >
                                                Detail
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(row.id)
                                                }
                                                className="font-bold text-rose-600 transition hover:text-rose-900 hover:underline"
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
        </AppLayout>
    );
};

export default Index;
