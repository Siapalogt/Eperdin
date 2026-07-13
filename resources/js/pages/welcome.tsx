import React from 'react';
import { useForm, Head } from '@inertiajs/react';

const Welcome: React.FC = () => {
    // Gunakan useForm Inertia agar terhubung langsung dengan sistem keamanan Laravel
    const { data, setData, post, processing, errors } = useForm({
        email: '', // Kita pakai email untuk standar login Laravel
        password: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Kirim data ke endpoint backend Laravel
        post('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 flex flex-col justify-between font-sans text-white">
            <Head title="Portal Login e-Perdin" />
            
            {/* Top Navigation / Brand Header */}
            <header className="p-6 max-w-7xl w-full mx-auto flex justify-between items-center bg-transparent">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/10 text-indigo-950">D</div>
                    <span className="font-extrabold text-lg tracking-wider">
                        e-Perdin <span className="text-amber-400 font-normal">DPRD DKI</span>
                    </span>
                </div>
            </header>

            {/* Login Card Container */}
            <main className="flex-grow flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">
                    <div className="text-center mb-8">
                        <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-[9px] font-extrabold text-amber-300 uppercase tracking-widest">
                            Portal Autentikasi
                        </span>
                        <h2 className="text-xl font-bold mt-4">Silakan Masuk</h2>
                        <p className="text-xs text-slate-400 mt-1.5 font-medium">Gunakan email admin e-Perdin</p>
                    </div>

                    {/* Menampilkan error ASLI dari Laravel jika password salah */}
                    {errors.email && (
                        <div className="mb-4 p-3.5 bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs rounded-xl font-medium flex items-center space-x-2">
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{errors.email}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alamat Email / NIP</label>
                            <input 
                                type="text" 
                                required
                                placeholder="Contoh: admin@eperdin.com"
                                className="w-full bg-white/5 border border-white/10 p-3 text-xs rounded-xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white placeholder-slate-500 transition" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                            <input 
                                type="password" 
                                required
                                placeholder="Masukkan password"
                                className="w-full bg-white/5 border border-white/10 p-3 text-xs rounded-xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white placeholder-slate-500 transition" 
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center space-x-2 cursor-pointer select-none">
                                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-amber-400 focus:ring-0 focus:ring-offset-0" />
                                <span className="text-[10px] text-slate-400 font-medium">Ingat Saya</span>
                            </label>
                            <a href="#" className="text-[10px] text-amber-400 hover:underline font-bold">Lupa Password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full py-3.5 bg-gradient-to-tr from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-indigo-950 font-black text-xs rounded-xl shadow-xl shadow-amber-500/5 transition transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider mt-2 flex items-center justify-center space-x-2"
                        >
                            {processing ? 'Memverifikasi...' : 'Masuk ke Sistem'}
                        </button>
                    </form>
                </div>
            </main>

            <footer className="p-6 text-center text-[10px] text-slate-500 border-t border-white/5 bg-indigo-950/20">
                &copy; 2026 Sekretariat DPRD Provinsi DKI Jakarta. Seluruh Hak Cipta Dilindungi.
            </footer>
        </div>
    );
};

export default Welcome;