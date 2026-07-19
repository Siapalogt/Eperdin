<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class StoreBiayaPesertaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $data = $this->all();

        if (! array_key_exists('qty', $data) && array_key_exists('jumlah', $data)) {
            $data['qty'] = $data['jumlah'];
        }

        if (! array_key_exists('satuan', $data) || blank($data['satuan'])) {
            $data['satuan'] = 'unit';
        }

        $this->merge($data);
    }

    public function rules(): array
    {
        return [
            'komponen_biaya_id' => 'required|exists:m_komponen_biaya,id',
            'qty' => 'required|integer|min:1',
            'satuan' => 'nullable|string|max:50',
            'harga_satuan' => 'required|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
            'keterangan' => 'nullable|string|max:255',
        ];
    }
}