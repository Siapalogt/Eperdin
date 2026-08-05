import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import { PjlpTable, PjlpItem } from './Components/PjlpTable';
import { PjlpForm } from './Components/PjlpForm';

interface Props {
    listPjlp: PjlpItem[];
}

export default function Index({ listPjlp = [] }: Props) {
    const [selectedPjlp, setSelectedPjlp] = useState<PjlpItem | null>(null);

    const handleEdit = (item: PjlpItem) => {
        setSelectedPjlp(item);
    };

    const handleCancelEdit = () => {
        setSelectedPjlp(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data PJLP ini?')) {
            router.delete(route('master.pjlp.destroy', id), {
                onSuccess: () => {
                    if (selectedPjlp?.id === id) {
                        setSelectedPjlp(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Data PJLP">
            <Head title="Master Data PJLP" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Master Data PJLP
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola data Penyedia Jasa Lainnya Perorangan (PJLP), bagian kerja, jabatan, dan status keaktifan.
                    </p>
                </div>

                {/* Grid Layout 2-Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel Data PJLP (2 Kolom) */}
                    <PjlpTable
                        listPjlp={listPjlp}
                        activeEditId={selectedPjlp?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input PJLP (1 Kolom) */}
                    <PjlpForm
                        selectedPjlp={selectedPjlp}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}