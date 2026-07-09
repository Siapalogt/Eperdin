import React, { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';

interface Template {
    id: number;
    nama: string;
}

interface Props {
    templates: Template[];
}

const Create: React.FC<Props> = ({ templates }) => {
    // Menggunakan hook form bawaan Inertia untuk handle inputan
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

    // Otomatis menghitung selisih lama hari ketika tanggal berangkat/pulang diisi
    useEffect(() => {
        if (data.tanggal_berangkat && data.tanggal_pulang) {
            const tgl1 = new Date(data.tanggal_berangkat);
            const tgl2 = new Date(data.tanggal_pulang);
            const selisihWaktu = tgl2.getTime() - tgl1.getTime();
            const selisihHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24)) + 1; // +1 karena hari pertama dihitung
            
            setData('lama_hari', selisihHari > 0 ? selisihHari : 0);
        }
    }, [data.tanggal_berangkat, data.tanggal_pulang]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('perjalanan.store'));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto font-sans">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Buat Perjalanan Dinas Baru</h1>
                <p className="text-sm text-gray-500">Status awal transaksi akan otomatis tersimpan sebagai Draft</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-xl border border-gray-200 space-y-4">
                {/* Baris 1: Nomor Perjalanan & Template */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Surat Perjalanan</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            placeholder="Contoh: 001/SPPD/DPRD/2026"
                            value={data.nomor}
                            onChange={e => setData('nomor', e.target.value)}
                        />
                        {errors.nomor && <p className="text-red-500 text-xs mt-1">{errors.nomor}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Jenis Paket Template</label>
                        <select 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 bg-white"
                            value={data.template_perjalanan_id}
                            onChange={e => setData('template_perjalanan_id', e.target.value)}
                        >
                            <option value="">-- Pilih Template Komponen --</option>
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>{t.nama}</option>
                            ))}
                        </select>
                        {errors.template_perjalanan_id && <p className="text-red-500 text-xs mt-1">{errors.template_perjalanan_id}</p>}
                    </div>
                </div>

                {/* Baris 2: Nama Kegiatan */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kegiatan Dinas</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                        placeholder="Masukkan rincian nama agenda kegiatan..."
                        value={data.nama_kegiatan}
                        onChange={e => setData('nama_kegiatan', e.target.value)}
                    />
                    {errors.nama_kegiatan && <p className="text-red-500 text-xs mt-1">{errors.nama_kegiatan}</p>}
                </div>

                {/* Baris 3: Tujuan & Lokasi Spesifik */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kota/Daerah Tujuan</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            placeholder="Contoh: Surabaya, Bali, Bandung"
                            value={data.tujuan}
                            onChange={e => setData('tujuan', e.target.value)}
                        />
                        {errors.tujuan && <p className="text-red-500 text-xs mt-1">{errors.tujuan}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Lokasi Spesifik (Opsional)</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            placeholder="Contoh: Gedung DPRD Provinsi, Hotel Utama"
                            value={data.lokasi}
                            onChange={e => setData('lokasi', e.target.value)}
                        />
                    </div>
                </div>

                {/* Baris 4: Tanggal & Durasi Otomatis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Berangkat</label>
                        <input 
                            type="date" 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            value={data.tanggal_berangkat}
                            onChange={e => setData('tanggal_berangkat', e.target.value)}
                        />
                        {errors.tanggal_berangkat && <p className="text-red-500 text-xs mt-1">{errors.tanggal_berangkat}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Pulang</label>
                        <input 
                            type="date" 
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                            value={data.tanggal_pulang}
                            onChange={e => setData('tanggal_pulang', e.target.value)}
                        />
                        {errors.tanggal_pulang && <p className="text-red-500 text-xs mt-1">{errors.tanggal_pulang}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Total Durasi Hari</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded-lg bg-gray-100 font-bold text-gray-700 outline-none border-gray-300 text-center"
                            value={`${data.lama_hari} Hari`}
                            readOnly
                        />
                    </div>
                </div>

                {/* Baris 5: Keterangan Tambahan */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Keterangan / Catatan Tambahan</label>
                    <textarea 
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
                        rows={3}
                        placeholder="Tambahkan info tambahan jika diperlukan..."
                        value={data.keterangan}
                        onChange={e => setData('keterangan', e.target.value)}
                    ></textarea>
                </div>

                {/* Baris Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Link 
                        href={route('perjalanan.index')} 
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Batal
                    </Link>
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Sebagai Draft'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;