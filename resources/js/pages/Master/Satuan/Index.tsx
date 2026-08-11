import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout'; // Sesuaikan dengan struktur layout Anda
import {
    SatuanTable,
    SatuanItem,
} from './Components/SatuanTable';
import { SatuanForm } from './Components/SatuanForm';

interface Props {
    listSatuan: SatuanItem[];
}

export default function Index({ listSatuan = [] }: Props) {
    const [selectedSatuan, setSelectedSatuan] = useState<SatuanItem | null>(null);

    const handleEdit = (item: SatuanItem) => {
        setSelectedSatuan(item);
    };

    const handleCancelEdit = () => {
        setSelectedSatuan(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus satuan ini?')) {
            router.delete(route('master.satuan.destroy', id), {
                onSuccess: () => {
                    if (selectedSatuan?.id === id) {
                        setSelectedSatuan(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Satuan Biaya">
            <Head title="Master Satuan" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Manajemen Master Satuan
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola data satuan untuk rincian anggaran perjalanan dinas.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <SatuanTable
                        listSatuan={listSatuan}
                        activeEditId={selectedSatuan?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <SatuanForm
                        selectedSatuan={selectedSatuan}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}