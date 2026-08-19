import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    perjalananId: number;
    editingData?: any | null; // Menerima data jika dalam mode edit
    listKomponen: any[];
    kelompokBiaya?: any[];
    listSatuan?: any[];
    formatRp: (angka: number) => string;
}

export default function ModalBiayaBersama({
    isOpen,
    onClose,
    perjalananId,
    editingData = null,
    listKomponen = [],
    kelompokBiaya = [],
    listSatuan = [],
    formatRp,
}: Props) {
    const [selectedKelompokId, setSelectedKelompokId] = useState<string | number>('');
    const [dynamicFields, setDynamicFields] = useState<any[]>([]);

    const { data, setData, post, put, processing, reset, clearErrors } = useForm({
        komponen_biaya_id: '',
        qty: 1,
        satuan: '',
        harga_satuan: 0,
        total: 0,
        keterangan: '',
        detail_json: {} as Record<string, any>,
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

    // Efek saat Modal Dibuka (Mode Tambah vs Mode Edit)
    useEffect(() => {
        if (isOpen) {
            if (editingData) {
                // Mode Edit: Isi form dengan data yang dipilih
                const komponen = listKomponen.find((k) => String(k.id) === String(editingData.komponen_biaya_id));
                const kelompokId = komponen?.kelompok_biaya_id || komponen?.kelompok_biaya?.id || '';
                setSelectedKelompokId(kelompokId);

                const fields = komponen?.field_komponen || komponen?.fieldKomponen || [];
                setDynamicFields(fields);

                setData({
                    komponen_biaya_id: String(editingData.komponen_biaya_id),
                    qty: editingData.qty ?? 1,
                    satuan: editingData.satuan || '',
                    harga_satuan: Number(editingData.harga_satuan) || 0,
                    total: Number(editingData.total) || 0,
                    keterangan: editingData.keterangan || '',
                    detail_json: editingData.detail_json || {},
                });
            } else {
                // Mode Tambah: Reset form kosong
                reset();
                setSelectedKelompokId('');
                setDynamicFields([]);
                clearErrors();
            }
        }
    }, [isOpen, editingData]);

    // Kalkulasi Total Otomatis
    useEffect(() => {
        setData('total', data.qty * data.harga_satuan);
    }, [data.qty, data.harga_satuan]);

    if (!isOpen) return null;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingData) {
            put(`/perjalanan/biaya-bersama/${editingData.id}`, {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            post(`/perjalanan/${perjalananId}/biaya-bersama`, {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    const formatLabel = (str: string) => {
        if (!str) return '';
        return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* HEADER MODAL */}
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-base text-slate-800">
                            {editingData ? '✏️ Edit Biaya Bersama' : '+ Tambah Biaya Bersama'}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                            Pengeluaran rombongan / kolektif perjalanan dinas
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-rose-500 hover:text-white transition font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* FORM BODY */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Kelompok Biaya <span className="text-rose-500">*</span>
                        </label>
                        <select
                            className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50"
                            value={selectedKelompokId}
                            onChange={handleKelompokChange}
                            required
                        >
                            <option value="">-- Pilih Kelompok --</option>
                            {availableKelompok.map((kel) => (
                                <option key={kel.id} value={kel.id}>
                                    {kel.nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Komponen Biaya <span className="text-rose-500">*</span>
                        </label>
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
                                <option key={k.id} value={k.id}>
                                    {k.nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Qty / Vol</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800"
                                value={data.qty}
                                onChange={(e) => setData('qty', Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tarif Satuan (Rp)</label>
                            <input
                                type="text"
                                className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800"
                                value={data.harga_satuan === 0 ? '' : data.harga_satuan.toLocaleString('id-ID')}
                                onChange={handleHargaSatuanChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Satuan <span className="text-rose-500">*</span>
                        </label>
                        <select
                            className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50 cursor-pointer"
                            value={data.satuan}
                            onChange={(e) => setData('satuan', e.target.value)}
                            required
                        >
                            <option value="" disabled>-- Pilih Satuan --</option>
                            {listSatuan.map((sat: any) => (
                                <option key={sat.id} value={sat.nama}>
                                    {sat.nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Keterangan (Opsional)</label>
                        <textarea
                            rows={2}
                            placeholder="Misal: Sewa Bus Pariwisata 45 Seat / Sewa Hall"
                            className="w-full border border-slate-300 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 bg-slate-50/50 resize-none"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {dynamicFields.length > 0 && (
                        <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl space-y-3">
                            <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-wider border-b border-indigo-200/50 pb-2 mb-2">
                                Input Rincian Lanjutan
                            </h5>
                            {dynamicFields.map((field: any) => {
                                const isReq = field.required === true || field.required === 1 || field.is_required === true || field.is_required === 1;
                                const labelText = field.label_field || formatLabel(field.field_name);

                                return (
                                    <div key={field.id}>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                                            {labelText} {isReq && <span className="text-rose-500">*</span>}
                                        </label>
                                        {field.input_type === 'select' ? (
                                            <select
                                                onChange={(e) => handleDynamicFieldChange(field.field_name, e.target.value)}
                                                value={data.detail_json[field.field_name] || ''}
                                                className="w-full border border-indigo-200 px-3 py-2 text-xs rounded-lg bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                                required={isReq}
                                            >
                                                <option value="">-- Pilih {labelText} --</option>
                                                {field.pilihan?.split(',').map((opsi: string, idx: number) => (
                                                    <option key={idx} value={opsi.trim()}>
                                                        {opsi.trim()}
                                                    </option>
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

                    {/* FOOTER ACTIONS */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kalkulasi:</span>
                            <span className="text-sm font-black text-indigo-700">{formatRp(data.total)}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing || !data.komponen_biaya_id || data.total === 0}
                                className="w-2/3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : editingData ? 'Simpan Perubahan' : 'Simpan Biaya'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}