<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;

class TemplateDetail extends Model
{
    // Ubah baris ini menjadi m_template_detail
    protected $table = 'm_template_detail'; 
    
    protected $fillable = [
        'template_perjalanan_id',
        'jenis_peserta', 
        'kelompok_biaya_id',
        'komponen_biaya_id',
        'qty_default',
        'satuan',
        'urutan'
    ];

    public function template_perjalanan()
    {
        return $this->belongsTo(TemplatePerjalanan::class, 'template_perjalanan_id');
    }

    public function kelompok_biaya()
    {
        return $this->belongsTo(KelompokBiaya::class, 'kelompok_biaya_id');
    }

    public function komponen_biaya()
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}