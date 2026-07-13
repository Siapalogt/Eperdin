<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class StoreAsnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Izinkan akses
    }

    public function rules(): array
    {
        return [
            'nip'      => 'required|string|max:50|unique:m_asn,nip,' . $this->route('asn'),
            'nama'     => 'required|string|max:150',
            'jabatan'  => 'required|string|max:100',
            'golongan' => 'required|string|max:20',
            'status'   => 'required|in:Aktif,Nonaktif',
        ];
    }
}