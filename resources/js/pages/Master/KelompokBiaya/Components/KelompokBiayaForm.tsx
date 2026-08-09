import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { KelompokItem } from './KelompokBiayaTable';

interface KelompokBiayaFormProps {
    selectedKelompok: KelompokItem | null;
    onCancelEdit: () => void;
}

export const KelompokBiayaForm: React.FC<KelompokBiayaFormProps> = ({
    selectedKelompok,
    onCancelEdit,
}) => {
    const { data, setData, post, put, reset, processing, errors, clearErrors } = useForm({
        nama: '',
    });

    useEffect(() => {
        clearErrors();
        if (selectedKelompok) {
            setData('nama', selectedKelompok.nama);
        } else {
            reset();
        }
    }, [selectedKelompok]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedKelompok) {
            put(route('master.kelompok-biaya.update', selectedKelompok.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.kelompok-biaya.store'), {
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
                    {selectedKelompok ? 'Ubah Kelompok Biaya' : 'Tambah Kelompok Biaya'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedKelompok
                        ? 'Ubah nama kategori pengelompokan yang sudah ada.'
                        : 'Masukkan nama kategori pengelompokan baru.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Kelompok */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama Kelompok <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Contoh: Biaya Transportasi"
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
                            : selectedKelompok
                            ? 'Simpan Perubahan'
                            : 'Tambah Data'}
                    </button>

                    {selectedKelompok && (
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