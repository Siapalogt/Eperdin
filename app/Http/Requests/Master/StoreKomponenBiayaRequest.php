<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class StoreKomponenBiayaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'kelompok_biaya_id' => ['required', 'integer', 'exists:m_kelompok_biaya,id'],
            'nama' => ['required', 'string', 'max:100'],
        ];
    }
}
