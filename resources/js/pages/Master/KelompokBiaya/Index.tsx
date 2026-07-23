import React, { useState } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface KelompokItem {
    id: number;
    kode: string; // 💡 Ditambahkan agar tidak error 1364
    nama: string;
}

interface Props {
    listKelompok: KelompokItem[];
}

const Index: React.FC<Props> = ({ listKelompok }) => {
    // 💡 State kode ditambahkan di sini
    const { data, setData, post, put, reset, processing, errors } = useForm({
        kode: '',
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
        setData({
            kode: item.kode || '', // 💡 Set data kode saat diedit
            nama: item.nama
        });
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kiri: Tabel Data */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Tabel */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Kelompok Biaya</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Kelola kategori besar untuk pengelompokan anggaran perjalanan dinas.</p>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left w-16">No</th>
                                    <th className="px-6 py-4 text-left w-32">Kode</th>
                                    <th className="px-6 py-4 text-left">Nama Kelompok</th>
                                    <th className="px-6 py-4 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {listKelompok.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Belum ada data kelompok biaya.
                                        </td>
                                    </tr>
                                ) : (
                                    listKelompok.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4 font-medium text-slate-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-700">
                                                {item.kode}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800">
                                                {item.nama}
                                            </td>
                                            <td className="px-6 py-4 text-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-rose-600 hover:text-rose-900 font-bold hover:underline transition"
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
                    <div className="mb-4">
                        <h2 className="text-md font-bold text-slate-800">
                            {editId ? 'Edit Kelompok' : 'Tambah Kelompok'}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {editId
                                ? 'Ubah nama kategori pengelompokan yang sudah ada.'
                                : 'Masukkan kategori pengelompokan baru.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 💡 Input Kode ditambahkan di sini */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Kode Kelompok <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Contoh: K-01"
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                                required
                            />
                            {errors.kode && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.kode}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nama Kelompok <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Contoh: Biaya Transportasi"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                required
                            />
                            {errors.nama && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>
                            )}
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
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
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
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