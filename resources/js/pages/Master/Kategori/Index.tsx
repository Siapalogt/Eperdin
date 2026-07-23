import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface Kategori {
    id: number;
    kode: string;
    nama: string;
}

interface Props {
    kategoris: Kategori[];
}

export default function Index({ kategoris }: Props) {
    const [editId, setEditId] = useState<number | null>(null);

    const { data, setData, post, put, reset, processing, errors, clearErrors } = useForm({
        kode: '',
        nama: '',
    });

    // Handle klik tombol Edit di tabel
    const handleEditClick = (kategori: Kategori) => {
        setEditId(kategori.id);
        setData({
            kode: kategori.kode || '',
            nama: kategori.nama
        });
        clearErrors();
    };

    // Handle klik tombol Batal Edit
    const handleCancelEdit = () => {
        setEditId(null);
        reset();
        clearErrors();
    };

    // Handle Submit Form (Tambah / Update)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editId) {
            put(route('master.kategori.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                },
            });
        } else {
            post(route('master.kategori.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    // Handle Hapus Data
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('master.kategori.destroy', id));
        }
    };

    return (
        <AppLayout title="Master Kategori">
            <Head title="Master Kategori" />

            {/* Layout Wrapper disamakan dengan KelompokBiaya */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Kiri: Tabel Data */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Tabel */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Kategori Perjalanan</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Kelola kategori untuk pengelompokan jenis perjalanan atau surat.</p>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left w-16">No</th>
                                    <th className="px-6 py-4 text-left w-32">Kode</th>
                                    <th className="px-6 py-4 text-left">Nama Kategori</th>
                                    <th className="px-6 py-4 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {kategoris.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Belum ada data kategori.
                                        </td>
                                    </tr>
                                ) : (
                                    kategoris.map((kategori, index) => (
                                        <tr key={kategori.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4 font-medium text-slate-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-700">
                                                {kategori.kode}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800">
                                                {kategori.nama}
                                            </td>
                                            <td className="px-6 py-4 text-center space-x-3">
                                                <button
                                                    onClick={() => handleEditClick(kategori)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(kategori.id)}
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
                            {editId ? 'Edit Kategori' : 'Tambah Kategori'}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {editId
                                ? 'Ubah data kategori yang dipilih.'
                                : 'Masukkan kategori pengelompokan baru.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Kode */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Kode Kategori <span className="text-rose-500">*</span>
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

                        {/* Input Nama */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nama Kategori <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Contoh: Kategori Perjalanan..."
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                required
                            />
                            {errors.nama && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
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
                                    onClick={handleCancelEdit}
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
}