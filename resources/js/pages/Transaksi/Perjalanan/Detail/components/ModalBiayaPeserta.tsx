import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    activePeserta: any;
    listKomponen: any[];
    kelompokBiaya?: any[]; // Prop disamakan nama menjadi 'kelompokBiaya'
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
    // 1. State lokal untuk Cascading Dropdown
    const [selectedKelompokId, setSelectedKelompokId] = useState<string | number>('');
    const [dynamicFields, setDynamicFields] = useState<any[]>([]);

    // 2. Inertia Form State
    const { data, setData, post, processing, reset } = useForm({
        komponen_biaya_id: '',
        qty: 1,
        satuan: 'unit',
        harga_satuan: 0,
        total: 0,
        keterangan: '',
        detail_json: {} as Record<string, any> // Wadah simpan inputan dinamis
    });

    // 3. Ekstraksi / Penggunaan Kelompok Biaya
    const availableKelompok = useMemo(() => {
        if (kelompokBiaya && kelompokBiaya.length > 0) {
            return kelompokBiaya;
        }
        
        // Fallback: Ekstraksi unique kelompok dari listKomponen jika prop kelompokBiaya kosong
        const map = new Map();
        listKomponen.forEach((k) => {
            const kel = k.kelompok_biaya || k.kelompokBiaya;
            if (kel) {
                map.set(kel.id, kel);
            }
        });
        return Array.from(map.values());
    }, [listKomponen, kelompokBiaya]);

    // 4. Filter list Komponen Biaya berdasarkan Kelompok yang dipilih
    const filteredKomponen = useMemo(() => {
        if (!selectedKelompokId) return [];
        return listKomponen.filter((k) => {
            const kelompokId = k.kelompok_biaya_id || k.kelompok_biaya?.id || k.kelompokBiaya?.id;
            return String(kelompokId) === String(selectedKelompokId);
        });
    }, [selectedKelompokId, listKomponen]);

    // 5. Auto-Kalkulasi Total (Qty * Harga Satuan)
    useEffect(() => {
        setData('total', data.qty * data.harga_satuan);
    }, [data.qty, data.harga_satuan]);

    if (!isOpen || !activePeserta) return null;

    // Handler saat Kelompok Biaya berganti
    const handleKelompokChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedKelompokId(val);
        
        // Reset pilihan komponen dan field dinamis
        setData('komponen_biaya_id', '');
        setData('detail_json', {});
        setDynamicFields([]);
    };

    // Handler saat Komponen Biaya berganti
    const handleKomponenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setData('komponen_biaya_id', selectedId);
        setData('detail_json', {});

        const selectedKomponen = listKomponen?.find((k) => String(k.id) === String(selectedId));
        
        // Ambil field_komponen sesuai nama relasi di Model KomponenBiaya.php
        const fields = selectedKomponen?.field_komponen || selectedKomponen?.fieldKomponen || [];
        setDynamicFields(fields);
    };

    // Handler untuk update inputan dinamis ke detail_json
    const handleDynamicFieldChange = (fieldName: string, value: any) => {
        setData('detail_json', {
            ...data.detail_json,
            [fieldName]: value
        });
    };

    // Handler Tarif Satuan dengan Format Ribuan
    const handleHargaSatuanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        const numberValue = rawValue ? Number(rawValue) : 0;
        setData('harga_satuan', numberValue);
    };

    // Submit Handler
    const handleTambahBiaya = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/peserta/${activePeserta.id}/biaya`, {
            onSuccess: () => {
                reset(); 
                setSelectedKelompokId('');
                setDynamicFields([]);
                onClose();
            }
        });
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
                <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                    
                    {/* FORM KIRI: INPUT ITEM BIAYA */}
                    <div className="lg:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-200 h-fit space-y-4">
                        <h4 className="font-bold text-sm text-slate-700 border-b pb-2">Tambah Item Biaya</h4>
                        
                        <form onSubmit={handleTambahBiaya} className="space-y-4">
                            
                            {/* STEP 1: Pilih Kelompok Biaya */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Kelompok Biaya <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    className="w-full border border-slate-300 p-2 text-xs rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                    value={selectedKelompokId} 
                                    onChange={handleKelompokChange}
                                    required
                                >
                                    <option value="">-- Pilih Kelompok Biaya --</option>
                                    {availableKelompok.map((kel) => (
                                        <option key={kel.id} value={kel.id}>
                                            {kel.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* STEP 2: Pilih Komponen Induk (Filtered) */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Komponen Biaya <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    className="w-full border border-slate-300 p-2 text-xs rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed" 
                                    value={data.komponen_biaya_id} 
                                    onChange={handleKomponenChange}
                                    disabled={!selectedKelompokId || filteredKomponen.length === 0}
                                    required
                                >
                                    <option value="" disabled>
                                        {!selectedKelompokId 
                                            ? '-- Pilih Kelompok Dahulu --' 
                                            : filteredKomponen.length === 0 
                                                ? '-- Belum ada komponen pada kelompok ini --' 
                                                : '-- Pilih Komponen --'}
                                    </option>
                                    {filteredKomponen.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* STEP 3: Qty & Tarif Satuan */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-1">
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Qty</label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        className="w-full border border-slate-300 p-2 text-xs rounded-lg focus:outline-none focus:border-blue-600" 
                                        value={data.qty} 
                                        onChange={(e) => setData('qty', Number(e.target.value))} 
                                        required 
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tarif Satuan (Rp)</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-slate-300 p-2 text-xs rounded-lg focus:outline-none focus:border-blue-600" 
                                        value={data.harga_satuan === 0 ? '' : data.harga_satuan.toLocaleString('id-ID')} 
                                        onChange={handleHargaSatuanChange} 
                                        placeholder="0"
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Satuan & Keterangan */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Satuan</label>
                                <input 
                                    type="text" 
                                    placeholder="Misal: unit, hari, malam" 
                                    className="w-full border border-slate-300 p-2 text-xs rounded-lg focus:outline-none focus:border-blue-600" 
                                    value={data.satuan} 
                                    onChange={(e) => setData('satuan', e.target.value)} 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan (Opsional)</label>
                                <input 
                                    type="text" 
                                    placeholder="Misal: Sesuai bill hotel / tiket" 
                                    className="w-full border border-slate-300 p-2 text-xs rounded-lg focus:outline-none focus:border-blue-600" 
                                    value={data.keterangan} 
                                    onChange={(e) => setData('keterangan', e.target.value)} 
                                />
                            </div>

                            {/* STEP 4: RENDER DYNAMIC FIELDS (DARI MASTER RINCIAN BIAYA) */}
                            {dynamicFields.length > 0 && (
                                <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-xl space-y-3 mt-4">
                                    <div className="flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                                        <h5 className="text-xs font-extrabold text-blue-700">Rincian Lanjutan Field</h5>
                                        <span className="text-[10px] bg-blue-200 text-blue-800 font-bold px-1.5 py-0.5 rounded">Dinamis</span>
                                    </div>

                                    {dynamicFields.map((field: any) => {
                                        const fieldLabel = field.label || field.label_field || field.field_name;
                                        const isReq = field.required === true || field.required === 1 || field.is_required === true || field.is_required === 1;

                                        return (
                                            <div key={field.id}>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                    {fieldLabel} {isReq && <span className="text-rose-500">*</span>}
                                                </label>

                                                {/* Input Text, Number, Date */}
                                                {['text', 'number', 'date'].includes(field.input_type) && (
                                                    <input
                                                        type={field.input_type}
                                                        onChange={(e) => handleDynamicFieldChange(field.field_name, e.target.value)}
                                                        value={data.detail_json[field.field_name] || ''}
                                                        className="w-full border border-slate-200 p-2 text-xs rounded-lg bg-white focus:outline-none focus:border-blue-600"
                                                        required={isReq}
                                                    />
                                                )}

                                                {/* Input Select */}
                                                {field.input_type === 'select' && (
                                                    <select
                                                        onChange={(e) => handleDynamicFieldChange(field.field_name, e.target.value)}
                                                        value={data.detail_json[field.field_name] || ''}
                                                        className="w-full border border-slate-200 p-2 text-xs rounded-lg bg-white focus:outline-none focus:border-blue-600"
                                                        required={isReq}
                                                    >
                                                        <option value="">-- Pilih {fieldLabel} --</option>
                                                        {field.pilihan?.split(',').map((opsi: string, idx: number) => (
                                                            <option key={idx} value={opsi.trim()}>{opsi.trim()}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* KALKULASI & TOMBOL SUBMIT */}
                            <div className="pt-2 border-t border-slate-200 mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-500">Kalkulasi Total:</span>
                                    <span className="text-sm font-black text-indigo-700">{formatRp(data.total)}</span>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing || !data.komponen_biaya_id || data.total === 0} 
                                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Rincian'}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* TABEL KANAN: DAFTAR ANGGARAN TERUSULKAN */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="font-bold text-sm text-slate-700">Daftar Anggaran yang Diusulkan</h4>
                        
                        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <table className="min-w-full divide-y divide-slate-200 text-xs">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="px-4 py-2.5 text-left font-bold text-slate-600">Item Komponen</th>
                                        <th className="px-4 py-2.5 text-center font-bold text-slate-600">Vol</th>
                                        <th className="px-4 py-2.5 text-right font-bold text-slate-600">Tarif (Rp)</th>
                                        <th className="px-4 py-2.5 text-right font-bold text-slate-600">Total (Rp)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {activePeserta.biaya && activePeserta.biaya.length > 0 ? (
                                        activePeserta.biaya.map((b: any) => (
                                            <tr key={b.id} className="hover:bg-slate-50/80 transition">
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-800">{b.komponen_biaya?.nama}</div>
                                                    {b.keterangan && (
                                                        <div className="text-[10px] text-slate-400 mt-0.5">{b.keterangan}</div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center text-slate-600 font-medium">
                                                    {b.qty ?? b.jumlah} {b.satuan || ''}
                                                </td>
                                                <td className="px-4 py-3 text-right text-slate-600 font-medium">
                                                    {formatRp(b.harga_satuan)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-black text-indigo-700">
                                                    {formatRp(b.total)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">
                                                Belum ada komponen biaya yang ditambahkan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {activePeserta.biaya && activePeserta.biaya.length > 0 && (
                                    <tfoot className="bg-slate-800 text-white">
                                        <tr>
                                            <td colSpan={3} className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wider">
                                                TOTAL KESELURUHAN:
                                            </td>
                                            <td className="px-4 py-3 text-right font-black text-sm text-emerald-400">
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