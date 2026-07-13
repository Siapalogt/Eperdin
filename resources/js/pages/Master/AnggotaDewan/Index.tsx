import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface DewanItem {
    id: number;
    nama: string;
    jabatan: string;
    fraksi: string;
    komisi: string | null;
    no_hp: string | null;
    email: string | null;
    status: string;
}

interface Props {
    listDewan: DewanItem[];
}

const Index: React.FC<Props> = ({ listDewan }) => {
    const { data, setData, post, put, reset, errors, processing } = useForm({
        nama: '',
        jabatan: '',
        fraksi: '',
        komisi: '',
        no_hp: '',
        email: '',
        status: 'Aktif'
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.dewan.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                }
            });
        } else {
            post(route('master.dewan.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item: DewanItem) => {
        setEditId(item.id);
        setData({
            nama: item.nama,
            jabatan: item.jabatan,
            fraksi: item.fraksi,
            komisi: item.komisi || '',
            no_hp: item.no_hp || '',
            email: item.email || '',
            status: item.status
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Anggota Dewan ini?')) {
            router.delete(route('master.dewan.destroy', id));
        }
    };

    const filteredDewan = listDewan.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fraksi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout title="Master Data Anggota Dewan">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side: Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Anggota Dewan</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Total terdaftar: {listDewan.length} orang</p>
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
                                placeholder="Cari nama, fraksi, jabatan..."
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
                                    <th className="px-6 py-4 text-left">Nama</th>
                                    <th className="px-6 py-4 text-left">Jabatan & Fraksi</th>
                                    <th className="px-6 py-4 text-left">Komisi</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {filteredDewan.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                            Tidak ada data Anggota Dewan ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDewan.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800 text-sm">{item.nama}</div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">{item.email || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-700">{item.jabatan}</div>
                                                <div className="text-[10px] text-indigo-600 font-bold uppercase">{item.fraksi}</div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-500">
                                                {item.komisi || '-'}
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
                        <h2 className="text-md font-bold text-slate-800">{editId ? 'Ubah Anggota Dewan' : 'Tambah Anggota Dewan'}</h2>
                        <p className="text-xs text-slate-400 mt-0.5">{editId ? 'Isi formulir untuk memperbarui data dewan' : 'Tambahkan Anggota Dewan baru ke database master'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                required
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan DPRD <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                required
                                placeholder="Contoh: Ketua Komisi A, Anggota DPRD"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.jabatan}
                                onChange={e => setData('jabatan', e.target.value)}
                            />
                            {errors.jabatan && <p className="text-rose-500 text-[10px] mt-1">{errors.jabatan}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Fraksi <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: F-PDIP, F-PKS"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.fraksi}
                                    onChange={e => setData('fraksi', e.target.value)}
                                />
                                {errors.fraksi && <p className="text-rose-500 text-[10px] mt-1">{errors.fraksi}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Komisi</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Komisi A, Komisi B"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.komisi}
                                    onChange={e => setData('komisi', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor HP</label>
                                <input
                                    type="text"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.no_hp}
                                    onChange={e => setData('no_hp', e.target.value)}
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
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
                            <input
                                type="email"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {editId ? 'Simpan Perubahan' : 'Tambah Anggota'}
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
