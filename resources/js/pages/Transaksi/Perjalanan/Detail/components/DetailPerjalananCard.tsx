import React from 'react';


interface Props {
    perjalanan: any;
}

export default function DetailPerjalananCard({ perjalanan }: Props) {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Draft': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Diproses': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Selesai': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Ditolak': return 'bg-rose-50 text-rose-700 border-rose-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        Nomor SPT / Dokumen
                    </span>
                    <h2 className="text-xl font-black text-slate-800 mt-0.5">{perjalanan?.nomor}</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 inline-flex text-xs font-extrabold rounded-full border ${getStatusStyle(perjalanan?.status)}`}>
                        Status: {perjalanan?.status}
                    </span>
                    <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {perjalanan?.kategori_perjalanan || 'Umum'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Agenda & Kegiatan</span>
                    <p className="text-sm font-bold text-slate-800">{perjalanan?.nama_kegiatan}</p>
                    {perjalanan?.keterangan && (
                        <p className="text-xs text-slate-500 mt-2 italic">"{perjalanan.keterangan}"</p>
                    )}
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Tujuan & Lokasi</span>
                    <p className="text-sm font-bold text-slate-800">{perjalanan?.tujuan}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Lokasi: <span className="font-semibold text-slate-700">{perjalanan?.lokasi || 'Tidak diisi'}</span></p>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Waktu Pelaksanaan</span>
                    <p className="text-sm font-bold text-slate-800">{perjalanan?.tanggal_berangkat} s/d {perjalanan?.tanggal_pulang}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Durasi Total: <span className="font-bold text-indigo-600">{perjalanan?.lama_hari} Hari</span></p>
                </div>
            </div>
        </div>
    );
}