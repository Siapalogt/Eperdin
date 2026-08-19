import React from 'react';
import { router } from '@inertiajs/react';

interface Props {
    perjalananId: number;
    pesertaList: any[];
    onOpenBiayaModal: (peserta: any) => void;
    formatRp: (angka: number) => string;
}

export default function TableBiayaPeserta({
    perjalananId,
    pesertaList = [],
    onOpenBiayaModal,
    formatRp,
}: Props) {
    const handleDeletePeserta = (pesertaId: number) => {
        if (confirm('Apakah Anda yakin ingin mengeluarkan peserta ini dari manifes?')) {
            router.delete(`/perjalanan/${perjalananId}/peserta/${pesertaId}`);
        }
    };

    const getPesertaTypeLabel = (classPath: string) => {
        if (!classPath) return { label: 'Unknown', style: 'bg-slate-50 text-slate-700 border-slate-200' };
        if (classPath.includes('Asn')) return { label: 'ASN', style: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
        if (classPath.includes('AnggotaDewan')) return { label: 'Dewan', style: 'bg-amber-50 text-amber-700 border-amber-200' };
        if (classPath.includes('Pjlp')) return { label: 'PJLP', style: 'bg-slate-50 text-slate-700 border-slate-200' };
        if (classPath.includes('TenagaAhli')) return { label: 'TA', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
        return { label: 'Peserta', style: 'bg-slate-50 text-slate-700 border-slate-200' };
    };

    // 💡 Kalkulasi Total Keseluruhan Biaya dari Seluruh Peserta
    const totalKeseluruhanPeserta = pesertaList.reduce((acc, row) => {
        const biayaPeserta = row.biaya?.reduce((subAcc: number, cur: any) => subAcc + Number(cur.total || 0), 0) || 0;
        return acc + biayaPeserta;
    }, 0);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">
                    Manifes Peserta Terdaftar ({pesertaList.length})
                </h3>
            </div>
            
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">Nama / Identitas</th>
                            <th className="px-4 py-4 text-left">Tipe</th>
                            <th className="px-6 py-4 text-right">Total Biaya</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                        {pesertaList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                    Belum ada peserta yang ditugaskan ke perjalanan ini.
                                </td>
                            </tr>
                        ) : (
                            pesertaList.map((row: any) => {
                                const typeInfo = getPesertaTypeLabel(row.jenis_peserta);
                                const totalBiaya = row.biaya?.reduce((acc: number, cur: any) => acc + Number(cur.total), 0) || 0;
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800 text-sm">
                                                {row.detail_peserta?.nama || 'Tidak dikenal'}
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">
                                                {row.detail_peserta?.jabatan || '-'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border ${typeInfo.style}`}>
                                                {typeInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-indigo-700">
                                            {formatRp(totalBiaya)}
                                        </td>
                                        <td className="px-6 py-4 text-center space-x-2">
                                            <button 
                                                onClick={() => onOpenBiayaModal(row)} 
                                                className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition border border-emerald-200"
                                            >
                                                Biaya ({row.biaya?.length || 0})
                                            </button>
                                            <button 
                                                onClick={() => handleDeletePeserta(row.id)} 
                                                className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-bold transition border border-rose-200"
                                            >
                                                Keluarkan
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>

                    {/* 💡 FOOTER TOTAL BIAYA PESERTA */}
                    {pesertaList.length > 0 && (
                        <tfoot className="bg-slate-800 text-white">
                            <tr>
                                <td colSpan={2} className="px-6 py-3.5 text-right font-black text-xs uppercase tracking-widest">
                                    Total Biaya Peserta:
                                </td>
                                <td className="px-6 py-3.5 text-right font-black text-sm text-emerald-400">
                                    {formatRp(totalKeseluruhanPeserta)}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
}