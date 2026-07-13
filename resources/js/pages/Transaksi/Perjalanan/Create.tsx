import React, { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface Template {
    id: number;
    nama: string;
}

interface Props {
    templates: Template[];
}

const Create: React.FC<Props> = ({ templates }) => {
    const { data, setData, post, processing, errors } = useForm({
        nomor: '',
        template_perjalanan_id: '',
        nama_kegiatan: '',
        tujuan: '',
        lokasi: '',
        tanggal_berangkat: '',
        tanggal_pulang: '',
        lama_hari: 0,
        keterangan: '',
    });

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
        post(route('perjalanan.store'));
    };

    return (
        <AppLayout title="Buat Usulan Perjalanan Dinas">
            <div className="max-w-3xl mx-auto">
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

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-md font-bold text-slate-800 font-sans">Formulir Inisiasi Perjalanan</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Semua usulan baru akan disimpan secara otomatis dengan status **Draft**.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Baris 1: Nomor SPT & Template */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Surat Perjalanan (SPT) <span className="text-rose-500">*</span></label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    placeholder="Contoh: 001/SPPD/DPRD/2026"
                                    value={data.nomor}
                                    onChange={e => setData('nomor', e.target.value)}
                                />
                                {errors.nomor && <p className="text-rose-500 text-[10px] mt-1">{errors.nomor}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Jenis Paket Template <span className="text-rose-500">*</span></label>
                                <select 
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                    value={data.template_perjalanan_id}
                                    onChange={e => setData('template_perjalanan_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Template --</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.nama}</option>
                                    ))}
                                </select>
                                {errors.template_perjalanan_id && <p className="text-rose-500 text-[10px] mt-1">{errors.template_perjalanan_id}</p>}
                            </div>
                        </div>

                        {/* Baris 2: Nama Kegiatan */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kegiatan Dinas <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                required
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Masukkan rincian nama agenda kegiatan..."
                                value={data.nama_kegiatan}
                                onChange={e => setData('nama_kegiatan', e.target.value)}
                            />
                            {errors.nama_kegiatan && <p className="text-rose-500 text-[10px] mt-1">{errors.nama_kegiatan}</p>}
                        </div>

                        {/* Baris 3: Tujuan & Lokasi Spesifik */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kota / Daerah Tujuan <span className="text-rose-500">*</span></label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    placeholder="Contoh: Surabaya, Bali, Bandung"
                                    value={data.tujuan}
                                    onChange={e => setData('tujuan', e.target.value)}
                                />
                                {errors.tujuan && <p className="text-rose-500 text-[10px] mt-1">{errors.tujuan}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi Spesifik (Opsional)</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    placeholder="Contoh: Gedung DPRD Provinsi, Hotel Utama"
                                    value={data.lokasi}
                                    onChange={e => setData('lokasi', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Baris 4: Tanggal & Durasi Otomatis */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Berangkat <span className="text-rose-500">*</span></label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.tanggal_berangkat}
                                    onChange={e => setData('tanggal_berangkat', e.target.value)}
                                />
                                {errors.tanggal_berangkat && <p className="text-rose-500 text-[10px] mt-1">{errors.tanggal_berangkat}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Pulang <span className="text-rose-500">*</span></label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.tanggal_pulang}
                                    onChange={e => setData('tanggal_pulang', e.target.value)}
                                />
                                {errors.tanggal_pulang && <p className="text-rose-500 text-[10px] mt-1">{errors.tanggal_pulang}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Durasi Hari</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-slate-50 font-bold text-slate-700 text-center outline-none"
                                    value={`${data.lama_hari} Hari`}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Baris 5: Keterangan Tambahan */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan / Catatan Tambahan</label>
                            <textarea 
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                rows={3}
                                placeholder="Tambahkan rincian/catatan khusus jika diperlukan..."
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                            />
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                            <Link 
                                href={route('perjalanan.index')} 
                                className="px-4 py-2.5 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Sebagai Draft'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;