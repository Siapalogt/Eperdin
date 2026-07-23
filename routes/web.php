<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaksi\PerjalananController;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Master\AsnController;
use App\Http\Controllers\Master\AnggotaDewanController;
use App\Http\Controllers\Master\PjlpController;
use App\Http\Controllers\Master\TemplatePerjalananController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Master\TenagaAhliController; 
use App\Http\Controllers\Transaksi\BiayaPesertaController;
use App\Http\Controllers\Master\TemplateDetailController;
use App\Http\Controllers\Master\KategoriController;
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
// 2. Dashboard Utama (Peta Alur Sistem)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalAsn' => \App\Models\Master\Asn::count(),
            'totalDewan' => \App\Models\Master\AnggotaDewan::count(),
            'totalPjlp' => \App\Models\Master\Pjlp::count(),
            'totalTA' => \App\Models\Master\TenagaAhli::count(),               // 💡 Tambahan baru
            'totalKelompok' => \App\Models\Master\KelompokBiaya::count(),      // 💡 Tambahan baru
            'totalKomponen' => \App\Models\Master\KomponenBiaya::count(),      // 💡 Tambahan baru
            'totalPerjalanan' => \App\Models\Transaksi\Perjalanan::count(),
            'activePerjalanan' => \App\Models\Transaksi\Perjalanan::whereIn('status', ['Draft', 'Diproses'])->count(),
            'completedPerjalanan' => \App\Models\Transaksi\Perjalanan::where('status', 'Selesai')->count(),
        ]
    ]);
    })->name('dashboard');

    // 3. Rute Master Data
    // 3. Rute Master Data
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('asn', AsnController::class);
        Route::resource('dewan', AnggotaDewanController::class);
        Route::resource('pjlp', PjlpController::class);
        Route::resource('template', TemplatePerjalananController::class);
        Route::resource('kelompok-biaya', \App\Http\Controllers\Master\KelompokBiayaController::class);
        Route::resource('komponen-biaya', \App\Http\Controllers\Master\KomponenBiayaController::class);
        Route::resource('tenaga-ahli', TenagaAhliController::class);    
        Route::post('template/{template}/detail', [TemplateDetailController::class, 'store']);
        Route::delete('template/{template}/detail/{detail}', [TemplateDetailController::class, 'destroy']);
        Route::resource('kategori', KategoriController::class)->except(['create', 'show', 'edit']);
    });

    // 4. Rute Transaksi Perjalanan
    Route::resource('perjalanan', PerjalananController::class);
    Route::post('perjalanan/{perjalanan}/status', [PerjalananController::class, 'updateStatus'])->name('perjalanan.status');
    Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
    Route::delete('perjalanan/{perjalanan}/peserta/{peserta}', [PesertaController::class, 'destroy'])->name('perjalanan.peserta.destroy');
    Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
    Route::delete('perjalanan/{perjalanan}/peserta/{peserta}', [PesertaController::class, 'destroy'])->name('perjalanan.peserta.destroy');

    //5. Rute Biaya
    Route::post('peserta/{peserta}/biaya', [BiayaPesertaController::class, 'store'])->name('peserta.biaya.store');
});

