import React, { useState } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface TenagaAhliItem {
    id: number;
    anggota_dewan_id: number;
    nama: string;
    jabatan: string;
    no_hp: string | null;
    email: string | null;
    status: string;
    anggota_dewan?: {
        id: number;
        nama: string;
    };
}

interface DewanItem {
    id: number;
    nama: string;
}

interface Props {
    listTa: TenagaAhliItem[];
    listDewan: DewanItem[];
}

const Index: React.FC<Props> = ({ listTa, listDewan }) => {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        anggota_dewan_id: '',
        nama: '',
        jabatan: '',
        no_hp: '',
        email: '',
        status: 'Aktif',
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(route('master.tenaga-ahli.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    reset();
                },
            });
        } else {
            post(route('master.tenaga-ahli.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (item: TenagaAhliItem) => {
        setEditId(item.id);
        setData({
            anggota_dewan_id: item.anggota_dewan_id.toString(),
            nama: item.nama,
            jabatan: item.jabatan,
            no_hp: item.no_hp || '',
            email: item.email || '',
            status: item.status,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Tenaga Ahli ini?')) {
            router.delete(route('master.tenaga-ahli.destroy', id));
        }
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Tenaga Ahli">
            <Head title="Tenaga Ahli" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side: Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Tabel */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Tenaga Ahli (TA)</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Kelola data Tenaga Ahli pendamping dewan. Total terdaftar: {listTa.length} orang</p>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Nama & Kontak</th>
                                    <th className="px-6 py-4 text-left">Pendamping Dari</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {listTa.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Tidak ada data Tenaga Ahli ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    listTa.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800 text-sm">{item.nama}</div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">
                                                    {item.jabatan} {item.no_hp ? `• ${item.no_hp}` : ''}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                {item.anggota_dewan?.nama || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
                    <div className="mb-4">
                        <h2 className="text-md font-bold text-slate-800">{editId ? 'Ubah Data TA' : 'Tambah TA Baru'}</h2>
                        <p className="text-xs text-slate-400 mt-0.5">{editId ? 'Isi formulir untuk memperbarui data tenaga ahli' : 'Tambahkan data Tenaga Ahli baru ke database master'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Mendampingi Dewan <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                value={data.anggota_dewan_id}
                                onChange={(e) => setData('anggota_dewan_id', e.target.value)}
                                required
                            >
                                <option value="" disabled>-- Pilih Anggota Dewan --</option>
                                {listDewan.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.anggota_dewan_id && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.anggota_dewan_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nama Lengkap <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                required
                            />
                            {errors.nama && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Jabatan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.jabatan}
                                    onChange={(e) => setData('jabatan', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Nomor HP
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.no_hp}
                                    onChange={(e) => setData('no_hp', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Status <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah TA'}
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