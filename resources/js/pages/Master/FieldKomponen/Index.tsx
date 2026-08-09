import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import {
    FieldKomponenTable,
    FieldKomponen,
    KomponenBiaya,
    KelompokBiaya,
} from './Components/FieldKomponenTable';
import { FieldKomponenForm } from './Components/FieldKomponenForm';

interface Props {
    fieldKomponen: FieldKomponen[];
    komponenBiaya: KomponenBiaya[];
    kelompokBiaya?: KelompokBiaya[];
}

export default function Index({
    fieldKomponen = [],
    komponenBiaya = [],
    kelompokBiaya = [],
}: Props) {
    const [selectedFieldKomponen, setSelectedFieldKomponen] = useState<FieldKomponen | null>(null);

    const handleEdit = (item: FieldKomponen) => {
        setSelectedFieldKomponen(item);
    };

    const handleCancelEdit = () => {
        setSelectedFieldKomponen(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus rincian biaya ini?')) {
            router.delete(route('master.field-komponen.destroy', id), {
                onSuccess: () => {
                    if (selectedFieldKomponen?.id === id) {
                        setSelectedFieldKomponen(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Rincian Biaya">
            <Head title="Master Rincian Biaya" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Master Rincian Biaya
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola field input dinamis dan konfigurasi data untuk setiap komponen biaya.
                    </p>
                </div>

                {/* Grid Layout 2-Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel Data Field Komponen (2 Kolom) */}
                    <FieldKomponenTable
                        fieldKomponen={fieldKomponen}
                        activeEditId={selectedFieldKomponen?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input Field Komponen (1 Kolom) */}
                    <FieldKomponenForm
                        selectedFieldKomponen={selectedFieldKomponen}
                        komponenBiaya={komponenBiaya}
                        kelompokBiaya={kelompokBiaya}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}