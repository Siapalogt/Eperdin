<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class StorePerjalananRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Set true agar bisa diakses
    }

    public function rules(): array
    {
        return [
            'nomor' => 'required|unique:t_perjalanan,nomor',
            'template_perjalanan_id' => 'required|exists:m_template_perjalanan,id',
            'nama_kegiatan' => 'required|string|max:255',
            'tujuan' => 'required|string|max:150',
            'lokasi' => 'nullable|string|max:255',
            'tanggal_berangkat' => 'required|date',
            'tanggal_pulang' => 'required|date|after_or_equal:tanggal_berangkat',
            'lama_hari' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ];
    }
}