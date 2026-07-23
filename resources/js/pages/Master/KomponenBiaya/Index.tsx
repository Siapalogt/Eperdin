import { useForm, Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AppLayout from '../../../layouts/AppLayout';

interface KomponenItem {
    id: number;
    kelompok_biaya_id: number;
    kode: string; // 💡 Ditambahkan untuk mengatasi error 1364
    nama: string;
    kelompok_biaya?: {
        id: number;
        nama: string;
    };
    kode: string;
}

interface KelompokItem {
    id: number;
    nama: string;
}

interface Props {
    listKomponen: KomponenItem[];
    listKelompok: KelompokItem[];
}

const Index: React.FC<Props> = ({ listKomponen, listKelompok }) => {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        kelompok_biaya_id: '',
        kode: '', // 💡 State kode ditambahkan
        nama: '',
        kode : '',
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(route('master.komponen-biaya.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                },
            });
        } else {
            post(route('master.komponen-biaya.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (item: KomponenItem) => {
        setEditId(item.id);
        setData({
            kelompok_biaya_id: item.kelompok_biaya_id.toString(),
            kode: item.kode || '', // 💡 Set data kode saat mode edit
            nama: item.nama,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus komponen biaya ini?')) {
            router.delete(route('master.komponen-biaya.destroy', id));
        }
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Komponen Biaya">
            <Head title="Komponen Biaya" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kiri: Tabel Data */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Tabel */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Rincian Komponen</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Kelola rincian item biaya yang terikat pada kelompok biaya induk.</p>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Grup Induk</th>
                                    <th className="px-6 py-4 text-left w-32">Kode</th>
                                    <th className="px-6 py-4 text-left">Nama Komponen</th>
                                    <th className="px-6 py-4 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {listKomponen.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Belum ada rincian komponen biaya yang didaftarkan.
                                        </td>
                                    </tr>
                                ) : (
                                    listKomponen.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                                                    {item.kelompok_biaya?.nama || 'Tanpa Induk'}
                                                </span>
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
                            {editId ? 'Ubah Komponen' : 'Tambah Komponen'}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {editId 
                                ? 'Ubah data rincian komponen biaya.' 
                                : 'Pilih grup induk terlebih dahulu sebelum menginputkan komponen.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Dropdown Kelompok Biaya */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Grup Kelompok Induk <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                value={data.kelompok_biaya_id}
                                onChange={(e) => setData('kelompok_biaya_id', e.target.value)}
                                required
                            >
                                <option value="" disabled>-- Pilih Kelompok Biaya --</option>
                                {listKelompok.map((k) => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.kelompok_biaya_id && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.kelompok_biaya_id}</p>
                            )}
                        </div>

                        {/* 💡 Input Kode Komponen */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Kode Komponen <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Contoh: KMP-01"
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                                required
                            />
                            {errors.kode && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.kode}</p>
                            )}
                        </div>

                        {/* Input Nama Komponen */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nama Komponen <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Misal: Tiket Kereta Eksekutif"
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
                                {processing ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Data'}
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