import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
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
        nama: ''
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.kelompok-biaya.update', editId), {
                onSuccess: () => { setEditId(null); reset(); }
            });
        } else {
            post(route('master.kelompok-biaya.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item: KelompokItem) => {
        setEditId(item.id);
        setData('nama', item.nama);
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Kelompok Biaya">
            <Head title="Kelompok Biaya" />
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">Manajemen Kelompok Biaya</h2>
                <p className="text-xs text-slate-500 mt-1">Kelola kategori besar untuk pengelompokan anggaran perjalanan dinas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Tabel Data */}
                <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-xl border border-slate-200">
                    <h2 className="text-md font-bold text-slate-800 mb-4">Daftar Kelompok Biaya</h2>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600 w-16">No</th>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Nama Kelompok</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600 w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {listKelompok.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-slate-400 italic">Belum ada data kelompok biaya.</td>
                                    </tr>
                                ) : (
                                    listKelompok.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition">
                                            <td className="px-4 py-3 text-slate-500">{index + 1}</td>
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
                        {editId ? 'Edit Kelompok' : 'Tambah Kelompok'}
                    </h2>
                    <p className="text-[10px] text-slate-400 mb-5">
                        {editId ? 'Ubah nama kategori pengelompokan yang sudah ada.' : 'Masukkan nama kategori pengelompokan baru.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Kelompok <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                className={`w-full border p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${errors.nama ? 'border-rose-300 bg-rose-50' : 'border-slate-300'}`}
                                placeholder="Contoh: Biaya Transportasi" 
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