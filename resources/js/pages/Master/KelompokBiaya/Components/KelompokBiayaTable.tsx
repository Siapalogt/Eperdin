import React from 'react';

export interface KelompokItem {
    id: number;
    nama: string;
}

interface KelompokBiayaTableProps {
    listKelompok: KelompokItem[];
    activeEditId: number | null;
    onEdit: (item: KelompokItem) => void;
    onDelete: (id: number) => void;
}

export const KelompokBiayaTable: React.FC<KelompokBiayaTableProps> = ({
    listKelompok,
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
                        Daftar Kelompok Biaya
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Total terdaftar: <strong className="text-slate-700">{listKelompok.length}</strong> kategori
                    </p>
                </div>
            </div>

            {/* Area Tabel */}
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="w-16 px-5 py-3.5 text-left">No</th>
                            <th className="px-5 py-3.5 text-left">Nama Kelompok</th>
                            <th className="w-28 px-5 py-3.5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        {listKelompok.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                                    Belum ada data kelompok biaya.
                                </td>
                            </tr>
                        ) : (
                            listKelompok.map((item, index) => {
                                const isSelected = activeEditId === item.id;
                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/60'}`}
                                    >
                                        <td className="px-5 py-3.5 text-slate-400 font-medium">
                                            {index + 1}
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