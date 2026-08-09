import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { AsnItem } from './AsnTable';

interface AsnFormProps {
    selectedAsn: AsnItem | null;
    onCancelEdit: () => void;
}

export const AsnForm: React.FC<AsnFormProps> = ({ selectedAsn, onCancelEdit }) => {
    const { data, setData, post, put, reset, errors, processing, clearErrors } = useForm({
        nip: '',
        nama: '',
        jabatan: '',
        golongan: '',
        unit_kerja: 'Sekretariat DPRD',
        no_hp: '',
        email: '',
        status: 'Aktif',
    });

    useEffect(() => {
        clearErrors();
        if (selectedAsn) {
            setData({
                nip: selectedAsn.nip,
                nama: selectedAsn.nama,
                jabatan: selectedAsn.jabatan,
                golongan: selectedAsn.golongan || '',
                unit_kerja: selectedAsn.unit_kerja || 'Sekretariat DPRD',
                no_hp: selectedAsn.no_hp || '',
                email: selectedAsn.email || '',
                status: selectedAsn.status,
            });
        } else {
            reset();
        }
    }, [selectedAsn]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAsn) {
            put(route('master.asn.update', selectedAsn.id), {
                onSuccess: () => {
                    onCancelEdit();
                    reset();
                },
            });
        } else {
            post(route('master.asn.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-5">
            <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {selectedAsn ? 'Ubah Data ASN' : 'Tambah ASN Baru'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                    {selectedAsn
                        ? 'Isi formulir untuk memperbarui data pegawai.'
                        : 'Tambahkan pegawai baru ke database master.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NIP Pegawai */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        NIP Pegawai <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Masukkan NIP"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                    />
                    {errors.nip && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.nip}</p>}
                </div>

                {/* Nama Lengkap */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Nama lengkap beserta gelar"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                    {errors.nama && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.nama}</p>}
                </div>

                {/* Golongan & Status Keaktifan */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Golongan
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: IV/c"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.golongan}
                            onChange={(e) => setData('golongan', e.target.value)}
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

                {/* Jabatan */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Jabatan <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Jabatan struktural/fungsional"
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.jabatan}
                        onChange={(e) => setData('jabatan', e.target.value)}
                    />
                    {errors.jabatan && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.jabatan}</p>}
                </div>

                {/* Unit Kerja */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Unit Kerja <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                        value={data.unit_kerja}
                        onChange={(e) => setData('unit_kerja', e.target.value)}
                    />
                    {errors.unit_kerja && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.unit_kerja}</p>}
                </div>

                {/* No HP & Email */}
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
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="pegawai@asn.go.id"
                            className="w-full border border-slate-300 p-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition font-medium text-slate-800"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{errors.email}</p>}
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
                            : selectedAsn
                                ? 'Simpan Perubahan'
                                : 'Tambah ASN'}
                    </button>

                    {selectedAsn && (
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