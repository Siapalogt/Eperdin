import React from 'react';
import { Link, router, Head } from '@inertiajs/react';
import AppLayout from '../../../../layouts/AppLayout'; 
import { StatsCards } from './Components/StatsCards';
import { PerjalananTable, Perjalanan } from './Components/PerjalananTable';

interface IndexProps {
    listPerjalanan: Perjalanan[];
}

export default function Index({ listPerjalanan }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus perjalanan dinas ini?')) {
            router.delete(route('perjalanan.destroy', id));
        }
    };

    // Kalkulasi Angka Statistik
    const totalCount = listPerjalanan.length;
    const draftCount = listPerjalanan.filter((r) => r.status === 'Draft').length;
    const processCount = listPerjalanan.filter((r) => r.status === 'Diproses').length;
    const doneCount = listPerjalanan.filter((r) => r.status === 'Selesai').length;

    return (
        <AppLayout title="Transaksi Perjalanan Dinas">
            <Head title="Manajemen Perjalanan Dinas" />

            <div className="max-w-7xl mx-auto py-4">
                {/* Header Bagian Atas */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                            Manajemen Perjalanan Dinas
                        </h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Kelola draf dokumen, manifes peserta, dan status alur tugas dinas.
                        </p>
                    </div>
                    <Link
                        href={route('perjalanan.create')}
                        className="inline-flex w-fit items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-700"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Buat Perjalanan Baru</span>
                    </Link>
                </div>

                {/* Kartu Ringkasan Statistik */}
                <StatsCards
                    totalCount={totalCount}
                    draftCount={draftCount}
                    processCount={processCount}
                    doneCount={doneCount}
                />

                <PerjalananTable
                    listPerjalanan={listPerjalanan}
                    onDelete={handleDelete}
                />
            </div>
        </AppLayout>
    );
}