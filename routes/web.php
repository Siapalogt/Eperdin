<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==========================================
// IMPORT CONTROLLER
// ==========================================
use App\Http\Controllers\Auth\LoginController;

// Controller Master
use App\Http\Controllers\Master\AsnController;
use App\Http\Controllers\Master\AnggotaDewanController;
use App\Http\Controllers\Master\PjlpController;
use App\Http\Controllers\Master\TenagaAhliController; 
use App\Http\Controllers\Master\KelompokBiayaController;
use App\Http\Controllers\Master\KomponenBiayaController;
use App\Http\Controllers\Master\KategoriController;
use App\Http\Controllers\Master\FieldKomponenController;
use App\Http\Controllers\Master\TemplatePerjalananController;
use App\Http\Controllers\Master\TemplateDetailController;

// Controller Transaksi
use App\Http\Controllers\Transaksi\PerjalananController;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Transaksi\BiayaPesertaController;

// ==========================================
// IMPORT MODEL (Untuk Dashboard)
// ==========================================
use App\Models\Master\Asn;
use App\Models\Master\AnggotaDewan;
use App\Models\Master\Pjlp;
use App\Models\Master\TenagaAhli;
use App\Models\Master\KelompokBiaya;
use App\Models\Master\KomponenBiaya;
use App\Models\Master\Kategori;
use App\Models\Master\TemplatePerjalanan;
use App\Models\Transaksi\Perjalanan;
use App\Models\Transaksi\Peserta;
use App\Models\Transaksi\BiayaPeserta;

// ==========================================
// RUTE PUBLIK (Hanya bisa diakses jika BELUM login)
// ==========================================
Route::middleware('guest')->group(function () {
    // 1. Landing Page Utama / Halaman Login
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('login');

    // Rute POST untuk mengecek form login
    Route::post('/login', [LoginController::class, 'authenticate']);
});

// ==========================================
// RUTE TERPROTEKSI (WAJIB LOGIN SEBELUM AKSES)
// ==========================================
Route::middleware('auth')->group(function () {
    
    // Rute untuk keluar dari sistem
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    // 2. Dashboard Utama (Peta Alur Sistem)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalAsn' => Asn::count(),
                'totalDewan' => AnggotaDewan::count(),
                'totalPjlp' => Pjlp::count(),
                'totalTA' => TenagaAhli::count(),
                'totalKelompok' => KelompokBiaya::count(),
                'totalKomponen' => KomponenBiaya::count(),
                'totalPerjalanan' => Perjalanan::count(),
                'activePerjalanan' => Perjalanan::whereIn('status', ['Draft', 'Diproses'])->count(),
                'completedPerjalanan' => Perjalanan::where('status', 'Selesai')->count(),
            ]
        ]);
    })->name('dashboard');

    // 3. Rute Master Data
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('asn', AsnController::class);
        Route::resource('dewan', AnggotaDewanController::class);
        Route::resource('pjlp', PjlpController::class);
        Route::resource('tenaga-ahli', TenagaAhliController::class);    
        Route::resource('kelompok-biaya', KelompokBiayaController::class);
        Route::resource('komponen-biaya', KomponenBiayaController::class);
        Route::resource('kategori', KategoriController::class)->except(['create', 'show', 'edit']);
        Route::resource('field-komponen', FieldKomponenController::class)->except(['create', 'show', 'edit']);
        
        // Template Perjalanan
        Route::resource('template', TemplatePerjalananController::class);
        Route::post('template/{template}/detail', [TemplateDetailController::class, 'store']);
        Route::delete('template/{template}/detail/{detail}', [TemplateDetailController::class, 'destroy']);
    });

    // 4. Rute Transaksi Perjalanan
    Route::resource('perjalanan', PerjalananController::class);
    Route::post('perjalanan/{perjalanan}/status', [PerjalananController::class, 'updateStatus'])->name('perjalanan.status');
    
    // Manajemen Peserta di dalam Perjalanan
    Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
    Route::delete('perjalanan/{perjalanan}/peserta/{peserta}', [PesertaController::class, 'destroy'])->name('perjalanan.peserta.destroy');

    // 5. Rute Biaya
    Route::post('peserta/{peserta}/biaya', [BiayaPesertaController::class, 'store'])->name('peserta.biaya.store');
});