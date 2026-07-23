import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

export default function Edit({ perjalanan }: { perjalanan: any }) {
    // Inisialisasi form dengan data dari database
    const { data, setData, put, processing, errors } = useForm({
        nomor: perjalanan.nomor || '',
        nama_kegiatan: perjalanan.nama_kegiatan || '',
        kategori_perjalanan: perjalanan.kategori_perjalanan || 'Bimtek',
        tujuan: perjalanan.tujuan || '',
        lokasi: perjalanan.lokasi || '',
        tanggal_berangkat: perjalanan.tanggal_berangkat || '',
        tanggal_pulang: perjalanan.tanggal_pulang || '',
        lama_hari: perjalanan.lama_hari || 0,
        keterangan: perjalanan.keterangan || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan method PUT untuk update ke route perjalanan.update
        put(`/perjalanan/${perjalanan.id}`);
    };

    return (
        <AppLayout title={`Edit Perjalanan: ${perjalanan.nomor}`}>
            <Head title="Edit Perjalanan" />

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto mt-6">
                <div className="mb-8 border-b border-slate-100 pb-5">
                    <h2 className="text-2xl font-bold text-slate-800">Edit Data Perjalanan Dinas</h2>
                    <p className="text-sm text-slate-500 mt-1">Perbarui informasi dasar untuk transaksi perjalanan dinas ini.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nomor Perjalanan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Perjalanan</label>
                            <input
                                type="text"
                                value={data.nomor}
                                onChange={e => setData('nomor', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.nomor && <span className="text-rose-500 text-xs mt-1 block">{errors.nomor}</span>}
                        </div>

                        {/* Kategori Perjalanan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori Perjalanan</label>
                            <select
                                value={data.kategori_perjalanan}
                                onChange={e => setData('kategori_perjalanan', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            >
                                <option value="Bimtek">Bimtek</option>
                                <option value="Kunjungan Kerja">Kunjungan Kerja</option>
                                <option value="Konsultasi">Konsultasi</option>
                                <option value="Rapat">Rapat</option>
                            </select>
                            {errors.kategori_perjalanan && <span className="text-rose-500 text-xs mt-1 block">{errors.kategori_perjalanan}</span>}
                        </div>

                        {/* Nama Kegiatan */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Kegiatan</label>
                            <input
                                type="text"
                                value={data.nama_kegiatan}
                                onChange={e => setData('nama_kegiatan', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.nama_kegiatan && <span className="text-rose-500 text-xs mt-1 block">{errors.nama_kegiatan}</span>}
                        </div>

                        {/* Tujuan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Tujuan</label>
                            <input
                                type="text"
                                value={data.tujuan}
                                onChange={e => setData('tujuan', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.tujuan && <span className="text-rose-500 text-xs mt-1 block">{errors.tujuan}</span>}
                        </div>

                        {/* Lokasi */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi (Opsional)</label>
                            <input
                                type="text"
                                value={data.lokasi}
                                onChange={e => setData('lokasi', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.lokasi && <span className="text-rose-500 text-xs mt-1 block">{errors.lokasi}</span>}
                        </div>

                        {/* Tanggal Berangkat */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Berangkat</label>
                            <input
                                type="date"
                                value={data.tanggal_berangkat}
                                onChange={e => setData('tanggal_berangkat', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.tanggal_berangkat && <span className="text-rose-500 text-xs mt-1 block">{errors.tanggal_berangkat}</span>}
                        </div>

                        {/* Tanggal Pulang */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pulang</label>
                            <input
                                type="date"
                                value={data.tanggal_pulang}
                                onChange={e => setData('tanggal_pulang', e.target.value)}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.tanggal_pulang && <span className="text-rose-500 text-xs mt-1 block">{errors.tanggal_pulang}</span>}
                        </div>

                        {/* Lama Hari */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Lama Hari</label>
                            <input
                                type="number"
                                min="1"
                                value={data.lama_hari}
                                onChange={e => setData('lama_hari', parseInt(e.target.value))}
                                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                            />
                            {errors.lama_hari && <span className="text-rose-500 text-xs mt-1 block">{errors.lama_hari}</span>}
                        </div>
                    </div>

                    {/* Keterangan */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Keterangan (Opsional)</label>
                        <textarea
                            rows={4}
                            value={data.keterangan}
                            onChange={e => setData('keterangan', e.target.value)}
                            className="w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                        ></textarea>
                        {errors.keterangan && <span className="text-rose-500 text-xs mt-1 block">{errors.keterangan}</span>}
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-100">
                        <Link 
                            href={`/perjalanan/${perjalanan.id}`}
                            className="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}