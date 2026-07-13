import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get current path to highlight active nav link
    const currentPath = window.location.pathname;

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            label: 'Transaksi Perjalanan',
            href: '/perjalanan',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            )
        },
    ];

    const masterItems = [
        {
            label: 'Master ASN',
            href: '/master/asn',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            label: 'Master Anggota Dewan',
            href: '/master/dewan',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: 'Master PJLP',
            href: '/master/pjlp',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            label: 'Master Template',
            href: '/master/template',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },

        {
            label : 'Master Kelompok Biaya',
            href: '/master/kelompok-biaya',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },

        {
            label : 'Master Komponen Biaya',
            href: '/master/komponen-biaya',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    ];

    const isLinkActive = (href: string) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
            {/* Sidebar - Desktop */}
            <aside 
                className="hidden md:flex flex-col w-64 text-white shrink-0 shadow-xl border-r border-indigo-900/30"
                style={{ backgroundColor: '#1a237e' }}
            >
                {/* Brand Logo & Name */}
                <div className="p-6 border-b border-indigo-900/50 flex items-center space-x-3 bg-indigo-950/40">
                    {/* Stylized Golden Emblem */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-indigo-950 font-black text-lg">
                        D
                    </div>
                    <div>
                        <h2 className="font-extrabold text-sm tracking-wider uppercase">e-Perdin DPRD</h2>
                        <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-widest">DKI Jakarta</span>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-6 px-4 overflow-y-auto space-y-7">
                    <div>
                        <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest px-3">Menu Utama</span>
                        <ul className="mt-2 space-y-1.5">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
                                            isLinkActive(item.href)
                                                ? 'bg-indigo-700/55 text-white shadow-inner border-l-4 border-amber-400'
                                                : 'text-indigo-200 hover:bg-indigo-900/30 hover:text-white'
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest px-3">Master Data</span>
                        <ul className="mt-2 space-y-1.5">
                            {masterItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
                                            isLinkActive(item.href)
                                                ? 'bg-indigo-700/55 text-white shadow-inner border-l-4 border-amber-400'
                                                : 'text-indigo-200 hover:bg-indigo-900/30 hover:text-white'
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-indigo-900/50 bg-indigo-950/40 text-center text-[10px] text-indigo-300/50">
                    &copy; 2026 DPRD DKI Jakarta
                </div>
            </aside>    

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between px-6 py-4 bg-indigo-950 text-white shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-indigo-950 font-bold text-md">
                        D
                    </div>
                    <span className="font-extrabold text-sm tracking-wider">e-Perdin DPRD</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="p-1.5 bg-indigo-900/50 rounded-lg hover:bg-indigo-950 transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </header>

            {/* Mobile Menu Backdrop & Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div 
                        className="relative flex flex-col w-64 text-white shadow-xl"
                        style={{ backgroundColor: '#1a237e' }}
                    >
                        <div className="p-6 border-b border-indigo-900/50 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-indigo-950 font-bold">D</div>
                                <span className="font-extrabold text-sm tracking-wider">e-Perdin</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-indigo-300 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 py-4 px-4 overflow-y-auto space-y-6">
                            <div>
                                <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest px-3">Menu Utama</span>
                                <ul className="mt-2 space-y-1">
                                    {navItems.map((item) => (
                                        <li key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition ${
                                                    isLinkActive(item.href) ? 'bg-indigo-700/55 text-white' : 'text-indigo-200'
                                                }`}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest px-3">Master Data</span>
                                <ul className="mt-2 space-y-1">
                                    {masterItems.map((item) => (
                                        <li key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition ${
                                                    isLinkActive(item.href) ? 'bg-indigo-700/55 text-white' : 'text-indigo-200'
                                                }`}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 border-t border-indigo-900/50 mt-auto">
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="w-full flex items-center justify-center space-x-2 bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white py-3 rounded-lg text-sm font-bold transition shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar Sistem</span>
                            </Link>

                            
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header - Desktop */}
                <header className="bg-white border-b border-slate-200 px-8 py-4 hidden md:flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-lg font-bold text-slate-800">{title || 'Sistem e-Perdin'}</h1>
                        <span className="text-xs text-slate-400">Sekretariat DPRD Provinsi DKI Jakarta</span>
                    </div>
                    {/* User Profile Info */}
                    {/* User Profile Info */}
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <span className="block text-xs font-bold text-slate-700">Administrator e-Perdin</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">Super Admin</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden font-black text-slate-600 shadow-inner">
                        AD
                    </div>
                    
                    {/* 💡 TOMBOL LOGOUT DESKTOP BARU */}
                    <div className="border-l border-slate-200 pl-4">
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="flex items-center justify-center w-10 h-10 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition border border-rose-100 shadow-sm"
                            title="Keluar (Logout)"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    </div>
                </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
