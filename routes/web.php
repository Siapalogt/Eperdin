<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaksi\PerjalananController;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Master\AsnController;
use App\Http\Controllers\Master\AnggotaDewanController;
use App\Http\Controllers\Master\PjlpController;
use App\Http\Controllers\Master\TemplatePerjalananController;
use App\Http\Controllers\Auth\LoginController; // 💡 Tambahkan Import ini
use Inertia\Inertia;

// ==========================================
// RUTE PUBLIK (Hanya bisa diakses jika BELUM login)
// ==========================================
Route::middleware('guest')->group(function () {
    // 1. Landing Page Utama / Halaman Login
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('login'); // 💡 Nama rute wajib 'login' agar middleware tahu gerbang utamanya

    // Rute POST untuk mengecek form login
    Route::post('/login', [LoginController::class, 'authenticate']);
});

// ==========================================
// RUTE TERPROTEKSI (WAJIB LOGIN SEBELUM AKSES)
// ==========================================
Route::middleware('auth')->group(function () {
    
    // Rute untuk keluar dari sistem
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    // 2. Dashboard Utama
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalAsn' => \App\Models\Master\Asn::count(),
                'totalDewan' => \App\Models\Master\AnggotaDewan::count(),
                'totalPjlp' => \App\Models\Master\Pjlp::count(),
                'totalPerjalanan' => \App\Models\Transaksi\Perjalanan::count(),
                'activePerjalanan' => \App\Models\Transaksi\Perjalanan::whereIn('status', ['Draft', 'Diproses'])->count(),
                'completedPerjalanan' => \App\Models\Transaksi\Perjalanan::where('status', 'Selesai')->count(),
            ]
        ]);
    })->name('dashboard');

    // 3. Rute Master Data
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('asn', AsnController::class);
        Route::resource('dewan', AnggotaDewanController::class);
        Route::resource('pjlp', PjlpController::class);
        Route::resource('template', TemplatePerjalananController::class);
        Route::resource('kelompok-biaya', \App\Http\Controllers\Master\KelompokBiayaController::class)->only(['index', 'store', 'update']);
        Route::resource('komponen-biaya', \App\Http\Controllers\Master\KomponenBiayaController::class)->only(['index', 'store', 'update']);
    });

    // 4. Rute Transaksi Perjalanan
    Route::resource('perjalanan', PerjalananController::class);
    Route::post('perjalanan/{perjalanan}/status', [PerjalananController::class, 'updateStatus'])->name('perjalanan.status');
    Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
    Route::delete('perjalanan/{perjalanan}/peserta/{peserta}', [PesertaController::class, 'destroy'])->name('perjalanan.peserta.destroy');
});