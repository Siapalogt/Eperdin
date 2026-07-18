import React, { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../../../layouts/AppLayout';

interface Props {
    template: any;
    listKelompok: any[];
    listKomponen: any[];
}

const Show: React.FC<Props> = ({ template, listKelompok, listKomponen }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        jenis_peserta: 'Asn',
        kelompok_biaya_id: '',
        komponen_biaya_id: ''
    });

    // Filter komponen berdasarkan kelompok yang dipilih
    const filteredKomponen = listKomponen.filter(k => k.kelompok_biaya_id.toString() === data.kelompok_biaya_id.toString());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/master/template/${template.id}/detail`, {
            onSuccess: () => reset('komponen_biaya_id') // Cukup reset komponen agar cepat tambah lagi
        });
    };

    const handleDelete = (detailId: number) => {
        if (confirm('Hapus aturan biaya ini dari template?')) {
            router.delete(`/master/template/${template.id}/detail/${detailId}`);
        }
    };

    return (
        <AppLayout title={`Detail Template: ${template.nama}`}>
            <div className="mb-4">
                <Link href="/master/template" className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center space-x-1">
                    <span>&larr;</span> <span>Kembali ke Daftar Template</span>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded uppercase tracking-widest">{template.status}</span>
                <h2 className="text-xl font-black text-slate-800 mt-2">{template.nama}</h2>
                <p className="text-sm text-slate-500 mt-1">{template.keterangan || 'Tidak ada deskripsi'}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kiri: Daftar Detail Komponen */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-slate-100 bg-slate-50">
                        <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">Aturan Biaya Template</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 text-left">Berlaku Untuk</th>
                                    <th className="px-4 py-3 text-left">Kelompok Biaya</th>
                                    <th className="px-4 py-3 text-left">Item Komponen</th>
                                    <th className="px-4 py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                                {!template.details || template.details.length === 0 ? (
                                    <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">Belum ada aturan biaya yang diatur untuk template ini.</td></tr>
                                ) : (
                                    template.details.map((detail: any) => (
                                        <tr key={detail.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                                                    {detail.jenis_peserta === 'Ta' ? 'Tenaga Ahli' : detail.jenis_peserta}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold">{detail.kelompok_biaya?.nama}</td>
                                            <td className="px-4 py-3">{detail.komponen_biaya?.nama}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button onClick={() => handleDelete(detail.id)} className="text-rose-500 hover:text-rose-700 font-bold hover:underline">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Kanan: Form Input Detail */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
                    <h3 className="text-md font-bold text-slate-800">Tambah Aturan Komponen</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-4">Pilih tipe pegawai dan komponen biaya yang diperbolehkan.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Peserta</label>
                            <select className="w-full border border-slate-300 p-2.5 text-sm rounded-lg bg-white" value={data.jenis_peserta} onChange={e => setData('jenis_peserta', e.target.value)} required>
                                <option value="Asn">ASN</option>
                                <option value="Dewan">Anggota Dewan</option>
                                <option value="Pjlp">PJLP</option>
                                <option value="Ta">Tenaga Ahli (TA)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Grup Kelompok Biaya</label>
                            <select className="w-full border border-slate-300 p-2.5 text-sm rounded-lg bg-white" value={data.kelompok_biaya_id} onChange={e => setData('kelompok_biaya_id', e.target.value)} required>
                                <option value="">-- Pilih Kelompok --</option>
                                {listKelompok.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            {errors.kelompok_biaya_id && <p className="text-rose-500 text-[10px] mt-1">{errors.kelompok_biaya_id}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Komponen Spesifik</label>
                            <select disabled={!data.kelompok_biaya_id} className="w-full border border-slate-300 p-2.5 text-sm rounded-lg bg-white disabled:bg-slate-50" value={data.komponen_biaya_id} onChange={e => setData('komponen_biaya_id', e.target.value)} required>
                                <option value="">-- Pilih Komponen --</option>
                                {filteredKomponen.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            {errors.komponen_biaya_id && <p className="text-rose-500 text-[10px] mt-1">{errors.komponen_biaya_id}</p>}
                        </div>

                        <button type="submit" disabled={processing || !data.komponen_biaya_id} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Tambahkan Komponen'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;