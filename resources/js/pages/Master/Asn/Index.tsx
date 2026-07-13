import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface AsnItem {
    id: number;
    nip: string;
    nama: string;
    jabatan: string;
    golongan: string;
    status: string;
}

interface Props {
    listAsn: AsnItem[];
}

const Index: React.FC<Props> = ({ listAsn }) => {
    const { data, setData, post, put, reset, errors, processing } = useForm({
        nip: '',
        nama: '',
        jabatan: '',
        golongan: '',
        status: 'Aktif'
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('master.asn.update', editId), {
                onSuccess: () => { setEditId(null); reset(); }
            });
        } else {
            post(route('master.asn.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item: AsnItem) => {
        setEditId(item.id);
        setData({
            nip: item.nip,
            nama: item.nama,
            jabatan: item.jabatan,
            golongan: item.golongan,
            status: item.status
        });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kiri: Tabel Data ASN */}
            <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Master Data Pegawai ASN</h2>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">NIP</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">Nama</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">Jabatan/Gol</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">Status</th>
                            <th className="px-4 py-2 text-center text-gray-600 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {listAsn.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-700 font-medium">{item.nip}</td>
                                <td className="px-4 py-3 text-gray-800 font-semibold">{item.nama}</td>
                                <td className="px-4 py-3 text-gray-600">{item.jabatan} ({item.golongan})</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-xs font-semibold">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Kanan: Form Input Data */}
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 h-fit">
                <h2 className="text-lg font-bold text-gray-800 mb-3">{editId ? 'Edit Data ASN' : 'Tambah ASN Baru'}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">NIP Pegawai</label>
                        <input type="text" className="w-full border p-2 text-sm rounded-lg" value={data.nip} onChange={e => setData('nip', e.target.value)} />
                        {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                        <input type="text" className="w-full border p-2 text-sm rounded-lg" value={data.nama} onChange={e => setData('nama', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Jabatan</label>
                        <input type="text" className="w-full border p-2 text-sm rounded-lg" value={data.jabatan} onChange={e => setData('jabatan', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Golongan</label>
                        <input type="text" className="w-full border p-2 text-sm rounded-lg" placeholder="Contoh: IV/c" value={data.golongan} onChange={e => setData('golongan', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Status Keaktifan</label>
                        <select className="w-full border p-2 text-sm rounded-lg bg-white" value={data.status} onChange={e => setData('status', e.target.value)}>
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                    <div className="flex space-x-2 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow">
                            {editId ? 'Simpan Perubahan' : 'Tambah Master'}
                        </button>
                        {editId && (
                            <button type="button" onClick={() => { setEditId(null); reset(); }} className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg">Batal</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;