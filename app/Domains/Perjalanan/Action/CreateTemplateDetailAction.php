<?php

namespace App\Domains\Master\Action;

use App\Models\Master\TemplateDetail;

class CreateTemplateDetailAction
{
    public function execute(array $data): TemplateDetail
    {
        return TemplateDetail::create($data);
    }
}