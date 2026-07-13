import React, { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface Peserta {
    id: number;
    perjalanan_id: number;
    jenis_peserta: string;
    peserta_id: number;
    status_hadir: string;
    uang_harian_kustom: number;
    detail_peserta: {
        id: number;
        nama: string;
        nip?: string;
        jabatan: string;
        fraksi?: string;
        bagian?: string;
    } | null;
}

interface Perjalanan {
    id: number;
    nomor: string;
    nama_kegiatan: string;
    tujuan: string;
    lokasi: string | null;
    tanggal_berangkat: string;
    tanggal_pulang: string;
    lama_hari: number;
    keterangan: string | null;
    status: string;
    peserta: Peserta[];
}

interface Props {
    perjalanan: Perjalanan;
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
}

const Show: React.FC<Props> = ({ perjalanan, masterAsn, masterDewan, masterPjlp }) => {
    const { data, setData, post, reset, processing, errors } = useForm({
        jenis_peserta: 'Asn', // default selected
        peserta_id: '',
        uang_harian_kustom: '0',
    });

    const [selectedList, setSelectedList] = useState<any[]>(masterAsn);

    const handleTypeChange = (type: string) => {
        setData('jenis_peserta', type);
        setData('peserta_id', ''); // Reset selection
        if (type === 'Asn') setSelectedList(masterAsn);
        else if (type === 'Dewan') setSelectedList(masterDewan);
        else if (type === 'Pjlp') setSelectedList(masterPjlp);
    };

    const handleAddPeserta = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('perjalanan.peserta.store', perjalanan.id), {
            onSuccess: () => {
                reset('peserta_id', 'uang_harian_kustom');
            }
        });
    };

    const handleDeletePeserta = (pesertaId: number) => {
        if (confirm('Apakah Anda yakin ingin mengeluarkan peserta ini dari perjalanan dinas?')) {
            router.delete(route('perjalanan.peserta.destroy', [perjalanan.id, pesertaId]));
        }
    };

    const updateStatus = (newStatus: string) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status perjalanan ini menjadi ${newStatus}?`)) {
            router.post(route('perjalanan.status', perjalanan.id), {
                status: newStatus
            });
        }
    };

    // Helper functions for displaying participant details
    const getPesertaTypeLabel = (classPath: string) => {
        if (classPath.includes('Asn')) return { label: 'ASN', style: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
        if (classPath.includes('AnggotaDewan')) return { label: 'Dewan', style: 'bg-amber-50 text-amber-700 border-amber-200' };
        if (classPath.includes('Pjlp')) return { label: 'PJLP', style: 'bg-slate-50 text-slate-700 border-slate-200' };
        return { label: 'Peserta', style: 'bg-slate-50 text-slate-700 border-slate-200' };
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Draft':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Diproses':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Selesai':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Ditolak':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <AppLayout title={`Detail Perjalanan: ${perjalanan.nomor}`}>
            {/* Back Button */}
            <div className="mb-4">
                <Link 
                    href={route('perjalanan.index')} 
                    className="text-xs text-slate-500 hover:text-blue-600 font-bold inline-flex items-center space-x-1.5"
                >
                    <span>&larr;</span>
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            {/* Kotak Ringkasan Info Perjalanan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">No. SPT / Perjalanan</span>
                    <p className="text-md font-extrabold text-slate-800 mt-1">{perjalanan.nomor}</p>
                    <span className={`px-2 py-0.5 mt-2 inline-flex text-[9px] font-extrabold rounded-full border ${getStatusStyle(perjalanan.status)}`}>
                        {perjalanan.status}
                    </span>
                </div>
                <div className="md:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Agenda Kegiatan & Tujuan</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">{perjalanan.nama_kegiatan}</p>
                    <p className="text-xs text-slate-400 mt-1">{perjalanan.tujuan} {perjalanan.lokasi ? `(${perjalanan.lokasi})` : ''}</p>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Waktu Pelaksanaan</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">{perjalanan.tanggal_berangkat} s/d {perjalanan.tanggal_pulang}</p>
                    <p className="text-xs text-slate-500 mt-1">Durasi: <span className="font-bold text-slate-700">{perjalanan.lama_hari} Hari</span></p>
                </div>
            </div>

            {/* Layout Utama Manajemen Peserta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Daftar Peserta Terdaftar */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">Manifes Peserta Terdaftar</h3>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Nama / Identitas</th>
                                    <th className="px-6 py-4 text-left">Tipe</th>
                                    <th className="px-6 py-4 text-left">Jabatan</th>
                                    <th className="px-6 py-4 text-right">Uang Harian</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-150 text-slate-700">
                                {perjalanan.peserta.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                            Belum ada peserta yang ditugaskan dalam perjalanan ini.
                                        </td>
                                    </tr>
                                ) : (
                                    perjalanan.peserta.map((row) => {
                                        const typeInfo = getPesertaTypeLabel(row.jenis_peserta);
                                        return (
                                            <tr key={row.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 text-sm">
                                                        {row.detail_peserta?.nama || 'Tidak dikenal'}
                                                    </div>
                                                    {row.detail_peserta?.nip && (
                                                        <div className="text-[10px] text-slate-400 mt-0.5">
                                                            NIP. {row.detail_peserta.nip}
                                                        </div>
                                                    )}
                                                    {row.detail_peserta?.fraksi && (
                                                        <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                                                            Fraksi {row.detail_peserta.fraksi}
                                                        </div>
                                                    )}
                                                    {row.detail_peserta?.bagian && (
                                                        <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                                                            Bagian {row.detail_peserta.bagian}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border ${typeInfo.style}`}>
                                                        {typeInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">
                                                    {row.detail_peserta?.jabatan || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-slate-700">
                                                    Rp {new Intl.NumberFormat('id-ID').format(row.uang_harian_kustom)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => handleDeletePeserta(row.id)} 
                                                        className="text-rose-600 hover:text-rose-900 font-bold hover:underline transition"
                                                    >
                                                        Keluarkan
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

                {/* Kanan: Form Tambah Peserta & Aksi Status */}
                <div className="space-y-6">
                    {/* Alur Status Dokumen */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Persetujuan Alur SPT</h4>
                        
                        <div className="space-y-3">
                            {perjalanan.status === 'Draft' && (
                                <button 
                                    onClick={() => updateStatus('Diproses')}
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                                >
                                    Kirim Usulan (Proses) &rarr;
                                </button>
                            )}

                            {perjalanan.status === 'Diproses' && (
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => updateStatus('Selesai')}
                                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                                    >
                                        Tandai Selesai (Terbit SPT)
                                    </button>
                                    <button 
                                        onClick={() => updateStatus('Ditolak')}
                                        className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs rounded-xl transition"
                                    >
                                        Tolak Usulan
                                    </button>
                                </div>
                            )}

                            {perjalanan.status === 'Selesai' && (
                                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center space-x-2">
                                    <svg className="w-5 h-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Surat tugas dinas telah diselesaikan dan diterbitkan secara resmi!</span>
                                </div>
                            )}

                            {perjalanan.status === 'Ditolak' && (
                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-bold flex items-center space-x-2">
                                    <svg className="w-5 h-5 shrink-0 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Usulan perjalanan dinas ditolak.</span>
                                </div>
                            )}

                            {perjalanan.status !== 'Draft' && (
                                <button 
                                    onClick={() => updateStatus('Draft')}
                                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
                                >
                                    Kembalikan ke Draft
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Form Tambah Peserta Baru */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h3 className="text-md font-bold text-slate-800">Tambah Peserta</h3>
                        <p className="text-xs text-slate-400 mt-0.5 mb-4">Pilih tipe personel dan tentukan nama pegawai yang akan ditugaskan.</p>
                        
                        <form onSubmit={handleAddPeserta} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Personel <span className="text-rose-500">*</span></label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Asn', 'Dewan', 'Pjlp'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleTypeChange(type)}
                                            className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                                                data.jenis_peserta === type 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {type === 'Dewan' ? 'Dewan' : type === 'Asn' ? 'ASN' : 'PJLP'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Personel <span className="text-rose-500">*</span></label>
                                <select
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                    value={data.peserta_id}
                                    onChange={e => setData('peserta_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Nama --</option>
                                    {selectedList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama} {item.nip ? `(NIP. ${item.nip})` : ''} {item.fraksi ? `(${item.fraksi})` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.peserta_id && <p className="text-rose-500 text-[10px] mt-1">{errors.peserta_id}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Uang Harian Kustom (Rp)</label>
                                <input
                                    type="number"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.uang_harian_kustom}
                                    onChange={e => setData('uang_harian_kustom', e.target.value)}
                                />
                                {errors.uang_harian_kustom && <p className="text-rose-500 text-[10px] mt-1">{errors.uang_harian_kustom}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {processing ? 'Menambahkan...' : 'Tambahkan Peserta'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;