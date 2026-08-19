import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    perjalananId: number;
    pesertaTerdaftar?: any[]; // 👈 1. Terima data peserta yang sudah ada di manifes
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
    masterTa: any[];
}

export default function FormTambahPeserta({ 
    perjalananId, 
    pesertaTerdaftar = [], // 👈 Berikan nilai default array kosong
    masterAsn, 
    masterDewan, 
    masterPjlp, 
    masterTa 
}: Props) {
    const [pilihanNama, setPilihanNama] = useState<any[]>([]);
    
    const { data, setData, post, processing, reset, errors } = useForm({
        jenis_peserta: 'Asn',
        peserta_id: '',
        uang_harian_kustom: 0,
    });

    // 💡 Helper untuk mengecek apakah orang tersebut sudah masuk ke manifes
    const isAlreadyAdded = (id: number | string, tipe: string) => {
        return pesertaTerdaftar.some((p: any) => {
            const pId = p.detail_peserta_id || p.peserta_id || p.detail_peserta?.id;
            const pTipe = (p.jenis_peserta || '').toLowerCase();

            let tipeMatch = false;
            if (tipe === 'Asn' && pTipe.includes('asn')) tipeMatch = true;
            else if (tipe === 'Dewan' && (pTipe.includes('dewan') || pTipe.includes('anggotadewan'))) tipeMatch = true;
            else if (tipe === 'Pjlp' && pTipe.includes('pjlp')) tipeMatch = true;
            else if (tipe === 'Ta' && (pTipe.includes('ta') || pTipe.includes('tenagaahli'))) tipeMatch = true;

            return String(pId) === String(id) && tipeMatch;
        });
    };

    useEffect(() => {
        setData('peserta_id', '');
        let rawList: any[] = [];
        
        if (data.jenis_peserta === 'Asn') rawList = masterAsn || [];
        else if (data.jenis_peserta === 'Dewan') rawList = masterDewan || [];
        else if (data.jenis_peserta === 'Pjlp') rawList = masterPjlp || [];
        else if (data.jenis_peserta === 'Ta') rawList = masterTa || [];

        // 💡 2. FILTER: Hanya ambil nama yang BELUM terdaftar di manifes
        const availableList = rawList.filter((item) => !isAlreadyAdded(item.id, data.jenis_peserta));
        setPilihanNama(availableList);
    }, [data.jenis_peserta, pesertaTerdaftar, masterAsn, masterDewan, masterPjlp, masterTa]);

    const handleTambahPeserta = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/perjalanan/${perjalananId}/peserta`, { 
            preserveScroll: true,
            onSuccess: () => reset('peserta_id', 'uang_harian_kustom') 
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
            <h3 className="text-md font-bold text-slate-800">Tambah Peserta</h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">Pilih tipe personel dan tentukan nama pegawai.</p>

            <form onSubmit={handleTambahPeserta} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tipe Personel <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {['Asn', 'Dewan', 'Pjlp', 'Ta'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setData('jenis_peserta', type)}
                                className={`py-1.5 text-[10px] font-bold rounded-lg border transition ${
                                    data.jenis_peserta === type 
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pilih Personel <span className="text-rose-500">*</span>
                    </label>
                    <select 
                        required 
                        disabled={pilihanNama.length === 0} 
                        className={`w-full border p-2.5 text-xs rounded-xl bg-white focus:outline-none transition ${
                            errors.peserta_id 
                                ? 'border-rose-300 focus:border-rose-600' 
                                : 'border-slate-200 focus:border-blue-600'
                        } disabled:bg-slate-100 disabled:text-slate-400`} 
                        value={data.peserta_id} 
                        onChange={e => setData('peserta_id', e.target.value)}
                    >
                        <option value="">
                            {pilihanNama.length === 0 ? '-- Semua Personel Sudah Terdaftar --' : '-- Pilih Nama --'}
                        </option>
                        {pilihanNama.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama} {item.jabatan ? `— (${item.jabatan})` : ''}
                            </option>
                        ))}
                    </select>

                    {errors.peserta_id && (
                        <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.peserta_id}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={processing || !data.peserta_id || pilihanNama.length === 0} 
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Tambahkan Peserta'}
                </button>
            </form>
        </div>
    );
}