<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class AddPesertaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jenis_peserta' => 'required|string|in:Dewan,Asn,Pjlp,Ta',
            'peserta_id' => 'required|integer',
            'uang_harian_kustom' => 'nullable|numeric|min:0',
        ];
    }
}