<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class StoreTenagaAhliRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'anggota_dewan_id' => 'required|exists:m_anggota_dewan,id',
            'nama'             => 'required|string|max:150',
            'jabatan'          => 'required|string|max:100',
            'no_hp'            => 'nullable|string|max:20',
            'email'            => 'nullable|email|max:100',
            'status'           => 'required|in:Aktif,Nonaktif',
        ];
    }
}