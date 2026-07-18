<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class StoreTemplateDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jenis_peserta' => 'required|string|in:Asn,Dewan,Pjlp,Ta',
            'kelompok_biaya_id' => 'required|exists:m_kelompok_biaya,id',
            'komponen_biaya_id' => 'required|exists:m_komponen_biaya,id',
        ];
    }
}