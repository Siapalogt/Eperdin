import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
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
        status: 'Aktif'
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.tenaga-ahli.update', editId), {
                onSuccess: () => { setEditId(null); reset(); }
            });
        } else {
            post(route('master.tenaga-ahli.store'), {
                onSuccess: () => reset()
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
            status: item.status
        });
    };

    const handleCancel = () => {
        setEditId(null);
        reset();
    };

    return (
        <AppLayout title="Master Tenaga Ahli">
            <Head title="Tenaga Ahli" />
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">Manajemen Tenaga Ahli (TA)</h2>
                <p className="text-xs text-slate-500 mt-1">Kelola data Tenaga Ahli yang mendampingi Anggota Dewan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tabel Data */}
                <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-xl border border-slate-200">
                    <h2 className="text-md font-bold text-slate-800 mb-4">Daftar Tenaga Ahli</h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Nama & Kontak</th>
                                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Pendamping Dari</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600">Status</th>
                                    <th className="px-4 py-3 text-center font-semibold text-slate-600 w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {listTa.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">Belum ada data Tenaga Ahli.</td>
                                    </tr>
                                ) : (
                                    listTa.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition">
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-slate-800">{item.nama}</div>
                                                <div className="text-[10px] text-slate-500">{item.jabatan} {item.no_hp ? `• ${item.no_hp}` : ''}</div>
                                            </td>
                                            <td className="px-4 py-3 text-indigo-600 font-medium">{item.anggota_dewan?.nama || '-'}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 hover:underline text-xs font-semibold px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition">
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

                {/* Form Input */}
                <div className="bg-white p-6 shadow-sm rounded-xl border border-slate-200 h-fit sticky top-24">
                    <h2 className="text-md font-bold text-slate-800 mb-4">{editId ? 'Edit Data TA' : 'Tambah TA Baru'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mendampingi Dewan <span className="text-rose-500">*</span></label>
                            <select className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white outline-none" value={data.anggota_dewan_id} onChange={e => setData('anggota_dewan_id', e.target.value)} required>
                                <option value="" disabled>-- Pilih Anggota Dewan --</option>
                                {listDewan.map(d => (
                                    <option key={d.id} value={d.id}>{d.nama}</option>
                                ))}
                            </select>
                            {errors.anggota_dewan_id && <p className="text-rose-500 text-[10px] mt-1">{errors.anggota_dewan_id}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nama Lengkap <span className="text-rose-500">*</span></label>
                            <input type="text" className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={data.nama} onChange={e => setData('nama', e.target.value)} required />
                            {errors.nama && <p className="text-rose-500 text-[10px] mt-1">{errors.nama}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Jabatan <span className="text-rose-500">*</span></label>
                                <input type="text" className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={data.jabatan} onChange={e => setData('jabatan', e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">No. HP</label>
                                <input type="text" className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={data.no_hp} onChange={e => setData('no_hp', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
                                <input type="email" className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={data.email} onChange={e => setData('email', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status <span className="text-rose-500">*</span></label>
                                <select className="w-full border border-slate-300 p-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white outline-none" value={data.status} onChange={e => setData('status', e.target.value)} required>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="submit" disabled={processing} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition disabled:opacity-50">
                                {processing ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Tambah TA')}
                            </button>
                            {editId && (
                                <button type="button" onClick={handleCancel} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition">Batal</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;