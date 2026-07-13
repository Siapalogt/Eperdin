<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Transaksi\PesertaController;
use App\Http\Controllers\Transaksi\PerjalananController; 
use App\Http\Controllers\Transaksi\BiayaPesertaController;

// Kode lama kamu jangan dibuang
Route::inertia('/', 'welcome')->name('home');

// 2. TAMBAHKAN RUTE BARU DI BAWAH SINI (Tanpa middleware auth dulu untuk uji coba)
Route::resource('perjalanan', PerjalananController::class);
Route::post('perjalanan/{perjalanan}/peserta', [PesertaController::class, 'store'])->name('perjalanan.peserta.store');
Route::post('peserta/{peserta}/biaya', [BiayaPesertaController::class, 'store'])->name('peserta.biaya.store');