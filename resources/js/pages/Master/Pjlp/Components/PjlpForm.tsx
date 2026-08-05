import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { PjlpItem } from './PjlpTable';

interface PjlpFormProps {
    selectedPjlp: PjlpItem | null;
    onCancelEdit: () => void;
}

export const PjlpForm: React.FC<PjlpFormProps> = ({ selectedPjlp, onCancelEdit }) => {
    const { data, setData, post, put, reset, errors, processing, clearErrors } = useForm({
        nama: '',
        bagian: '',
        jabatan: '',
        no_hp: '',
        status: 'Aktif',
    });

    useEffect(() => {
        clearErrors();
        if (selectedPjlp) {
            setData({
                nama: selectedPjlp.nama,
                bagian: selectedPjlp.bagian,
                jabatan: selectedPjlp.jabatan,
                no_hp: selectedPjlp.no_hp || '',
                status: selectedPjlp.status,
            });
        } else {
            reset();
        }
    }, [selectedPjlp]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPjlp) {
            put(route('master.pjlp.update', selectedPjlp.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.pjlp.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-5 sticky top-24">
            <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {selectedPjlp ? 'Ubah Data PJLP' : 'Tambah PJLP Baru'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedPjlp
                        ? 'Isi formulir untuk memperbarui data PJLP.'
                        : 'Tambahkan personel PJLP baru ke database master.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Lengkap */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Nama lengkap pegawai"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                    {errors.nama && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.nama}</p>}
                </div>

                {/* Bagian Kerja */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Bagian Kerja <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Contoh: Bagian Keuangan, Protokol"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.bagian}
                        onChange={(e) => setData('bagian', e.target.value)}
                    />
                    {errors.bagian && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.bagian}</p>}
                </div>

                {/* Jabatan Kerja */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Jabatan Kerja <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Contoh: Pengemudi, Staf Administrasi"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.jabatan}
                        onChange={(e) => setData('jabatan', e.target.value)}
                    />
                    {errors.jabatan && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.jabatan}</p>}
                </div>

                {/* Nomor HP & Status Keaktifan */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Nomor HP
                        </label>
                        <input
                            type="text"
                            placeholder="0812xxxx"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.no_hp}
                            onChange={(e) => setData('no_hp', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Status Keaktifan
                        </label>
                        <select
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800 cursor-pointer"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
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
                            : selectedPjlp
                            ? 'Simpan Perubahan'
                            : 'Tambah PJLP'}
                    </button>

                    {selectedPjlp && (
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