import { useForm, Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
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
        if (
            confirm('Apakah Anda yakin ingin menghapus data Tenaga Ahli ini?')
        ) {
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

            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                    Manajemen Tenaga Ahli (TA)
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Kelola data Tenaga Ahli yang mendampingi Anggota Dewan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Tabel Data */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-md mb-4 font-bold text-slate-800">
                        Daftar Tenaga Ahli
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                                        Nama & Kontak
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                                        Pendamping Dari
                                    </th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600">
                                        Status
                                    </th>
                                    <th className="w-24 px-4 py-3 text-center font-semibold text-slate-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {listTa.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-8 text-center text-slate-400 italic"
                                        >
                                            Belum ada data Tenaga Ahli.
                                        </td>
                                    </tr>
                                ) : (
                                    listTa.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-slate-800">
                                                    {item.nama}
                                                </div>
                                                <div className="text-[10px] text-slate-500">
                                                    {item.jabatan}{' '}
                                                    {item.no_hp
                                                        ? `• ${item.no_hp}`
                                                        : ''}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-indigo-600">
                                                {item.anggota_dewan?.nama ||
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                                                >
                                                    {item.status}
                                                </span>
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

                {/* Form Input */}
                <div className="sticky top-24 h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-md mb-4 font-bold text-slate-800">
                        {editId ? 'Edit Data TA' : 'Tambah TA Baru'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Mendampingi Dewan{' '}
                                <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                value={data.anggota_dewan_id}
                                onChange={(e) =>
                                    setData('anggota_dewan_id', e.target.value)
                                }
                                required
                            >
                                <option value="" disabled>
                                    -- Pilih Anggota Dewan --
                                </option>
                                {listDewan.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.anggota_dewan_id && (
                                <p className="mt-1 text-[10px] text-rose-500">
                                    {errors.anggota_dewan_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                Nama Lengkap{' '}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                value={data.nama}
                                onChange={(e) =>
                                    setData('nama', e.target.value)
                                }
                                required
                            />
                            {errors.nama && (
                                <p className="mt-1 text-[10px] text-rose-500">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Jabatan{' '}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={data.jabatan}
                                    onChange={(e) =>
                                        setData('jabatan', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    No. HP
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData('no_hp', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Status{' '}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
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
                                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : editId
                                        ? 'Simpan Perubahan'
                                        : 'Tambah TA'}
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