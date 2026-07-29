import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    perjalananId: number;
    masterAsn: any[];
    masterDewan: any[];
    masterPjlp: any[];
    masterTa: any[];
}

export default function FormTambahPeserta({ perjalananId, masterAsn, masterDewan, masterPjlp, masterTa }: Props) {
    const [pilihanNama, setPilihanNama] = useState<any[]>([]);
    const { data, setData, post, processing, reset } = useForm({
        jenis_peserta: 'Asn',
        peserta_id: '',
        uang_harian_kustom: 0,
    });

    useEffect(() => {
        setData('peserta_id', '');
        if (data.jenis_peserta === 'Asn') setPilihanNama(masterAsn || []);
        else if (data.jenis_peserta === 'Dewan') setPilihanNama(masterDewan || []);
        else if (data.jenis_peserta === 'Pjlp') setPilihanNama(masterPjlp || []);
        else if (data.jenis_peserta === 'Ta') setPilihanNama(masterTa || []);
        else setPilihanNama([]);
    }, [data.jenis_peserta]);

    const handleTambahPeserta = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/perjalanan/${perjalananId}/peserta`, { 
            onSuccess: () => reset('peserta_id', 'uang_harian_kustom') 
        });
    };

    return (
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Personel <span className="text-rose-500">*</span></label>
                    <select 
                        required 
                        disabled={!pilihanNama || pilihanNama.length === 0} 
                        className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition" 
                        value={data.peserta_id} 
                        onChange={e => setData('peserta_id', e.target.value)}
                    >
                        <option value="">-- Pilih Nama --</option>
                        {pilihanNama?.map((item) => (
                            <option key={item.id} value={item.id}>{item.nama}</option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    disabled={processing || !data.peserta_id} 
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Tambahkan Peserta'}
                </button>
            </form>
        </div>
    );
}