import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import { DewanTable, DewanItem } from './Components/DewanTable';
import { DewanForm } from './Components/DewanForm';

interface Props {
    listDewan: DewanItem[];
}

export default function Index({ listDewan }: Props) {
    const [selectedDewan, setSelectedDewan] = useState<DewanItem | null>(null);

    const handleEdit = (item: DewanItem) => {
        setSelectedDewan(item);
    };

    const handleCancelEdit = () => {
        setSelectedDewan(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Anggota Dewan ini?')) {
            router.delete(route('master.dewan.destroy', id), {
                onSuccess: () => {
                    if (selectedDewan?.id === id) {
                        setSelectedDewan(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Data Anggota Dewan">
            <Head title="Master Anggota Dewan" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Master Data Anggota Dewan
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola data keanggotaan DPRD, fraksi, komisi, dan status keaktifan anggota.
                    </p>
                </div>

                {/* Grid 2-Kolom Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel (2 Kolom) */}
                    <DewanTable
                        listDewan={listDewan}
                        activeEditId={selectedDewan?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input (1 Kolom) */}
                    <DewanForm
                        selectedDewan={selectedDewan}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}