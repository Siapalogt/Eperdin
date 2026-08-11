import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../../../layouts/AppLayout';
import DetailPerjalananCard from './components/DetailPerjalananCard';
import StatusWorkflowCard from './components/StatusWorkflowCard';
import FormTambahPeserta from './components/FormTambahPeserta';
import PesertaManifestTable from './components/PesertaManifestTable';
import ModalBiayaPeserta from './components/ModalBiayaPeserta';

interface Props {
    perjalanan: any;
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
    masterTa: any[];
    listKomponen: any[];
    kelompokBiaya?: any[]; 
    listSatuan: any[];
}

const Index: React.FC<Props> = ({ 
    perjalanan, 
    masterAsn, 
    masterDewan, 
    masterPjlp, 
    masterTa, 
    listKomponen,
    kelompokBiaya,
    listSatuan
}) => {
    // State Modal Biaya
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePesertaId, setActivePesertaId] = useState<any>(null);

    // Guard Clause untuk Data Perjalanan Null
    if (!perjalanan) {
        return (
            <AppLayout title="Detail Perjalanan">
                <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
                    <h2 className="text-lg font-bold text-rose-600 mb-2">⚠️ Data Tidak Ditemukan</h2>
                    <p className="text-slate-600 mb-4">Perjalanan dinas yang Anda cari tidak ada dalam sistem.</p>
                    <Link href="/perjalanan" className="text-blue-600 hover:text-blue-800 font-bold">
                        ← Kembali ke Daftar Perjalanan
                    </Link>
                </div>
            </AppLayout>
        );
    }

    const openBiayaModal = (peserta: any) => {
        setActivePesertaId(peserta.id);
        setIsModalOpen(true);
    };

    const activePeserta = perjalanan?.peserta?.find((p: any) => p.id === activePesertaId) || null;
    

    const formatRp = (angka: number) => 
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);

    return (
        <AppLayout title={`Detail Perjalanan: ${perjalanan?.nomor || '-'}`}>
            {/* Header Navigasi Aksi */}
            <div className="mb-4 flex justify-between items-center">
                <Link href="/perjalanan" className="text-xs text-slate-500 hover:text-blue-600 font-bold inline-flex items-center space-x-1.5">
                    <span>&larr;</span><span>Kembali ke Daftar</span>
                </Link>

                <Link 
                    href={`/perjalanan/${perjalanan.id}/edit`} 
                    className="inline-flex items-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-indigo-950 text-xs font-bold rounded-lg shadow-sm transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Data Perjalanan
                </Link>
            </div>

            {/* 1. Ringkasan Detail Perjalanan */}
            <DetailPerjalananCard perjalanan={perjalanan} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. Tabel Manifes Peserta (Kiri - 2 Kolom) */}
                <PesertaManifestTable 
                    perjalananId={perjalanan.id} 
                    pesertaList={perjalanan?.peserta} 
                    onOpenBiayaModal={openBiayaModal}
                    formatRp={formatRp} 
                />

                {/* 3. Panel Samping (Kanan - 1 Kolom) */}
                <div className="space-y-6">
                    <StatusWorkflowCard 
                        perjalananId={perjalanan.id} 
                        status={perjalanan?.status} 
                    />
                    
                    <FormTambahPeserta 
                        perjalananId={perjalanan.id} 
                        masterAsn={masterAsn} 
                        masterDewan={masterDewan} 
                        masterPjlp={masterPjlp} 
                        masterTa={masterTa} 
                    />
                </div>
            </div>

            {/* 4. Modal Input Rincian Biaya */}
            <ModalBiayaPeserta 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                activePeserta={activePeserta} 
                listKomponen={listKomponen} 
                kelompokBiaya={kelompokBiaya} 
                listSatuan={listSatuan}
                formatRp={formatRp} 
            />
        </AppLayout>
    );
};

export default Index;