import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

interface DashboardStats {
    totalAsn: number;
    totalDewan: number;
    totalPjlp: number;
    totalTA: number;
    totalKelompok: number;
    totalKomponen: number;
    totalPerjalanan: number;
    activePerjalanan: number;
    completedPerjalanan: number;
}

interface Props {
    stats: DashboardStats;
}

const Dashboard: React.FC<Props> = ({ stats }) => {
    return (
        <AppLayout title="Dashboard">
            {/* Greeting */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800">Selamat Datang, Administrator</h2>
                <p className="text-xs text-slate-400 mt-1">Sistem Informasi e-Perjalanan Dinas — Sekretariat DPRD Provinsi DKI Jakarta</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs text-slate-400 font-medium">Total Perjalanan</p>
                    <p className="text-3xl font-black text-slate-800 mt-1">{stats.totalPerjalanan}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs text-slate-400 font-medium">Sedang Berjalan</p>
                    <p className="text-3xl font-black text-blue-600 mt-1">{stats.activePerjalanan}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs text-slate-400 font-medium">Selesai / Terbit</p>
                    <p className="text-3xl font-black text-emerald-600 mt-1">{stats.completedPerjalanan}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs text-slate-400 font-medium">Total Personel</p>
                    <p className="text-3xl font-black text-slate-800 mt-1">{stats.totalAsn + stats.totalDewan + stats.totalPjlp + stats.totalTA}</p>
                </div>
            </div>

            {/* Master Data */}
            <div className="mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Master Data</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* ASN */}
                    <Link href="/master/asn" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Pegawai ASN</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalAsn}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Data kepegawaian ASN Sekretariat DPRD.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* DEWAN */}
                    <Link href="/master/dewan" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Anggota Dewan</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalDewan}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Biodata Anggota DPRD Provinsi DKI Jakarta.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* PJLP */}
                    <Link href="/master/pjlp" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Pegawai PJLP</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalPjlp}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Data tenaga operasional PJLP Sekretariat DPRD.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* TENAGA AHLI */}
                    <Link href="/master/tenaga-ahli" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Tenaga Ahli</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalTA}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Data pakar/staf ahli pendamping Anggota Dewan.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* KELOMPOK BIAYA */}
                    <Link href="/master/kelompok-biaya" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Kelompok Biaya</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalKelompok}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Kategori induk pengelompokan anggaran dinas.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* KOMPONEN BIAYA */}
                    <Link href="/master/komponen-biaya" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Komponen Biaya</p>
                                <span className="text-xs font-bold text-slate-400">{stats.totalKomponen}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Rincian spesifik dari item-item pembiayaan.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>

                    {/* TEMPLATE */}
                    <Link href="/master/template" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-sm transition group flex flex-col justify-between lg:col-span-2">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Template Dokumen Dinas</p>
                                <span className="text-xs font-bold text-slate-400">Paket Form</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">Template standar dan aturan penyusunan form untuk surat perjalanan dinas otomatis.</p>
                        </div>
                        <p className="text-xs font-bold text-indigo-500 mt-4 group-hover:translate-x-0.5 transition">Buka &rarr;</p>
                    </Link>
                </div>
            </div>

            {/* Transaksi Perjalanan */}
            <div className="mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transaksi Perjalanan</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/perjalanan/create" className="bg-indigo-900 text-white rounded-xl p-6 hover:bg-indigo-800 transition group flex justify-between items-center shadow-lg shadow-indigo-900/20">
                        <div>
                            <p className="text-sm font-bold">Buat Perjalanan Baru</p>
                            <p className="text-xs text-indigo-300 mt-1">Inisiasi surat perintah tugas baru (status: Draft).</p>
                        </div>
                        <span className="text-indigo-300 group-hover:text-white group-hover:translate-x-1 transition text-lg">&rarr;</span>
                    </Link>

                    <Link href="/perjalanan" className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-400 hover:shadow-sm transition group flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Daftar Perjalanan</p>
                            <p className="text-xs text-slate-400 mt-1">Kelola usulan, manifes peserta, dan status perjalanan dinas.</p>
                        </div>
                        <span className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition text-lg">&rarr;</span>
                    </Link>
                </div>
            </div>

            {/* Output Section */}
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Output Dokumen</p>
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400">
                    Fitur cetak Surat Perintah Tugas (SPT) otomatis tersedia di dalam halaman detail perjalanan yang berstatus <span className="font-bold text-emerald-600">Selesai</span>.
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;