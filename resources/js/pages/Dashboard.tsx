import React from 'react';
import { Link } from '@inertiajs/react';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
            {/* Top Bar Header */}
            <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-md">E</div>
                        <h1 className="text-md font-bold tracking-tight text-slate-900">E-Perdin Dashboard Portal</h1>
                    </div>
                    <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-blue-600">&larr; Keluar Portal</Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                {/* Judul & Deskripsi */}
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-900">Pusat Navigasi Sistem</h2>
                    <p className="text-sm text-slate-500 mt-1">Gunakan panel di bawah ini untuk menelusuri pengerjaan aplikasi berdasarkan diagram alur kerja e-Perdin.</p>
                </div>

                {/* ─── KELOMPOK 1: KELOLA MASTER DATA (Blok 2.a s/d 2.f) ─── */}
                <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-6 h-6 bg-amber-500 text-white font-bold rounded-full flex items-center justify-center text-xs">2</span>
                        <h3 className="text-md font-bold text-slate-800 uppercase tracking-wider">Tahap Manajemen Master Data</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Link href={route('master.asn.index')} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition group text-left">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.a</span>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 block">Master ASN</span>
                        </Link>
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left opacity-60 cursor-not-allowed">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.b</span>
                            <span className="text-sm font-bold text-slate-500 block">Master Dewan</span>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left opacity-60 cursor-not-allowed">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.c</span>
                            <span className="text-sm font-bold text-slate-500 block">Master TA</span>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left opacity-60 cursor-not-allowed">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.d</span>
                            <span className="text-sm font-bold text-slate-500 block">Master PJLP</span>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left opacity-60 cursor-not-allowed">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.e</span>
                            <span className="text-sm font-bold text-slate-500 block">Kelompok Biaya</span>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left opacity-60 cursor-not-allowed">
                            <span className="text-xs font-bold text-slate-400 block mb-1">Blok 2.f</span>
                            <span className="text-sm font-bold text-slate-500 block">Komponen Biaya</span>
                        </div>
                    </div>
                </div>

                {/* ─── KELOMPOK 2: ALUR TRANSAKSI UTAMA (Blok 3 s/d 10) ─── */}
                <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-6 h-6 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-xs">3+</span>
                        <h3 className="text-md font-bold text-slate-800 uppercase tracking-wider">Tahap Proses Transaksi Perjalanan</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tombol Buat Baru (Blok 3) */}
                        <Link href={route('perjalanan.create')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-600/10 hover:shadow-xl hover:shadow-blue-600/20 transition text-left flex justify-between items-center group">
                            <div>
                                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">Blok 3</span>
                                <h4 className="text-lg font-black mt-1">Buat Perjalanan Baru</h4>
                                <p className="text-xs text-blue-100 mt-1">Inisiasi dokumen surat baru dengan status awal Draft.</p>
                            </div>
                            <span className="text-2xl font-light group-hover:translate-x-1 transition transform">&rarr;</span>
                        </Link>

                        {/* Tombol Lihat Daftar Aktif (Blok 4-9) */}
                        <Link href={route('perjalanan.index')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition text-left flex justify-between items-center group">
                            <div>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">Blok 4 s/d 9</span>
                                <h4 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-blue-600">Daftar & Kelola Perjalanan</h4>
                                <p className="text-xs text-slate-400 mt-1">Kelola Pengisian Anggota Peserta, Rincian Anggaran Anggota, dan Berkas Dokumen.</p>
                            </div>
                            <span className="text-2xl font-light text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition transform">&rarr;</span>
                        </Link>
                    </div>
                </div>

                {/* ─── KELOMPOK 3: OUTPUT / CETAK SURAT (Blok 11) ─── */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-6 h-6 bg-emerald-600 text-white font-bold rounded-full flex items-center justify-center text-xs">11</span>
                        <h3 className="text-md font-bold text-slate-800 uppercase tracking-wider">Tahap Output / Cetak Surat Tugas</h3>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-sm text-slate-400 italic">
                        Menu cetak surat tugas otomatis (ASN, Dewan, TA, PJLP) & rekapitulasi laporan biaya akan terbuka secara otomatis di dalam lembar perjalanan dinas yang statusnya sudah ditandai **Selesai**.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;