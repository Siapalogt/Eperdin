import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { DewanItem } from './DewanTable';

interface DewanFormProps {
    selectedDewan: DewanItem | null;
    onCancelEdit: () => void;
}

export const DewanForm: React.FC<DewanFormProps> = ({ selectedDewan, onCancelEdit }) => {
    const { data, setData, post, put, reset, errors, processing, clearErrors } = useForm({
        nama: '',
        jabatan: '',
        fraksi: '',
        komisi: '',
        no_hp: '',
        email: '',
        status: 'Aktif',
    });

    // Isi/reset form setiap kali selectedDewan berubah
    useEffect(() => {
        clearErrors();
        if (selectedDewan) {
            setData({
                nama: selectedDewan.nama,
                jabatan: selectedDewan.jabatan,
                fraksi: selectedDewan.fraksi,
                komisi: selectedDewan.komisi || '',
                no_hp: selectedDewan.no_hp || '',
                email: selectedDewan.email || '',
                status: selectedDewan.status,
            });
        } else {
            reset();
        }
    }, [selectedDewan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedDewan) {
            put(route('master.dewan.update', selectedDewan.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.dewan.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-5">
            <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {selectedDewan ? 'Ubah Data Anggota' : 'Tambah Anggota Baru'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedDewan
                        ? 'Perbarui rincian informasi anggota dewan terpilih.'
                        : 'Isi formulir untuk menambahkan anggota dewan baru.'}
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
                        placeholder="Contoh: Drs. H. Ahmad Dahlan, M.Si"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                    {errors.nama && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.nama}</p>}
                </div>

                {/* Jabatan */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Jabatan DPRD <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Contoh: Ketua Komisi A / Anggota"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.jabatan}
                        onChange={(e) => setData('jabatan', e.target.value)}
                    />
                    {errors.jabatan && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.jabatan}</p>}
                </div>

                {/* Fraksi & Komisi */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Fraksi <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: F-PDIP"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.fraksi}
                            onChange={(e) => setData('fraksi', e.target.value)}
                        />
                        {errors.fraksi && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.fraksi}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Komisi
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Komisi A"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.komisi}
                            onChange={(e) => setData('komisi', e.target.value)}
                        />
                    </div>
                </div>

                {/* No HP & Status */}
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
                            Status
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

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Resmi
                    </label>
                    <input
                        type="email"
                        placeholder="anggota@dprd.go.id"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.email}</p>}
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
                            : selectedDewan
                            ? 'Simpan Perubahan'
                            : 'Tambah Anggota'}
                    </button>

                    {selectedDewan && (
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