<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Asn;
use App\Http\Requests\Master\StoreAsnRequest;
use App\Domains\Master\Action\CreateAsnAction;
use App\Domains\Master\Action\UpdateAsnAction;
use Inertia\Inertia;

class AsnController extends Controller
{
    /**
     * Menampilkan daftar master data ASN
     */
    public function index()
    {
        $dataAsn = Asn::orderBy('nama', 'asc')->get();

        return Inertia::render('Master/Asn/Index', [
            'listAsn' => $dataAsn
        ]);
    }

    /**
     * Menyimpan data master ASN baru
     */
    public function store(StoreAsnRequest $request, CreateAsnAction $action)
    {
        $action->execute($request->validated());

        return redirect()->route('master.asn.index')
            ->with('success', 'Data ASN berhasil ditambahkan!');
    }

    /**
     * Memperbarui data master ASN
     */
    public function update(StoreAsnRequest $request, UpdateAsnAction $action, $id)
    {
        $action->execute($id, $request->validated());

        return redirect()->route('master.asn.index')
            ->with('success', 'Data ASN berhasil diperbarui!');
    }

    /**
     * Menghapus data master ASN
     */
    public function destroy($id)
    {
        $asn = Asn::findOrFail($id);
        $asn->delete();

        return redirect()->route('master.asn.index')
            ->with('success', 'Data ASN berhasil dihapus!');
    }
}