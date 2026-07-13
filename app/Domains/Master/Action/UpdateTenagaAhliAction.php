<?php

namespace App\Domains\Master\Action;

use App\Models\Master\TenagaAhli;

class UpdateTenagaAhliAction
{
    public function execute(int $id, array $data): TenagaAhli
    {
        $ta = TenagaAhli::findOrFail($id);
        $ta->update($data);
        
        return $ta;
    }
}