<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaksi\PerjalananController;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Master\AsnController;
use App\Http\Controllers\Master\AnggotaDewanController;
use App\Http\Controllers\Master\PjlpController;
use App\Http\Controllers\Master\TemplatePerjalananController;
use Inertia\Inertia;

// 1. Landing Page Utama
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('landing');

// 2. Dashboard Utama (Peta Alur Sistem)
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

// Rute Master Data (Blok 2)
Route::prefix('master')->name('master.')->group(function () {
    Route::resource('asn', AsnController::class);
    Route::resource('dewan', AnggotaDewanController::class);
    Route::resource('pjlp', PjlpController::class);
    Route::resource('template', TemplatePerjalananController::class);
});

// Rute Transaksi Perjalanan (Blok 3 - 10)
Route::resource('perjalanan', PerjalananController::class);
Route::post('perjalanan/{perjalanan}/status', [PerjalananController::class, 'updateStatus'])->name('perjalanan.status');
Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
Route::delete('perjalanan/{perjalanan}/peserta/{peserta}', [PesertaController::class, 'destroy'])->name('perjalanan.peserta.destroy');