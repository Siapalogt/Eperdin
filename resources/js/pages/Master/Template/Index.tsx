import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface TemplateItem {
    id: number;
    nama: string;
    keterangan: string | null;
    status: string;
}

interface Props {
    listTemplate: TemplateItem[];
}

const Index: React.FC<Props> = ({ listTemplate }) => {
    const { data, setData, post, put, reset, errors, processing } = useForm({
        nama: '',
        keterangan: '',
        status: 'Aktif'
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.template.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                }
            });
        } else {
            post(route('master.template.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item: TemplateItem) => {
        setEditId(item.id);
        setData({
            nama: item.nama,
            keterangan: item.keterangan || '',
            status: item.status
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus template perjalanan ini?')) {
            router.delete(route('master.template.destroy', id));
        }
    };

    const filteredTemplate = listTemplate.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keterangan && item.keterangan.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AppLayout title="Master Template Perjalanan">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side: Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Template Dinas</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Total template: {listTemplate.length} template</p>
                        </div>
                        {/* Search */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Cari nama template..."
                                className="pl-9 pr-4 py-2 border border-slate-200 text-xs rounded-xl w-full sm:w-64 focus:outline-none focus:border-blue-600 transition"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Nama Template</th>
                                    <th className="px-6 py-4 text-left">Keterangan</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {filteredTemplate.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Tidak ada template perjalanan ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTemplate.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800 text-sm">{item.nama}</div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-slate-500 font-medium">
                                                {item.keterangan || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                                                    item.status === 'Aktif'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}>
                                                    {item.status}
                                                </span>
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

                {/* Right side: Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                    <div className="mb-4">
                        <h2 className="text-md font-bold text-slate-800">{editId ? 'Ubah Template' : 'Tambah Template'}</h2>
                        <p className="text-xs text-slate-400 mt-0.5">{editId ? 'Isi formulir untuk memperbarui data template' : 'Tambahkan template perjalanan baru ke database master'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Template <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                required
                                placeholder="Contoh: Kunjungan Kerja Dalam Daerah, Bimbingan Teknis"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan / Deskripsi</label>
                            <textarea
                                rows={4}
                                placeholder="Tulis rincian informasi opsional mengenai template ini..."
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                            </select>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {editId ? 'Simpan Perubahan' : 'Tambah Template'}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditId(null);
                                        reset();
                                    }}
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
