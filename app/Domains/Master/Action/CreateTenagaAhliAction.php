<?php

namespace App\Domains\Master\Action;

use App\Models\Master\TenagaAhli;

class CreateTenagaAhliAction
{
    public function execute(array $data): TenagaAhli
    {
        return TenagaAhli::create($data);
    }
}