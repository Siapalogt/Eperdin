import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface KomponenItem {
    id: number;
    kelompok_biaya_id: number;
    nama: string;
    kelompok_biaya?: { 
        id: number;
        nama: string;
    };
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
        nama: ''
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.komponen-biaya.update', editId), {
                onSuccess: () => { setEditId(null); reset(); }
            });
        } else {
            post(route('master.komponen-biaya.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item: KomponenItem) => {
        setEditId(item.id);
        setData({
            kelompok_biaya_id: item.kelompok_biaya_id.toString(),
            nama: item.nama
        });
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Komponen Biaya">
            <Head title="Komponen Biaya" />
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">Manajemen Komponen Biaya</h2>
                <p className="text-xs text-slate-500 mt-1">Kelola rincian item biaya yang terikat pada kelompok biaya induk.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Tabel Data */}
                <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-xl border border-slate-200">
                    <h2 className="text-md font-bold text-slate-800 mb-4">Daftar Rincian Komponen</h2>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Grup Induk</th>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Nama Komponen</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600 w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {listKomponen.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-slate-400 italic">Belum ada rincian komponen biaya yang didaftarkan.</td>
                                    </tr>
                                ) : (
                                    listKomponen.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition">
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                                    {item.kelompok_biaya?.nama || 'Tanpa Induk'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button 
                                                    onClick={() => handleEdit(item)} 
                                                    className="text-indigo-600 hover:text-indigo-900 hover:underline text-xs font-semibold px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition"
                                                >
                                                    Edit
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
                <div className="bg-white p-6 shadow-sm rounded-xl border border-slate-200 h-fit sticky top-24">
                    <h2 className="text-md font-bold text-slate-800 mb-1">
                        {editId ? 'Edit Komponen' : 'Tambah Komponen'}
                    </h2>
                    <p className="text-[10px] text-slate-400 mb-5">
                        Pilih grup induk terlebih dahulu sebelum menginputkan nama komponen.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Dropdown Kelompok Biaya */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Grup Kelompok Induk <span className="text-rose-500">*</span></label>
                            <select 
                                className={`w-full border p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white ${errors.kelompok_biaya_id ? 'border-rose-300 bg-rose-50' : 'border-slate-300'}`}
                                value={data.kelompok_biaya_id} 
                                onChange={e => setData('kelompok_biaya_id', e.target.value)} 
                                required
                            >
                                <option value="" disabled>-- Pilih Kelompok Biaya --</option>
                                {listKelompok.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            {errors.kelompok_biaya_id && <p className="text-rose-500 text-[10px] mt-1.5 font-medium">{errors.kelompok_biaya_id}</p>}
                        </div>

                        {/* Input Nama Komponen */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Komponen <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                className={`w-full border p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${errors.nama ? 'border-rose-300 bg-rose-50' : 'border-slate-300'}`}
                                placeholder="Misal: Tiket Kereta Eksekutif" 
                                value={data.nama} 
                                onChange={e => setData('nama', e.target.value)} 
                                required 
                            />
                            {errors.nama && <p className="text-rose-500 text-[10px] mt-1.5 font-medium">{errors.nama}</p>}
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Tambah Data')}
                            </button>
                            {editId && (
                                <button 
                                    type="button" 
                                    onClick={handleCancel} 
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
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