import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import {
    KelompokBiayaTable,
    KelompokItem,
} from './Components/KelompokBiayaTable';
import { KelompokBiayaForm } from './Components/KelompokBiayaForm';

interface Props {
    listKelompok: KelompokItem[];
}

export default function Index({ listKelompok = [] }: Props) {
    const [selectedKelompok, setSelectedKelompok] = useState<KelompokItem | null>(null);

    const handleEdit = (item: KelompokItem) => {
        setSelectedKelompok(item);
    };

    const handleCancelEdit = () => {
        setSelectedKelompok(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kelompok biaya ini?')) {
            router.delete(route('master.kelompok-biaya.destroy', id), {
                onSuccess: () => {
                    if (selectedKelompok?.id === id) {
                        setSelectedKelompok(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Kelompok Biaya">
            <Head title="Kelompok Biaya" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Manajemen Kelompok Biaya
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola kategori besar untuk pengelompokan anggaran perjalanan dinas.
                    </p>
                </div>

                {/* Grid Layout 2-Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel Data Kelompok Biaya (2 Kolom) */}
                    <KelompokBiayaTable
                        listKelompok={listKelompok}
                        activeEditId={selectedKelompok?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input Kelompok Biaya (1 Kolom) */}
                    <KelompokBiayaForm
                        selectedKelompok={selectedKelompok}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}