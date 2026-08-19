import React from 'react';
import { router } from '@inertiajs/react';

interface Props {
    perjalananId: number;
    biayaBersamaList?: any[];
    onOpenBiayaBersamaModal?: () => void;
    formatRp: (angka: number) => string;
}

export default function TableBiayaBersama({
    perjalananId,
    biayaBersamaList = [],
    onOpenBiayaBersamaModal,
    formatRp,
}: Props) {
    const handleDeleteBiayaBersama = (biayaId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus item biaya bersama ini?')) {
            router.delete(`/perjalanan/${perjalananId}/biaya-bersama/${biayaId}`);
        }
    };

    const totalKeseluruhan = biayaBersamaList.reduce((acc, cur) => acc + Number(cur.total || 0), 0);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                    <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">
                        Rincian Biaya Bersama / Kolektif
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                        Pengeluaran rombongan (sewa bus, akomodasi bersama, banner, dsb.)
                    </p>
                </div>
                {onOpenBiayaBersamaModal && (
                    <button 
                        onClick={onOpenBiayaBersamaModal}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                    >
                        <span>+</span>
                        <span>Tambah Item Biaya</span>
                    </button>
                )}
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">Komponen & Keterangan</th>
                            <th className="px-4 py-4 text-center">Volume</th>
                            <th className="px-6 py-4 text-right">Tarif Satuan</th>
                            <th className="px-6 py-4 text-right">Total Biaya</th>
                            <th className="px-6 py-4 text-center w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                        {biayaBersamaList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                    Belum ada rincian biaya bersama yang dicatat.
                                </td>
                            </tr>
                        ) : (
                            biayaBersamaList.map((row: any) => (
                                <tr key={row.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 text-sm">
                                            {row.komponen_biaya?.nama || row.nama_item || 'Item Biaya'}
                                        </div>
                                        {row.keterangan && (
                                            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                                                {row.keterangan}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-center font-semibold text-slate-600">
                                        {row.qty || row.volume || 1} {row.satuan || 'Unit'}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600 font-medium">
                                        {formatRp(row.harga_satuan || 0)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-indigo-700">
                                        {formatRp(row.total || 0)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDeleteBiayaBersama(row.id)}
                                            className="p-1.5 text-slate-400 bg-slate-100 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition"
                                            title="Hapus rincian biaya bersama"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    {biayaBersamaList.length > 0 && (
                        <tfoot className="bg-slate-800 text-white">
                            <tr>
                                <td colSpan={3} className="px-6 py-3.5 text-right font-black text-xs uppercase tracking-widest">
                                    Total Biaya Bersama:
                                </td>
                                <td colSpan={2} className="px-6 py-3.5 text-right font-black text-sm text-emerald-400">
                                    {formatRp(totalKeseluruhan)}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
}