<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAsnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Izinkan akses
    }

    public function rules(): array
    {
        // Mengambil parameter ID dari route (fleksibel jika bernama 'asn' atau 'id')
        $asnId = $this->route('asn') ?? $this->route('id');

        return [
            'nip' => [
                'required',
                'string',
                'max:50',
                Rule::unique('m_asn', 'nip')->ignore($asnId),
            ],
            'nama'          => ['required', 'string', 'max:150'],
            'jabatan'       => ['required', 'string', 'max:100'],
            'golongan'      => ['required', 'string', 'max:20'],
            'unit_kerja'    => ['required', 'string', 'max:100'],
            'no_hp'         => ['nullable', 'string', 'max:20'],
            'email'         => ['nullable', 'string', 'email', 'max:100'],
            'status'        => ['required', 'in:Aktif,Nonaktif'],
        ];
    }
}