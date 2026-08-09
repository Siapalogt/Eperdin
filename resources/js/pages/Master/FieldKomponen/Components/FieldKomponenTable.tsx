import React from 'react';

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
    activeEditId: number | null;
    onEdit: (item: FieldKomponen) => void;
    onDelete: (id: number) => void;
}

export const FieldKomponenTable: React.FC<FieldKomponenTableProps> = ({
    fieldKomponen,
    activeEditId,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            {/* Header Tabel */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Daftar Field Komponen
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Kelola input field dinamis untuk setiap rincian komponen biaya.
                    </p>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3.5 text-left">Komponen & Label</th>
                            <th className="px-5 py-3.5 text-left">Konfigurasi DB</th>
                            <th className="px-5 py-3.5 text-left w-24">Urutan</th>
                            <th className="px-5 py-3.5 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {fieldKomponen.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                    Belum ada rincian komponen biaya yang didaftarkan.
                                </td>
                            </tr>
                        ) : (
                            fieldKomponen.map((item) => {
                                const isSelected = activeEditId === item.id;
                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/60'}`}
                                    >
                                        {/* Kolom 1: Label & Komponen */}
                                        <td className="px-5 py-3.5">
                                            <div className="mb-1">
                                                <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                                                    {item.komponen_biaya?.nama || 'Tanpa Induk'}
                                                </span>
                                            </div>
                                            <div className="font-bold text-slate-800 text-sm">
                                                {item.label}
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 flex gap-2">
                                                <span className={item.status === 'aktif' ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                                                    {item.status.toUpperCase()}
                                                </span>
                                                <span>•</span>
                                                <span className={item.required ? 'text-blue-600 font-bold' : ''}>
                                                    {item.required ? 'Wajib Diisi' : 'Opsional'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Kolom 2: Config (Field & Type) */}
                                        <td className="px-5 py-3.5">
                                            <div className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit border border-indigo-100 font-semibold">
                                                {item.field_name}
                                            </div>
                                            <div className="mt-1 font-semibold text-slate-500 uppercase text-[10px]">
                                                Type: {item.input_type}
                                            </div>
                                        </td>

                                        {/* Kolom 3: Urutan */}
                                        <td className="px-5 py-3.5 font-bold text-slate-700">
                                            {item.urutan}
                                        </td>

                                        {/* Kolom 4: Aksi */}
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