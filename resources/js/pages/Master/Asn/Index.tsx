import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';
import { AsnTable, AsnItem } from './Components/AsnTable';
import { AsnForm } from './Components/AsnForm';

interface Props {
    listAsn: AsnItem[];
}

export default function Index({ listAsn }: Props) {
    const [selectedAsn, setSelectedAsn] = useState<AsnItem | null>(null);

    const handleEdit = (item: AsnItem) => {
        setSelectedAsn(item);
    };

    const handleCancelEdit = () => {
        setSelectedAsn(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ASN ini?')) {
            router.delete(route('master.asn.destroy', id), {
                onSuccess: () => {
                    if (selectedAsn?.id === id) {
                        setSelectedAsn(null);
                    }
                },
            });
        }
    };

    return (
        <AppLayout title="Master Data ASN">
            <Head title="Master Data ASN" />

            <div className="max-w-7xl mx-auto py-4 space-y-6">
                {/* Header Utama */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Master Data ASN
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola data pegawai Aparatur Sipil Negara, jabatan, unit kerja, dan status keaktifan.
                    </p>
                </div>

                {/* Grid 2-Kolom Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tabel ASN (2 Kolom) */}
                    <AsnTable
                        listAsn={listAsn}
                        activeEditId={selectedAsn?.id || null}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Form Input ASN (1 Kolom) */}
                    <AsnForm
                        selectedAsn={selectedAsn}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}