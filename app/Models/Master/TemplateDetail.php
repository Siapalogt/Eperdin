<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemplateDetail extends Model
{
    protected $table = 'm_template_detail';

    protected $guarded = [];

    // Mengetahui detail ini milik template yang mana
    public function template_perjalanan(): BelongsTo
    {
        return $this->belongsTo(TemplatePerjalanan::class, 'template_perjalanan_id');
    }

    // Mengetahui komponen biaya apa yang dikunci di detail ini
    public function komponen_biaya(): BelongsTo
    {
        return $this->belongsTo(KomponenBiaya::class, 'komponen_biaya_id');
    }
}