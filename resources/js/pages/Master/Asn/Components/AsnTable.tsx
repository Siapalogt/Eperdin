import React, { useState } from 'react';

export interface AsnItem {
    id: number;
    nip: string;
    nama: string;
    jabatan: string;
    golongan: string;
    unit_kerja: string;
    no_hp: string | null;
    email: string | null;
    status: string;
}

interface AsnTableProps {
    listAsn: AsnItem[];
    activeEditId: number | null;
    onEdit: (item: AsnItem) => void;
    onDelete: (id: number) => void;
}

export const AsnTable: React.FC<AsnTableProps> = ({
    listAsn,
    activeEditId,
    onEdit,
    onDelete,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAsn = listAsn.filter(
        (item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.nip.includes(searchQuery) ||
            item.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            {/* Header Table & Search */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Daftar Pegawai ASN
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Total terdaftar: <strong className="text-slate-700">{listAsn.length}</strong> pegawai
                    </p>
                </div>

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Cari nama, NIP, jabatan..."
                        className="pl-9 pr-4 py-2 border border-slate-300 text-xs rounded-xl w-full sm:w-64 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3.5 text-left">Nama / NIP</th>
                            <th className="px-5 py-3.5 text-left">Jabatan & Unit Kerja</th>
                            <th className="px-5 py-3.5 text-left">Golongan</th>
                            <th className="px-5 py-3.5 text-left">Status</th>
                            <th className="px-5 py-3.5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {filteredAsn.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                    Tidak ada data ASN yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            filteredAsn.map((item) => {
                                const isSelected = activeEditId === item.id;
                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/60'}`}
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="font-bold text-slate-800 text-sm">{item.nama}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">NIP. {item.nip}</div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="font-semibold text-slate-700">{item.jabatan}</div>
                                            <div className="text-[10px] text-indigo-600 font-bold uppercase">{item.unit_kerja}</div>
                                        </td>
                                        <td className="px-5 py-3.5 font-semibold text-slate-600">
                                            {item.golongan || '-'}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${item.status === 'Aktif'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-center space-x-3">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="text-rose-600 hover:text-rose-900 font-bold hover:underline transition"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};