import { useForm, Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AppLayout from '../../../layouts/AppLayout';

interface KelompokItem {
    id: number;
    nama: string;
}

interface Props {
    listKelompok: KelompokItem[];
}

const Index: React.FC<Props> = ({ listKelompok }) => {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        nama: '',
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(route('master.kelompok-biaya.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                },
            });
        } else {
            post(route('master.kelompok-biaya.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (item: KelompokItem) => {
        setEditId(item.id);
        setData('nama', item.nama);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kelompok biaya ini?')) {
            router.delete(route('master.kelompok-biaya.destroy', id));
        }
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Kelompok Biaya">
            <Head title="Kelompok Biaya" />

            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                    Manajemen Kelompok Biaya
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Kelola kategori besar untuk pengelompokan anggaran
                    perjalanan dinas.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Kiri: Tabel Data */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-md mb-4 font-bold text-slate-800">
                        Daftar Kelompok Biaya
                    </h2>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="w-16 px-4 py-3 text-left font-semibold text-slate-600">
                                        No
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                                        Nama Kelompok
                                    </th>
                                    <th className="w-24 px-4 py-3 text-center font-semibold text-slate-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {listKelompok.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-4 py-8 text-center text-slate-400 italic"
                                        >
                                            Belum ada data kelompok biaya.
                                        </td>
                                    </tr>
                                ) : (
                                    listKelompok.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3 text-slate-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">
                                                {item.nama}
                                            </td>
                                            <td className="space-x-3 px-4 py-3 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="text-xs font-bold text-indigo-600 transition hover:text-indigo-900 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="text-xs font-bold text-rose-600 transition hover:text-rose-900 hover:underline"
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

                {/* Kanan: Form Input */}
                <div className="sticky top-24 h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-md mb-1 font-bold text-slate-800">
                        {editId ? 'Edit Kelompok' : 'Tambah Kelompok'}
                    </h2>
                    <p className="mb-5 text-[10px] text-slate-400">
                        {editId
                            ? 'Ubah nama kategori pengelompokan yang sudah ada.'
                            : 'Masukkan nama kategori pengelompokan baru.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Nama Kelompok{' '}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full rounded-lg border p-2.5 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${errors.nama ? 'border-rose-300 bg-rose-50' : 'border-slate-300'}`}
                                placeholder="Contoh: Biaya Transportasi"
                                value={data.nama}
                                onChange={(e) =>
                                    setData('nama', e.target.value)
                                }
                                required
                            />
                            {errors.nama && (
                                <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : editId
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Data'}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-lg bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;