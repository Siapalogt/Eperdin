<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class StoreBiayaPesertaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'komponen_biaya_id' => 'required|exists:m_komponen_biaya,id',
            'jumlah'            => 'required|integer|min:1',
            'harga_satuan'      => 'required|numeric|min:0',
            'total'             => 'required|numeric|min:0',
            'keterangan'        => 'nullable|string|max:255',
        ];
    }
}