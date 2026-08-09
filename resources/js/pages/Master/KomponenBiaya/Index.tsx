import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import {
    KomponenBiayaTable,
    KomponenItem,
    KelompokItem,
} from './Components/KomponenBiayaTable';
import { KomponenBiayaForm } from './Components/KomponenBiayaForm';

interface Props {
    listKomponen: KomponenItem[];
    listKelompok: KelompokItem[];
}

export default function Index({
    listKomponen = [],
    listKelompok = [],
}: Props) {
    const [selectedKomponen, setSelectedKomponen] = useState<KomponenItem | null>(null);

    const handleEdit = (item: KomponenItem) => {
        setSelectedKomponen(item);
    };

    const handleCancelEdit = () => {
        setSelectedKomponen(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus komponen biaya ini?')) {
            router.delete(route('master.komponen-biaya.destroy', id), {
                onSuccess: () => {
                    if (selectedKomponen?.id === id) {
                        setSelectedKomponen(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Komponen Biaya">
            <Head title="Komponen Biaya" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Manajemen Komponen Biaya
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola rincian item biaya yang terikat pada kelompok biaya induk.
                    </p>
                </div>

                {/* Grid Layout 2-Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel Data Komponen Biaya (2 Kolom) */}
                    <KomponenBiayaTable
                        listKomponen={listKomponen}
                        activeEditId={selectedKomponen?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input Komponen Biaya (1 Kolom) */}
                    <KomponenBiayaForm
                        selectedKomponen={selectedKomponen}
                        listKelompok={listKelompok}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}