import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { FieldKomponen, KomponenBiaya, KelompokBiaya } from './FieldKomponenTable';

interface FieldKomponenFormProps {
    selectedFieldKomponen: FieldKomponen | null;
    komponenBiaya: KomponenBiaya[];
    kelompokBiaya: KelompokBiaya[];
    onCancelEdit: () => void;
}

export const FieldKomponenForm: React.FC<FieldKomponenFormProps> = ({
    selectedFieldKomponen,
    komponenBiaya = [],
    kelompokBiaya = [],
    onCancelEdit,
}) => {
    const [selectedKelompokId, setSelectedKelompokId] = useState<string | number>('');

    const { data, setData, post, put, reset, processing, errors, clearErrors } = useForm({
        komponen_biaya_id: '' as string | number,
        label: '',
        field_name: '',
        input_type: 'text',
        pilihan: '',
        required: 1,
        urutan: 1,
        status: 'aktif',
    });

    // Sinkronisasi form saat selectedFieldKomponen berubah
    useEffect(() => {
        clearErrors();
        if (selectedFieldKomponen) {
            // Cari komponen induk untuk mengidentifikasi kelompok_biaya_id nya secara otomatis
            const targetKomponen = komponenBiaya.find(
                (k) => String(k.id) === String(selectedFieldKomponen.komponen_biaya_id)
            );

            if (targetKomponen && targetKomponen.kelompok_biaya_id) {
                setSelectedKelompokId(targetKomponen.kelompok_biaya_id);
            } else {
                setSelectedKelompokId('');
            }

            setData({
                komponen_biaya_id: selectedFieldKomponen.komponen_biaya_id.toString(),
                label: selectedFieldKomponen.label,
                field_name: selectedFieldKomponen.field_name,
                input_type: selectedFieldKomponen.input_type,
                pilihan: selectedFieldKomponen.pilihan || '',
                required: selectedFieldKomponen.required === true || selectedFieldKomponen.required === 1 ? 1 : 0,
                urutan: selectedFieldKomponen.urutan,
                status: selectedFieldKomponen.status,
            });
        } else {
            setSelectedKelompokId('');
            reset();
        }
    }, [selectedFieldKomponen]);

    // Filter list Komponen Biaya berdasarkan Kelompok Biaya yang dipilih
    const filteredKomponenBiaya = useMemo(() => {
        if (!selectedKelompokId) return [];
        return komponenBiaya.filter(
            (k) => String(k.kelompok_biaya_id) === String(selectedKelompokId)
        );
    }, [selectedKelompokId, komponenBiaya]);

    // Handler pergantian Kelompok Biaya
    const handleKelompokChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedKelompokId(val);
        setData('komponen_biaya_id', '');
    };

    // Auto-generate Field Name saat Label Form diketik
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const labelVal = e.target.value;
        const autoFieldName = labelVal
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_');

        setData((prev) => ({
            ...prev,
            label: labelVal,
            field_name: selectedFieldKomponen ? prev.field_name : autoFieldName,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedFieldKomponen) {
            put(route('master.field-komponen.update', selectedFieldKomponen.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.field-komponen.store'), {
                onSuccess: () => {
                    setSelectedKelompokId('');
                    reset();
                    clearErrors();
                },
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-5 sticky top-24">
            <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {selectedFieldKomponen ? 'Ubah Rincian Biaya' : 'Tambah Rincian Biaya'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedFieldKomponen
                        ? 'Ubah data struktur form rincian biaya ini.'
                        : 'Konfigurasi field input baru untuk komponen biaya tertentu.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Kelompok Biaya */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Kelompok Biaya <span className="text-rose-500">*</span>
                    </label>
                    <select
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                        value={selectedKelompokId}
                        onChange={handleKelompokChange}
                        required
                    >
                        <option value="">-- Pilih Kelompok Biaya --</option>
                        {kelompokBiaya.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Komponen Induk */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Komponen Induk <span className="text-rose-500">*</span>
                    </label>
                    <select
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer"
                        value={data.komponen_biaya_id}
                        onChange={(e) => setData('komponen_biaya_id', e.target.value)}
                        disabled={!selectedKelompokId}
                        required
                    >
                        <option value="" disabled>
                            {!selectedKelompokId
                                ? '-- Pilih Kelompok Biaya Dahulu --'
                                : '-- Pilih Komponen --'}
                        </option>
                        {filteredKomponenBiaya.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                    {errors.komponen_biaya_id && (
                        <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.komponen_biaya_id}</p>
                    )}
                </div>

                {/* Label Form */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Label Form <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        placeholder="Misal: Nama Hotel / Maskapai"
                        value={data.label}
                        onChange={handleLabelChange}
                        required
                    />
                    {errors.label && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.label}</p>}
                </div>

                {/* Field Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Field Name (Database) <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-mono font-medium text-slate-800"
                        placeholder="Contoh: nama_hotel"
                        value={data.field_name}
                        onChange={(e) => setData('field_name', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                        required
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Gunakan huruf kecil, spasi otomatis diubah ke underscore (_).</p>
                    {errors.field_name && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.field_name}</p>}
                </div>

                {/* Input Type */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Tipe Input <span className="text-rose-500">*</span>
                    </label>
                    <select
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                        value={data.input_type}
                        onChange={(e) => setData('input_type', e.target.value)}
                        required
                    >
                        <option value="text">Teks Pendek (Text)</option>
                        <option value="number">Angka / Rupiah (Number)</option>
                        <option value="date">Tanggal (Date)</option>
                        <option value="select">Dropdown (Select)</option>
                    </select>
                </div>

                {/* Pilihan (Khusus Select) */}
                {data.input_type === 'select' && (
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Opsi Pilihan <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            placeholder="Cth: Bintang 3, Bintang 4, Bintang 5 (Pisahkan dengan koma)"
                            rows={3}
                            value={data.pilihan || ''}
                            onChange={(e) => setData('pilihan', e.target.value)}
                            required
                        ></textarea>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    {/* Urutan */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Urutan Tampil <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.urutan}
                            onChange={(e) => setData('urutan', Number(e.target.value))}
                            required
                        />
                    </div>

                    {/* Required (Wajib/Opsional) */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Validasi Data <span className="text-rose-500">*</span>
                        </label>
                        <select
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                            value={data.required}
                            onChange={(e) => setData('required', Number(e.target.value))}
                        >
                            <option value={1}>Wajib Diisi</option>
                            <option value={0}>Opsional</option>
                        </select>
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-3 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {processing
                            ? 'Menyimpan...'
                            : selectedFieldKomponen
                            ? 'Simpan Perubahan'
                            : 'Tambah Rincian'}
                    </button>

                    {selectedFieldKomponen && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};