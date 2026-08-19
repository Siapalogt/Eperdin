import React, { useState } from 'react';
import TableBiayaPeserta from './TableBiayaPeserta';
import TableBiayaBersama from './TableBiayaBersama';

interface Props {
    perjalananId: number;
    pesertaList: any[];
    biayaBersamaList?: any[];
    onOpenBiayaModal: (peserta: any) => void;
    onOpenBiayaBersamaModal?: () => void;
    onEditBiayaBersama?: (item: any) => void; // 👈 Tambahkan prop ini
    formatRp: (angka: number) => string;
}

export default function PesertaManifestTable({
    perjalananId,
    pesertaList = [],
    biayaBersamaList = [],
    onOpenBiayaModal,
    onOpenBiayaBersamaModal,
    onEditBiayaBersama,
    formatRp,
}: Props) {
    const [activeTab, setActiveTab] = useState<'peserta' | 'bersama'>('peserta');

    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => setActiveTab('peserta')}
                    className={`px-6 py-2.5 text-xs font-bold rounded-xl transition ${
                        activeTab === 'peserta'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    Biaya Peserta ({pesertaList.length})
                </button>
                <button
                    onClick={() => setActiveTab('bersama')}
                    className={`px-6 py-2.5 text-xs font-bold rounded-xl transition ${
                        activeTab === 'bersama'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    Biaya Bersama ({biayaBersamaList.length})
                </button>
            </div>

            {activeTab === 'peserta' ? (
                <TableBiayaPeserta
                    perjalananId={perjalananId}
                    pesertaList={pesertaList}
                    onOpenBiayaModal={onOpenBiayaModal}
                    formatRp={formatRp}
                />
            ) : (
                <TableBiayaBersama
                    perjalananId={perjalananId}
                    biayaBersamaList={biayaBersamaList}
                    onOpenBiayaBersamaModal={onOpenBiayaBersamaModal}
                    onEditBiayaBersama={onEditBiayaBersama} 
                    formatRp={formatRp}
                />
            )}
        </div>
    );
}