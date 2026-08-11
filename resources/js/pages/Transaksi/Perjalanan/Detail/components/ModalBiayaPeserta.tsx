import React, { useState, useEffect, useMemo } from 'react';
import { useForm, router } from '@inertiajs/react';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    activePeserta: any;
    listKomponen: any[];
    kelompokBiaya?: any[];
    formatRp: (angka: number) => string;
}

export default function ModalBiayaPeserta({ 
    isOpen, 
    onClose, 
    activePeserta, 
    listKomponen = [], 
    kelompokBiaya = [],
    formatRp 
}: Props) {
    const [selectedKelompokId, setSelectedKelompokId] = useState<string | number>('');
    const [dynamicFields, setDynamicFields] = useState<any[]>([]);

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        komponen_biaya_id: '',
        qty: 1,
        satuan: 'unit',
        harga_satuan: 0,
        total: 0,
        keterangan: '',
        detail_json: {} as Record<string, any>
    });

    const availableKelompok = useMemo(() => {
        if (kelompokBiaya && kelompokBiaya.length > 0) return kelompokBiaya;
        const map = new Map();
        listKomponen.forEach((k) => {
            const kel = k.kelompok_biaya || k.kelompokBiaya;
            if (kel) map.set(kel.id, kel);
        });
        return Array.from(map.values());
    }, [listKomponen, kelompokBiaya]);

    const filteredKomponen = useMemo(() => {
        if (!selectedKelompokId) return [];
        return listKomponen.filter((k) => {
            const kelompokId = k.kelompok_biaya_id || k.kelompok_biaya?.id || k.kelompokBiaya?.id;
            return String(kelompokId) === String(selectedKelompokId);
        });
    }, [selectedKelompokId, listKomponen]);

    useEffect(() => {
        setData('total', data.qty * data.harga_satuan);
    }, [data.qty, data.harga_satuan]);

    if (!isOpen || !activePeserta) return null;

    const handleKelompokChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedKelompokId(e.target.value);
        setData('komponen_biaya_id', '');
        setData('detail_json', {});
        setDynamicFields([]);
        clearErrors();
    };

    const handleKomponenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setData('komponen_biaya_id', selectedId);
        setData('detail_json', {}); 

        const selectedKomponen = listKomponen?.find((k) => String(k.id) === String(selectedId));
        const fields = selectedKomponen?.field_komponen || selectedKomponen?.fieldKomponen || [];
        setDynamicFields(fields);
    };

    const handleDynamicFieldChange = (fieldName: string, value: any) => {
        setData('detail_json', { ...data.detail_json, [fieldName]: value });
    };

    const handleHargaSatuanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setData('harga_satuan', rawValue ? Number(rawValue) : 0);
    };

    const handleTambahBiaya = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/peserta/${activePeserta.id}/biaya`, {
            preserveScroll: true,
            onSuccess: () => {
                reset(); 
                setSelectedKelompokId('');
                setDynamicFields([]);
            }
        });
    };

    const handleDeleteBiaya = (biayaId: number) => {
        if(confirm('Hapus rincian biaya ini?')) {
            router.delete(`/peserta/biaya/${biayaId}`, {
                preserveScroll: true,
            });
        }
    };

    // Fungsi Pembantu UX: Merapikan label snake_case menjadi Capital Case
    const formatLabel = (str: string) => {
        if (!str) return '';
        return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* MODAL HEADER */}
                <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-black text-lg text-slate-800">
                            Rincian Anggaran: {activePeserta.detail_peserta?.nama}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {activePeserta.detail_peserta?.jabatan || '-'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-rose-500 hover:text-white transition font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* MODAL BODY */}
                <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
                    
                    {/* KIRI: FORM TAMBAH ITEM */}
                    <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
                        <h4 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3 mb-4">Tambah Item Biaya</h4>
                        
                        <form onSubmit={handleTambahBiaya} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Kelompok Biaya <span className="text-rose-500">*</span></label>
                                <select 
                                    className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50" 
                                    value={selectedKelompokId} 
                                    onChange={handleKelompokChange}
                                    required
                                >
                                    <option value="">-- Pilih Kelompok --</option>
                                    {availableKelompok.map((kel) => (
                                        <option key={kel.id} value={kel.id}>{kel.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Komponen Biaya <span className="text-rose-500">*</span></label>
                                <select 
                                    className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50 disabled:bg-slate-100" 
                                    value={data.komponen_biaya_id} 
                                    onChange={handleKomponenChange}
                                    disabled={!selectedKelompokId || filteredKomponen.length === 0}
                                    required
                                >
                                    <option value="" disabled>
                                        {!selectedKelompokId ? '-- Pilih Kelompok Dahulu --' : '-- Pilih Komponen --'}
                                    </option>
                                    {filteredKomponen.map((k) => (
                                        <option key={k.id} value={k.id}>{k.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Qty</label>
                                    <input 
                                        type="number" min="1" 
                                        className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800" 
                                        value={data.qty} 
                                        onChange={(e) => setData('qty', Number(e.target.value))} required 
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tarif Satuan (Rp)</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800" 
                                        value={data.harga_satuan === 0 ? '' : data.harga_satuan.toLocaleString('id-ID')} 
                                        onChange={handleHargaSatuanChange} placeholder="0" required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Satuan</label>
                                <input 
                                    type="text" placeholder="Misal: unit, hari, malam" 
                                    className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50" 
                                    value={data.satuan} 
                                    onChange={(e) => setData('satuan', e.target.value)} 
                                />
                            </div>

                            {/* UX FIX: Ubah Input menjadi Textarea agar lebih enak diketik */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Keterangan (Opsional)</label>
                                <textarea 
                                    rows={2}
                                    placeholder="Misal: Sesuai bill hotel / tiket pesawat" 
                                    className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50 resize-none" 
                                    value={data.keterangan} 
                                    onChange={(e) => setData('keterangan', e.target.value)} 
                                />
                            </div>

                            {/* Render Dynamic Fields */}
                            {dynamicFields.length > 0 && (
                                <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl space-y-3 mt-4">
                                    <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-wider border-b border-indigo-200/50 pb-2 mb-2">Input Rincian Lanjutan</h5>
                                    
                                    {dynamicFields.map((field: any) => {
                                        const isReq = field.required === true || field.required === 1 || field.is_required === true || field.is_required === 1;
                                        // Format label menjadi Title Case
                                        const labelText = field.label_field || formatLabel(field.field_name);

                                        return (
                                            <div key={field.id}>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                                                    {labelText} {isReq && <span className="text-rose-500">*</span>}
                                                </label>
                                                
                                                {/* UX FIX: Render Select / Dropdown jika tipenya select */}
                                                {field.input_type === 'select' ? (
                                                    <select
                                                        onChange={(e) => handleDynamicFieldChange(field.field_name, e.target.value)}
                                                        value={data.detail_json[field.field_name] || ''}
                                                        className="w-full border border-indigo-200 px-3 py-2 text-xs rounded-lg bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                                        required={isReq}
                                                    >
                                                        <option value="">-- Pilih {labelText} --</option>
                                                        {field.pilihan?.split(',').map((opsi: string, idx: number) => (
                                                            <option key={idx} value={opsi.trim()}>{opsi.trim()}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.input_type || 'text'}
                                                        onChange={(e) => handleDynamicFieldChange(field.field_name, e.target.value)}
                                                        value={data.detail_json[field.field_name] || ''}
                                                        className="w-full border border-indigo-200 px-3 py-2 text-xs rounded-lg bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                                        required={isReq}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-100 mt-4 space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kalkulasi:</span>
                                    <span className="text-sm font-black text-indigo-700">{formatRp(data.total)}</span>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={processing || !data.komponen_biaya_id || data.total === 0} 
                                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan Data...' : 'Simpan Rincian'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* KANAN: TABEL HASIL USULAN */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="font-bold text-sm text-slate-800">Daftar Anggaran yang Diusulkan</h4>
                        
                        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <table className="min-w-full divide-y divide-slate-200 text-xs">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">Item Komponen</th>
                                        <th className="px-5 py-3.5 text-center font-bold text-slate-500 uppercase tracking-wider">Vol</th>
                                        <th className="px-5 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">Tarif (Rp)</th>
                                        <th className="px-5 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">Total (Rp)</th>
                                        <th className="px-5 py-3.5 w-10 text-center font-bold text-slate-500 uppercase tracking-wider">Aksi</th> 
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {activePeserta.biaya && activePeserta.biaya.length > 0 ? (
                                        activePeserta.biaya.map((b: any) => (
                                            <tr key={b.id} className="hover:bg-slate-50/80 transition group">
                                                <td className="px-5 py-3">
                                                    <div className="font-bold text-slate-800 text-sm">{b.komponen_biaya?.nama}</div>
                                                    {b.keterangan && <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{b.keterangan}</div>}
                                                </td>
                                                <td className="px-5 py-3 text-center text-slate-600 font-semibold">
                                                    {b.qty ?? b.jumlah} {b.satuan || ''}
                                                </td>
                                                <td className="px-5 py-3 text-right text-slate-600 font-medium">
                                                    {formatRp(b.harga_satuan)}
                                                </td>
                                                <td className="px-5 py-3 text-right font-black text-indigo-700">
                                                    {formatRp(b.total)}
                                                </td>
                                                <td className="px-5 py-3 text-center">
                                                    {/* UX FIX: Tombol hapus sekarang permanen terlihat dengan warna abu-abu (bg-slate-100) dan berubah merah saat hover */}
                                                    <button 
                                                        onClick={() => handleDeleteBiaya(b.id)}
                                                        className="text-slate-400 bg-slate-100 hover:text-rose-600 hover:bg-rose-100 transition p-1.5 rounded-lg inline-flex items-center justify-center"
                                                        title="Hapus rincian ini"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-10 text-center text-slate-400 italic font-medium">
                                                Belum ada komponen biaya yang ditambahkan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {activePeserta.biaya && activePeserta.biaya.length > 0 && (
                                    <tfoot className="bg-slate-800 text-white">
                                        <tr>
                                            <td colSpan={3} className="px-5 py-3.5 text-right font-black text-xs uppercase tracking-widest">
                                                Total Keseluruhan:
                                            </td>
                                            <td colSpan={2} className="px-5 py-3.5 text-right font-black text-sm text-emerald-400">
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
    );
}