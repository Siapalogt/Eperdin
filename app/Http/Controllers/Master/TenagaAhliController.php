<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\TenagaAhli;
use App\Models\Master\AnggotaDewan;
use App\Http\Requests\Master\StoreTenagaAhliRequest;
use App\Domains\Master\Action\CreateTenagaAhliAction;
use App\Domains\Master\Action\UpdateTenagaAhliAction;
use Inertia\Inertia;

class TenagaAhliController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/TenagaAhli/Index', [
            // Membawa relasi anggota dewan untuk ditampilkan di tabel
            'listTa' => TenagaAhli::with('anggota_dewan')->orderBy('nama')->get(),
            // Membawa daftar anggota dewan untuk pilihan dropdown di form
            'listDewan' => AnggotaDewan::orderBy('nama')->get()
        ]);
    }

    public function store(StoreTenagaAhliRequest $request, CreateTenagaAhliAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Tenaga Ahli berhasil ditambahkan!');
    }

    public function update(StoreTenagaAhliRequest $request, UpdateTenagaAhliAction $action, $id)
    {
        $action->execute($id, $request->validated());
        return redirect()->back()->with('success', 'Tenaga Ahli berhasil diperbarui!');
    }
}