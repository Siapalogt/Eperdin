import React from 'react';
import { Link } from '@inertiajs/react';

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-between font-sans text-white">
            {/* Navbar Tipis */}
            <header className="p-6 max-w-7xl w-full mx-auto flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/30">P</div>
                    <span className="font-bold text-lg tracking-wider">e-Perdin <span className="text-blue-400 font-normal">DKI Jakarta</span></span>
                </div>
                <Link href="/dashboard" className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition border border-white/10">
                    Buka Aplikasi &rarr;
                </Link>
            </header>

            {/* Hero Section */}
            <main className="max-w-4xl mx-auto text-center px-6 py-12 flex flex-col items-center justify-center flex-grow">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6 animate-pulse">
                    Sistem Informasi Perjalanan Dinas Versi 2026
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6">
                    Akuntabilitas Perjalanan Dinas <br />
                    <span className="text-blue-500">Anggota Dewan & ASN</span> yang Terukur
                </h1>
                <p className="text-base md:text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
                    Kelola standarisasi komponen biaya, manifes manifestasi peserta polimorfik, dokumen lampiran, hingga penerbitan surat tugas cetak otomatis dalam satu dasbor terintegrasi.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/dashboard" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 font-bold text-md rounded-xl shadow-xl shadow-blue-600/20 transition transform hover:-translate-y-0.5">
                        Masuk ke Dashboard Sistem
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-6 text-center text-xs text-slate-600 border-t border-white/5 bg-black/20">
                &copy; 2026 Sekretariat DPRD Provinsi DKI Jakarta. All Rights Reserved.
            </footer>
        </div>
    );
};

export default Welcome;