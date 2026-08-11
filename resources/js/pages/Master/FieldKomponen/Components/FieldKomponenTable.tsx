import React, { useState, useMemo, useEffect } from 'react';

export interface KelompokBiaya {
    id: number;
    nama: string;
}

export interface KomponenBiaya {
    id: number;
    kelompok_biaya_id?: number | string;
    nama: string;
}

export interface FieldKomponen {
    id: number;
    komponen_biaya_id: number | string;
    label: string;
    field_name: string;
    input_type: string;
    pilihan: string | null;
    required: number | boolean;
    urutan: number;
    status: string;
    komponen_biaya?: KomponenBiaya;
}

interface FieldKomponenTableProps {
    fieldKomponen: FieldKomponen[];
    kelompokBiaya: KelompokBiaya[]; // 👈 Tambahan Prop
    komponenBiaya: KomponenBiaya[]; // 👈 Tambahan Prop
    activeEditId: number | null;
    onEdit: (item: FieldKomponen) => void;
    onDelete: (id: number) => void;
}

export const FieldKomponenTable: React.FC<FieldKomponenTableProps> = ({
    fieldKomponen,
    kelompokBiaya = [],
    komponenBiaya = [],
    activeEditId,
    onEdit,
    onDelete,
}) => {
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedKelompokId, setSelectedKelompokId] = useState<string>('');
    const [selectedKomponenId, setSelectedKomponenId] = useState<string>('');

    // 2. Filter list Komponen Biaya berdasarkan Kelompok Biaya yang dipilih
    const filteredKomponenBiaya = useMemo(() => {
        if (!selectedKelompokId) return komponenBiaya;
        return komponenBiaya.filter(
            (k) => String(k.kelompok_biaya_id) === String(selectedKelompokId)
        );
    }, [selectedKelompokId, komponenBiaya]);

    // 3. Reset Komponen terpilih jika Kelompok diubah
    useEffect(() => {
        if (selectedKomponenId) {
            const isStillAvailable = filteredKomponenBiaya.find(k => String(k.id) === selectedKomponenId);
            if (!isStillAvailable) setSelectedKomponenId('');
        }
    }, [selectedKelompokId, filteredKomponenBiaya]);

    // 4. Eksekusi Filter Data Tabel Utama
    const filteredData = useMemo(() => {
        return fieldKomponen.filter((item) => {
            // Cari data relasinya langsung dari prop master data
            const komp = komponenBiaya.find(k => String(k.id) === String(item.komponen_biaya_id));
            const kelId = komp ? String(komp.kelompok_biaya_id) : '';
            const kompId = String(item.komponen_biaya_id);

            // Filter Dropdown
            const matchKelompok = selectedKelompokId === '' || kelId === selectedKelompokId;
            const matchKomponen = selectedKomponenId === '' || kompId === selectedKomponenId;
            
            // Filter Teks Pencarian
            const searchLower = searchQuery.toLowerCase();
            const matchSearch = 
                item.label.toLowerCase().includes(searchLower) || 
                item.field_name.toLowerCase().includes(searchLower) ||
                (komp?.nama.toLowerCase() || '').includes(searchLower);

            return matchKelompok && matchKomponen && matchSearch;
        });
    }, [fieldKomponen, selectedKelompokId, selectedKomponenId, searchQuery, komponenBiaya]);

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            
            {/* Header & Filter Controls */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Daftar Field Komponen
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Menampilkan <strong className="text-indigo-600">{filteredData.length}</strong> dari <strong className="text-slate-700">{fieldKomponen.length}</strong> field terdaftar
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Dropdown 1: Kelompok */}
                    <select
                        className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700 bg-white"
                        value={selectedKelompokId}
                        onChange={(e) => setSelectedKelompokId(e.target.value)}
                    >
                        <option value="">Semua Kelompok Biaya</option>
                        {kelompokBiaya.map((kel) => (
                            <option key={kel.id} value={kel.id}>{kel.nama}</option>
                        ))}
                    </select>

                    {/* Dropdown 2: Komponen */}
                    <select
                        className="w-full border border-slate-300 px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700 bg-white disabled:bg-slate-100"
                        value={selectedKomponenId}
                        onChange={(e) => setSelectedKomponenId(e.target.value)}
                        disabled={filteredKomponenBiaya.length === 0}
                    >
                        <option value="">Semua Komponen</option>
                        {filteredKomponenBiaya.map((komp) => (
                            <option key={komp.id} value={komp.id}>{komp.nama}</option>
                        ))}
                    </select>

                    {/* Search Teks */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari label, field..."
                            className="pl-9 pr-4 py-2 border border-slate-300 text-xs rounded-xl w-full focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3.5 text-left">Komponen & Label</th>
                            <th className="px-5 py-3.5 text-left">Konfigurasi DB</th>
                            <th className="px-5 py-3.5 text-center w-24">Urutan</th>
                            <th className="px-5 py-3.5 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                    {fieldKomponen.length === 0 
                                        ? "Belum ada rincian komponen biaya yang didaftarkan." 
                                        : "Tidak ada data yang cocok dengan filter pencarian."}
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item) => {
                                const isSelected = activeEditId === item.id;
                                
                                // Pencocokan data induk untuk tampilan row tabel
                                const komp = komponenBiaya.find(k => String(k.id) === String(item.komponen_biaya_id)) || item.komponen_biaya;
                                const kel = kelompokBiaya.find(k => String(k.id) === String(komp?.kelompok_biaya_id));

                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/60'}`}
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="mb-1.5 flex items-center gap-1.5">
                                                <span className="inline-flex items-center rounded border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-extrabold text-slate-500 uppercase">
                                                    {kel?.nama || 'Grup'}
                                                </span>
                                                <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-extrabold text-amber-700">
                                                    {komp?.nama || 'Tanpa Induk'}
                                                </span>
                                            </div>
                                            <div className="font-bold text-slate-800 text-sm">
                                                {item.label}
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                                                <span className={item.status === 'aktif' ? 'text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded' : 'text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded'}>
                                                    {item.status.toUpperCase()}
                                                </span>
                                                <span className={item.required ? 'text-blue-600 font-bold' : ''}>
                                                    {item.required ? 'Wajib Diisi' : 'Opsional'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="font-mono text-indigo-700 bg-indigo-50 px-2 py-1.5 rounded-lg w-fit border border-indigo-100/50 font-bold shadow-sm">
                                                {item.field_name}
                                            </div>
                                            <div className="mt-1.5 font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1">
                                                Type: {item.input_type}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-black border border-slate-200">
                                                {item.urutan}
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