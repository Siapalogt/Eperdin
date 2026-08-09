import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { KomponenItem, KelompokItem } from './KomponenBiayaTable';

interface KomponenBiayaFormProps {
    selectedKomponen: KomponenItem | null;
    listKelompok: KelompokItem[];
    onCancelEdit: () => void;
}

export const KomponenBiayaForm: React.FC<KomponenBiayaFormProps> = ({
    selectedKomponen,
    listKelompok = [],
    onCancelEdit,
}) => {
    const { data, setData, post, put, reset, processing, errors, clearErrors } = useForm({
        kelompok_biaya_id: '',
        nama: '',
    });

    useEffect(() => {
        clearErrors();
        if (selectedKomponen) {
            setData({
                kelompok_biaya_id: selectedKomponen.kelompok_biaya_id.toString(),
                nama: selectedKomponen.nama,
            });
        } else {
            reset();
        }
    }, [selectedKomponen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedKomponen) {
            put(route('master.komponen-biaya.update', selectedKomponen.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.komponen-biaya.store'), {
                onSuccess: () => {
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
                    {selectedKomponen ? 'Ubah Komponen' : 'Tambah Komponen'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedKomponen
                        ? 'Ubah rincian informasi komponen biaya terpilih.'
                        : 'Pilih grup induk terlebih dahulu sebelum menginputkan nama komponen.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Dropdown Kelompok Biaya */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Grup Kelompok Induk <span className="text-rose-500">*</span>
                    </label>
                    <select
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                        value={data.kelompok_biaya_id}
                        onChange={(e) => setData('kelompok_biaya_id', e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Pilih Kelompok Biaya --
                        </option>
                        {listKelompok.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                    {errors.kelompok_biaya_id && (
                        <p className="text-rose-500 text-[11px] mt-1 font-semibold">
                            {errors.kelompok_biaya_id}
                        </p>
                    )}
                </div>

                {/* Input Nama Komponen */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama Komponen <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Misal: Tiket Kereta Eksekutif"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                    {errors.nama && (
                        <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.nama}</p>
                    )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex space-x-2 pt-3 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {processing
                            ? 'Menyimpan...'
                            : selectedKomponen
                            ? 'Simpan Perubahan'
                            : 'Tambah Data'}
                    </button>

                    {selectedKomponen && (
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