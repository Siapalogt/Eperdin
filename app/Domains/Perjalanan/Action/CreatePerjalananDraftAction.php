<?php

namespace App\Domains\Perjalanan\Action;

use App\Models\Transaksi\Perjalanan;
use Illuminate\Support\Facades\Auth;

class CreatePerjalananDraftAction
{
    /**
     * Mengeksekusi Use Case: Membuat data perjalanan dinas berstatus DRAFT
     */
    public function execute(array $data): Perjalanan
    {
        // Logika Bisnis Utama dikunci di sini
        $data['status'] = 'Draft';
        $data['created_by'] = Auth::id(); 

        // Simpan melalui infrastruktur Eloquent
        return Perjalanan::create($data);
    }
}