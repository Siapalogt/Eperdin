import React from 'react';
import { router } from '@inertiajs/react';

interface Props {
    perjalananId: number;
    status: string;
}

export default function StatusWorkflowCard({ perjalananId, status }: Props) {
    const updateStatus = (newStatus: string) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status SPT menjadi ${newStatus}?`)) {
            router.post(`/perjalanan/${perjalananId}/status`, { status: newStatus });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Persetujuan Alur SPT</h4>
            <div className="space-y-3">
                {status === 'Draft' && (
                    <button onClick={() => updateStatus('Diproses')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition">
                        Kirim Usulan (Proses) &rarr;
                    </button>
                )}
                {status === 'Diproses' && (
                    <>
                        <button onClick={() => updateStatus('Selesai')} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition">
                            Tandai Selesai (Terbit SPT)
                        </button>
                        <button onClick={() => updateStatus('Ditolak')} className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs rounded-xl transition">
                            Tolak Usulan
                        </button>
                    </>
                )}
                {status !== 'Draft' && (
                    <button onClick={() => updateStatus('Draft')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition mt-2">
                        Kembalikan ke Draft
                    </button>
                )}
            </div>
        </div>
    );
}