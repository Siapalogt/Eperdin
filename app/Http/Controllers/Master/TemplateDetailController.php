<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\TemplateDetail;
use App\Http\Requests\Master\StoreTemplateDetailRequest;
use App\Domains\Master\Action\CreateTemplateDetailAction;

class TemplateDetailController extends Controller
{
    public function store(StoreTemplateDetailRequest $request, CreateTemplateDetailAction $action, $templateId)
    {
        $data = $request->validated();
        $data['template_perjalanan_id'] = $templateId;
        
        $action->execute($data);

        return redirect()->back()->with('success', 'Komponen biaya berhasil ditambahkan ke template!');
    }

    public function destroy($templateId, $detailId)
    {
        TemplateDetail::findOrFail($detailId)->delete();
        return redirect()->back()->with('success', 'Komponen biaya dihapus dari template!');
    }
}