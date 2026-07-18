<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TemplatePerjalanan extends Model
{
    protected $table = 'm_template_perjalanan';

    protected $guarded = [];

    // Satu template memiliki banyak rincian komponen biaya default
    public function detail_template(): HasMany
    {
        return $this->hasMany(TemplateDetail::class, 'template_perjalanan_id');
    }

    // Tambahkan di dalam class TemplatePerjalanan
    public function details()
    {
        return $this->hasMany(TemplateDetail::class, 'template_perjalanan_id');
    }
}