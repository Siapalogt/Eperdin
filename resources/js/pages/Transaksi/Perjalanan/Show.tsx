import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface Props {
    perjalanan: any;
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
    masterTa: any[];
    listKomponen: any[];
}

const Show: React.FC<Props> = ({ perjalanan, masterAsn, masterDewan, masterPjlp, masterTa, listKomponen }) => {
    // 💡 Guard clause: Jika perjalanan null, render error
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

    // ==== MANIFES PESERTA STATE ====
    const [pilihanNama, setPilihanNama] = useState<any[]>([]);
    const { data: formPeserta, setData: setFormPeserta, post: postPeserta, processing: procPeserta, reset: resetPeserta, errors: errPeserta } = useForm({
        jenis_peserta: 'Asn',
        peserta_id: '',
    });

    useEffect(() => {
        setFormPeserta('peserta_id', '');
        if (formPeserta.jenis_peserta === 'Asn') setPilihanNama(masterAsn || []);
        else if (formPeserta.jenis_peserta === 'Dewan') setPilihanNama(masterDewan || []);
        else if (formPeserta.jenis_peserta === 'Pjlp') setPilihanNama(masterPjlp || []);
        else if (formPeserta.jenis_peserta === 'Ta') setPilihanNama(masterTa || []);
        else setPilihanNama([]);
    }, [formPeserta.jenis_peserta]);

    const handleTypeChange = (type: string) => {
        setFormPeserta('jenis_peserta', type);
    };

    const handleTambahPeserta = (e: React.FormEvent) => {
        e.preventDefault();
        // 💡 FIX SSR: Menggunakan URL String langsung
        postPeserta(`/perjalanan/${perjalanan.id}/peserta`, { 
            onSuccess: () => resetPeserta('peserta_id', 'uang_harian_kustom') 
        });
    };

    const handleDeletePeserta = (pesertaId: number) => {
        if (confirm('Apakah Anda yakin ingin mengeluarkan peserta ini dari manifes?')) {
            // 💡 FIX SSR: Menggunakan URL String langsung
            router.delete(`/perjalanan/${perjalanan.id}/peserta/${pesertaId}`);
        }
    };

    const updateStatus = (newStatus: string) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status SPT menjadi ${newStatus}?`)) {
            // 💡 FIX SSR: Menggunakan URL String langsung
            router.post(`/perjalanan/${perjalanan.id}/status`, { status: newStatus });
        }
    };

    // ==== MODAL BIAYA STATE ====
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePeserta, setActivePeserta] = useState<any>(null);

    const { data: formBiaya, setData: setFormBiaya, post: postBiaya, processing: procBiaya, reset: resetBiaya } = useForm({
        komponen_biaya_id: '',
        jumlah: 1,
        harga_satuan: 0,
        total: 0,
        keterangan: ''
    });

    // Kalkulasi Total otomatis
    useEffect(() => {
        setFormBiaya('total', formBiaya.jumlah * formBiaya.harga_satuan);
    }, [formBiaya.jumlah, formBiaya.harga_satuan]);

    const handleTambahBiaya = (e: React.FormEvent) => {
        e.preventDefault();
        // 💡 FIX SSR: Menggunakan URL String langsung
        postBiaya(`/peserta/${activePeserta.id}/biaya`, {
            onSuccess: () => {
                resetBiaya(); 
                setIsModalOpen(false);
            }
        });
    };

    const openBiayaModal = (peserta: any) => {
        setActivePeserta(peserta);
        setIsModalOpen(true);
    };

    // ==== HELPER UI ====
    const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);

    const getPesertaTypeLabel = (classPath: string) => {
        if (!classPath) return { label: 'Unknown', style: 'bg-slate-50 text-slate-700 border-slate-200' };
        if (classPath.includes('Asn')) return { label: 'ASN', style: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
        if (classPath.includes('AnggotaDewan')) return { label: 'Dewan', style: 'bg-amber-50 text-amber-700 border-amber-200' };
        if (classPath.includes('Pjlp')) return { label: 'PJLP', style: 'bg-slate-50 text-slate-700 border-slate-200' };
        if (classPath.includes('TenagaAhli')) return { label: 'TA', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
        return { label: 'Peserta', style: 'bg-slate-50 text-slate-700 border-slate-200' };
    };

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
        <AppLayout title={`Detail Perjalanan: ${perjalanan?.nomor || '-'}`}>
            <div className="mb-4">
                {/* 💡 FIX SSR: Menggunakan href="/perjalanan" */}
                <Link href="/perjalanan" className="text-xs text-slate-500 hover:text-blue-600 font-bold inline-flex items-center space-x-1.5">
                    <span>&larr;</span><span>Kembali ke Daftar</span>
                </Link>
            </div>

            {/* Kotak Ringkasan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">No. SPT / Perjalanan</span>
                    <p className="text-md font-extrabold text-slate-800 mt-1">{perjalanan?.nomor}</p>
                    <span className={`px-2 py-0.5 mt-2 inline-flex text-[9px] font-extrabold rounded-full border ${getStatusStyle(perjalanan?.status)}`}>
                        {perjalanan?.status}
                    </span>
                </div>
                <div className="md:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Agenda Kegiatan & Tujuan</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">{perjalanan?.nama_kegiatan}</p>
                    <p className="text-xs text-slate-400 mt-1">{perjalanan?.tujuan} {perjalanan?.lokasi ? `(${perjalanan.lokasi})` : ''}</p>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Waktu Pelaksanaan</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">{perjalanan?.tanggal_berangkat} s/d {perjalanan?.tanggal_pulang}</p>
                    <p className="text-xs text-slate-500 mt-1">Durasi: <span className="font-bold text-slate-700">{perjalanan?.lama_hari} Hari</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Tabel Manifes Peserta */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">Manifes Peserta Terdaftar</h3>
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
                            <tbody className="bg-white divide-y divide-slate-150 text-slate-700">
                                {!perjalanan?.peserta || perjalanan.peserta.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Belum ada peserta yang ditugaskan.</td></tr>
                                ) : (
                                    perjalanan.peserta.map((row: any) => {
                                        const typeInfo = getPesertaTypeLabel(row.jenis_peserta);
                                        const totalBiaya = row.biaya?.reduce((acc: number, cur: any) => acc + Number(cur.total), 0) || 0;
                                        return (
                                            <tr key={row.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 text-sm">{row.detail_peserta?.nama || 'Tidak dikenal'}</div>
                                                    <div className="text-[10px] text-slate-500 mt-0.5">{row.detail_peserta?.jabatan || '-'}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border ${typeInfo.style}`}>{typeInfo.label}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-black text-indigo-700">{formatRp(totalBiaya)}</td>
                                                <td className="px-6 py-4 text-center space-x-2">
                                                    <button onClick={() => openBiayaModal(row)} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition border border-emerald-200">
                                                        Biaya ({row.biaya?.length || 0})
                                                    </button>
                                                    <button onClick={() => handleDeletePeserta(row.id)} className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg text-xs font-bold transition border border-rose-200">
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

                {/* Kanan: Panel Form & Aksi */}
                <div className="space-y-6">
                    {/* Alur Persetujuan */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Persetujuan Alur SPT</h4>
                        <div className="space-y-3">
                            {perjalanan?.status === 'Draft' && (
                                <button onClick={() => updateStatus('Diproses')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition">Kirim Usulan (Proses) &rarr;</button>
                            )}
                            {perjalanan?.status === 'Diproses' && (
                                <>
                                    <button onClick={() => updateStatus('Selesai')} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition">Tandai Selesai (Terbit SPT)</button>
                                    <button onClick={() => updateStatus('Ditolak')} className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs rounded-xl transition">Tolak Usulan</button>
                                </>
                            )}
                            {perjalanan?.status !== 'Draft' && (
                                <button onClick={() => updateStatus('Draft')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition mt-2">Kembalikan ke Draft</button>
                            )}
                        </div>
                    </div>

                    {/* Form Tambah Peserta */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h3 className="text-md font-bold text-slate-800">Tambah Peserta</h3>
                        <p className="text-xs text-slate-400 mt-0.5 mb-4">Pilih tipe personel dan tentukan nama pegawai.</p>
                        
                        <form onSubmit={handleTambahPeserta} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Personel <span className="text-rose-500">*</span></label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['Asn', 'Dewan', 'Pjlp', 'Ta'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleTypeChange(type)}
                                            className={`py-1.5 text-[10px] font-bold rounded-lg border transition ${
                                                formPeserta.jenis_peserta === type 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {type === 'Dewan' ? 'Dewan' : type === 'Asn' ? 'ASN' : type === 'Ta' ? 'TA' : 'PJLP'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Personel <span className="text-rose-500">*</span></label>
                                <select required disabled={!pilihanNama || pilihanNama.length === 0} className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition" value={formPeserta.peserta_id} onChange={e => setFormPeserta('peserta_id', e.target.value)}>
                                    <option value="">-- Pilih Nama --</option>
                                    {pilihanNama?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" disabled={procPeserta || !formPeserta.peserta_id} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition disabled:opacity-50">
                                {procPeserta ? 'Memproses...' : 'Tambahkan Peserta'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL INPUT BIAYA */}
            {isModalOpen && activePeserta && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-lg text-slate-800">Rincian Anggaran: {activePeserta.detail_peserta?.nama}</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{activePeserta.detail_peserta?.jabatan}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-rose-500 hover:text-white transition font-bold">&times;</button>
                        </div>

                        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                            {/* Form Kiri */}
                            <div className="lg:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-200 h-fit">
                                <h4 className="font-bold text-sm mb-4 text-slate-700 border-b pb-2">Tambah Item Biaya</h4>
                                <form onSubmit={handleTambahBiaya} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Komponen</label>
                                        <select className="w-full border border-slate-300 p-2 text-sm rounded-lg bg-white" value={formBiaya.komponen_biaya_id} onChange={e => setFormBiaya('komponen_biaya_id', e.target.value)} required>
                                            <option value="" disabled>-- Pilih Jenis --</option>
                                            {listKomponen?.map(k => (
                                                <option key={k.id} value={k.id}>{k.kelompok_biaya?.nama} - {k.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Qty</label>
                                            <input type="number" min="1" className="w-full border border-slate-300 p-2 text-sm rounded-lg" value={formBiaya.jumlah} onChange={e => setFormBiaya('jumlah', Number(e.target.value))} required />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Tarif Satuan (Rp)</label>
                                            <input type="number" min="0" className="w-full border border-slate-300 p-2 text-sm rounded-lg" value={formBiaya.harga_satuan} onChange={e => setFormBiaya('harga_satuan', Number(e.target.value))} required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan (Opsional)</label>
                                        <input type="text" placeholder="Misal: Sesuai tagihan hotel" className="w-full border border-slate-300 p-2 text-sm rounded-lg" value={formBiaya.keterangan} onChange={e => setFormBiaya('keterangan', e.target.value)} />
                                    </div>
                                    
                                    <div className="pt-2 border-t border-slate-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-slate-500">Kalkulasi Total:</span>
                                            <span className="text-sm font-black text-indigo-700">{formatRp(formBiaya.total)}</span>
                                        </div>
                                        <button type="submit" disabled={procBiaya || formBiaya.total === 0} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition disabled:opacity-50">
                                            {procBiaya ? 'Menyimpan...' : 'Simpan Rincian'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Tabel Kanan */}
                            <div className="lg:col-span-2">
                                <h4 className="font-bold text-sm mb-4 text-slate-700">Daftar Anggaran yang Diusulkan</h4>
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <table className="min-w-full divide-y divide-slate-200 text-xs">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-bold text-slate-600">Item Komponen</th>
                                                <th className="px-4 py-2 text-center font-bold text-slate-600">Vol</th>
                                                <th className="px-4 py-2 text-right font-bold text-slate-600">Tarif (Rp)</th>
                                                <th className="px-4 py-2 text-right font-bold text-slate-600">Total (Rp)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {activePeserta.biaya && activePeserta.biaya.length > 0 ? (
                                                activePeserta.biaya.map((b: any) => (
                                                    <tr key={b.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-3 font-semibold text-slate-700">
                                                            {b.komponen_biaya?.nama}
                                                            {b.keterangan && <span className="block font-normal text-[9px] text-slate-400 mt-0.5">{b.keterangan}</span>}
                                                        </td>
                                                        <td className="px-4 py-3 text-center text-slate-600">{b.jumlah}</td>
                                                        <td className="px-4 py-3 text-right text-slate-600">{formatRp(b.harga_satuan)}</td>
                                                        <td className="px-4 py-3 text-right font-black text-indigo-700">{formatRp(b.total)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">Belum ada komponen biaya yang ditambahkan.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        {activePeserta.biaya && activePeserta.biaya.length > 0 && (
                                            <tfoot className="bg-slate-800 text-white">
                                                <tr>
                                                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-sm">TOTAL KESELURUHAN:</td>
                                                    <td className="px-4 py-3 text-right font-black text-sm">
                                                        {formatRp(activePeserta.biaya.reduce((acc: number, cur: any) => acc + Number(cur.total), 0))}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Show;