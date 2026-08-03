import React, { useEffect } from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AppLayout from '../../../../layouts/AppLayout'; // Sesuaikan path layout Anda

interface Kategori {
    id: number;
    kode: string;
    nama: string;
}

interface EditProps {
    perjalanan: any;
    kategoris: Kategori[];
}

export default function Edit({ perjalanan, kategoris }: EditProps) {
    // Inisialisasi form dengan data dari database
    const { data, setData, put, processing, errors } = useForm({
        nomor: perjalanan.nomor || '',
        nama_kegiatan: perjalanan.nama_kegiatan || '',
        kategori_id: perjalanan.kategori_id || '', // 💡 Di-bind ke kategori_id (Foreign Key)
        tujuan: perjalanan.tujuan || '',
        lokasi: perjalanan.lokasi || '',
        tanggal_berangkat: perjalanan.tanggal_berangkat || '',
        tanggal_pulang: perjalanan.tanggal_pulang || '',
        lama_hari: perjalanan.lama_hari || 0,
        keterangan: perjalanan.keterangan || '',
    });

    // Otomatis hitung ulang selisih hari jika tanggal diubah
    useEffect(() => {
        if (data.tanggal_berangkat && data.tanggal_pulang) {
            const tgl1 = new Date(data.tanggal_berangkat);
            const tgl2 = new Date(data.tanggal_pulang);
            const selisihWaktu = tgl2.getTime() - tgl1.getTime();
            const selisihHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24)) + 1;
            
            setData('lama_hari', selisihHari > 0 ? selisihHari : 0);
        }
    }, [data.tanggal_berangkat, data.tanggal_pulang]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/perjalanan/${perjalanan.id}`);
    };

    return (
        <AppLayout title={`Edit Perjalanan: ${perjalanan.nomor}`}>
            <Head title="Edit Perjalanan" />

            <div className="max-w-5xl mx-auto py-4">
                {/* Header Page */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={`/perjalanan/${perjalanan.id}`}
                            className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center space-x-1 mb-2 transition"
                        >
                            <span>&larr;</span>
                            <span>Kembali ke Detail Perjalanan</span>
                        </Link>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Data Perjalanan Dinas</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Perbarui informasi umum dan penjadwalan transaksi perjalanan dinas.
                        </p>
                    </div>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* KARTU 1: INFORMASI UTAMA */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                            <div className="w-2 h-5 bg-indigo-600 rounded-full"></div>
                            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">1. Informasi Utama</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Nomor Perjalanan */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Nomor Perjalanan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nomor}
                                    onChange={e => setData('nomor', e.target.value)}
                                    placeholder="Contoh: 001/SPT-DPRD/DKI/2026"
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.nomor && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.nomor}</span>}
                            </div>

                            {/* Kategori Perjalanan (Terintegrasi Master Kategori) */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Kategori Perjalanan <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.kategori_id}
                                    onChange={e => setData('kategori_id', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800 cursor-pointer"
                                >
                                    <option value="">-- Pilih Master Kategori --</option>
                                    {kategoris?.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.kode} - {k.nama}
                                        </option>
                                    ))}
                                </select>
                                {errors.kategori_id && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.kategori_id}</span>}
                            </div>

                            {/* Nama Kegiatan */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Nama Kegiatan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_kegiatan}
                                    onChange={e => setData('nama_kegiatan', e.target.value)}
                                    placeholder="Masukkan nama agenda atau kegiatan dinas"
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.nama_kegiatan && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.nama_kegiatan}</span>}
                            </div>
                        </div>
                    </div>

                    {/* KARTU 2: TUJUAN & PENJADWALAN */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                            <div className="w-2 h-5 bg-amber-500 rounded-full"></div>
                            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">2. Tujuan & Penjadwalan Waktu</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Tujuan */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Tujuan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.tujuan}
                                    onChange={e => setData('tujuan', e.target.value)}
                                    placeholder="Kota atau Daerah Tujuan"
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.tujuan && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.tujuan}</span>}
                            </div>

                            {/* Lokasi Detail */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Lokasi Detail <span className="text-slate-400 font-normal">(Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.lokasi}
                                    onChange={e => setData('lokasi', e.target.value)}
                                    placeholder="Misal: Gedung / Kantor Instansi Tujuan"
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.lokasi && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.lokasi}</span>}
                            </div>
                        </div>

                        {/* Grid Tanggal & Durasi */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Tanggal Berangkat <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_berangkat}
                                    onChange={e => setData('tanggal_berangkat', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.tanggal_berangkat && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.tanggal_berangkat}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Tanggal Pulang <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_pulang}
                                    onChange={e => setData('tanggal_pulang', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                                />
                                {errors.tanggal_pulang && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.tanggal_pulang}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Total Durasi
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={`${data.lama_hari} Hari`}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-100/70 font-black text-indigo-950 text-center cursor-not-allowed"
                                />
                                {errors.lama_hari && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.lama_hari}</span>}
                            </div>
                        </div>
                    </div>

                    {/* KARTU 3: KETERANGAN & TOMBOL AKSI */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Keterangan Tambahan <span className="text-slate-400 font-normal">(Opsional)</span>
                            </label>
                            <textarea
                                rows={3}
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                                placeholder="Tambahkan catatan khusus, nomor nota dinas pendukung, atau instruksi pimpinan..."
                                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition duration-150 font-medium text-slate-800"
                            ></textarea>
                            {errors.keterangan && <span className="text-rose-500 text-xs mt-1 block font-semibold">{errors.keterangan}</span>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                            <Link 
                                href={`/perjalanan/${perjalanan.id}`}
                                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition duration-150"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition duration-150 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}