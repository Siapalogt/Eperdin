<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Transaksi\PerjalananController; 

// Kode lama kamu jangan dibuang
Route::inertia('/', 'welcome')->name('home');

// 2. TAMBAHKAN RUTE BARU DI BAWAH SINI (Tanpa middleware auth dulu untuk uji coba)
Route::resource('perjalanan', PerjalananController::class);