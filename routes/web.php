<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaksi\PerjalananController;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Master\AsnController;
use Inertia\Inertia;

// 1. Landing Page Utama
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('landing');

// 2. Dashboard Utama (Peta Alur Sistem)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Rute Master Data (Blok 2)
Route::prefix('master')->name('master.')->group(function () {
    Route::resource('asn', AsnController::class)->only(['index', 'store', 'update']);
    // Menu dewan, ta, pjlp, biaya bisa menyusul disini
});

// Rute Transaksi Perjalanan (Blok 3 - 10)
Route::resource('perjalanan', PerjalananController::class);
Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');