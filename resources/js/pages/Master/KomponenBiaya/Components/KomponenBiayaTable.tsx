import React, { useState, useMemo } from 'react';

export interface KelompokItem {
    id: number;
    nama: string;
}

export interface KomponenItem {
    id: number;
    kelompok_biaya_id: number;
    nama: string;
    kelompok_biaya?: {
        id: number;
        nama: string;
    };
}

interface KomponenBiayaTableProps {
    listKomponen: KomponenItem[];
    activeEditId: number | null;
    onEdit: (item: KomponenItem) => void;
    onDelete: (id: number) => void;
}

export const KomponenBiayaTable: React.FC<KomponenBiayaTableProps> = ({
    listKomponen,
    activeEditId,
    onEdit,
    onDelete,
}) => {
 
    const [filterKelompokId, setFilterKelompokId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const availableKelompok = useMemo(() => {
        const map = new Map();
        listKomponen.forEach((k) => {
            if (k.kelompok_biaya) {
                map.set(k.kelompok_biaya.id, k.kelompok_biaya);
            }
        });
        return Array.from(map.values()).sort((a, b) => a.nama.localeCompare(b.nama));
    }, [listKomponen]);


    const filteredKomponen = useMemo(() => {
        return listKomponen.filter((item) => {
        
            const matchKelompok = filterKelompokId === '' || String(item.kelompok_biaya_id) === filterKelompokId;
    
            const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchKelompok && matchSearch;
        });
    }, [listKomponen, filterKelompokId, searchQuery]);

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            
            {/* Header Tabel & Area Filter */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Daftar Rincian Komponen
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Menampilkan <strong className="text-indigo-600">{filteredKomponen.length}</strong> dari total <strong className="text-slate-700">{listKomponen.length}</strong> komponen
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Dropdown Filter Grup */}
                    <select
                        className="border border-slate-300 px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700 bg-white min-w-[180px] cursor-pointer"
                        value={filterKelompokId}
                        onChange={(e) => setFilterKelompokId(e.target.value)}
                    >
                        <option value="">-- Semua Grup Induk --</option>
                        {availableKelompok.map((kel) => (
                            <option key={kel.id} value={kel.id}>
                                {kel.nama}
                            </option>
                        ))}
                    </select>

                    {/* Search Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari nama komponen..."
                            className="pl-9 pr-4 py-2 border border-slate-300 text-xs rounded-xl w-full sm:w-56 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Area Tabel */}
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3.5 text-left">Grup Induk</th>
                            <th className="px-5 py-3.5 text-left">Nama Komponen</th>
                            <th className="w-32 px-5 py-3.5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {filteredKomponen.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                                    {listKomponen.length === 0 
                                        ? "Belum ada rincian komponen biaya yang didaftarkan."
                                        : "Tidak ada komponen yang cocok dengan filter pencarian."}
                                </td>
                            </tr>
                        ) : (
                            filteredKomponen.map((item) => {
                                const isSelected = activeEditId === item.id;
                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/60'}`}
                                    >
                                        <td className="px-5 py-3.5">
                                            <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                                                {item.kelompok_biaya?.nama || 'Tanpa Induk'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 font-bold text-slate-800 text-sm">
                                            {item.nama}
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