import { useForm, Head, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import AppLayout from '../../../layouts/AppLayout';

// ==========================================
// DEFINISI INTERFACE TYPESCRIPT
// ==========================================
interface KelompokBiaya {
    id: number;
    nama: string;
}

interface KomponenBiaya {
    id: number;
    kelompok_biaya_id?: number | string;
    nama: string;
}

interface FieldKomponen {
    id: number;
    komponen_biaya_id: number | string;
    label: string;
    field_name: string;
    input_type: string;
    pilihan: string | null;
    required: number | boolean;
    urutan: number;
    status: string;
    komponen_biaya?: KomponenBiaya;
}

interface Props {
    fieldKomponen: FieldKomponen[];
    komponenBiaya: KomponenBiaya[];
    kelompokBiaya?: KelompokBiaya[]; // Tambahan prop Kelompok Biaya dari Controller
}

const Index: React.FC<Props> = ({ 
    fieldKomponen = [], 
    komponenBiaya = [], 
    kelompokBiaya = [] 
}) => {
    // 1. State lokal untuk memfilter Komponen Biaya berdasarkan Kelompok Biaya
    const [selectedKelompokId, setSelectedKelompokId] = useState<string | number>('');
    const [editId, setEditId] = useState<number | null>(null);

    // 2. Inisialisasi form menggunakan helper Inertia
    const { data, setData, post, put, reset, processing, errors, clearErrors } = useForm({
        komponen_biaya_id: '' as string | number,
        label: '',
        field_name: '',
        input_type: 'text',
        pilihan: '',
        required: 1, // 1 = Wajib, 0 = Opsional
        urutan: 1,
        status: 'aktif',
    });

    // 3. Filter list Komponen Biaya secara otomatis berdasarkan Kelompok Biaya yang dipilih
    const filteredKomponenBiaya = useMemo(() => {
        if (!selectedKelompokId) return [];
        return komponenBiaya.filter(
            (k) => String(k.kelompok_biaya_id) === String(selectedKelompokId)
        );
    }, [selectedKelompokId, komponenBiaya]);

    // Handler saat Kelompok Biaya berganti
    const handleKelompokChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedKelompokId(val);
        // Reset pilihan komponen_biaya_id agar konsisten
        setData('komponen_biaya_id', '');
    };

    // Auto-generate Field Name saat Label Form diketik
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const labelVal = e.target.value;
        const autoFieldName = labelVal
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_');

        setData((prev) => ({
            ...prev,
            label: labelVal,
            field_name: editId ? prev.field_name : autoFieldName, // Auto-slug saat mode Tambah
        }));
    };

    // Fungsi Submit Form (Create & Update)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(route('master.field-komponen.update', editId), {
                onSuccess: () => {
                    setEditId(null);
                    setSelectedKelompokId('');
                    reset();
                    clearErrors();
                },
            });
        } else {
            post(route('master.field-komponen.store'), {
                onSuccess: () => {
                    setEditId(null);
                    setSelectedKelompokId('');
                    reset();
                    clearErrors();
                },
            });
        }
    };

    // Fungsi untuk mengisi form saat tombol Edit diklik
    const handleEdit = (item: FieldKomponen) => {
        setEditId(item.id);

        // Cari komponen induk untuk mengidentifikasi kelompok_biaya_id nya secara otomatis
        const targetKomponen = komponenBiaya.find(
            (k) => String(k.id) === String(item.komponen_biaya_id)
        );

        if (targetKomponen && targetKomponen.kelompok_biaya_id) {
            setSelectedKelompokId(targetKomponen.kelompok_biaya_id);
        } else {
            setSelectedKelompokId('');
        }

        setData({
            komponen_biaya_id: item.komponen_biaya_id.toString(),
            label: item.label,
            field_name: item.field_name,
            input_type: item.input_type,
            pilihan: item.pilihan || '',
            required: item.required === true || item.required === 1 ? 1 : 0,
            urutan: item.urutan,
            status: item.status,
        });
        clearErrors();
    };

    // Fungsi Hapus Data
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus rincian biaya ini?')) {
            router.delete(route('master.field-komponen.destroy', id));
        }
    };

    // Fungsi untuk membatalkan edit
    const handleCancel = () => {
        setEditId(null);
        setSelectedKelompokId('');
        reset();
        clearErrors();
    };

    return (
        <AppLayout title="Master Rincian Biaya">
            <Head title="Master Rincian Biaya" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* ========================================== */}
                {/* KOLOM KIRI: TABEL DATA                     */}
                {/* ========================================== */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Tabel */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-md font-bold text-slate-800">Daftar Field Komponen</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Kelola input field dinamis untuk setiap rincian komponen biaya.</p>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Komponen & Label</th>
                                    <th className="px-6 py-4 text-left">Konfigurasi DB</th>
                                    <th className="px-6 py-4 text-left w-24">Urutan</th>
                                    <th className="px-6 py-4 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 bg-white">
                                {fieldKomponen.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                            Belum ada rincian komponen biaya yang didaftarkan.
                                        </td>
                                    </tr>
                                ) : (
                                    fieldKomponen.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            
                                            {/* Kolom 1: Label & Komponen */}
                                            <td className="px-6 py-4">
                                                <div className="mb-1">
                                                    <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                                                        {item.komponen_biaya?.nama || 'Tanpa Induk'}
                                                    </span>
                                                </div>
                                                <div className="font-bold text-slate-800 text-sm">
                                                    {item.label}
                                                </div>
                                                <div className="text-[10px] text-slate-400 mt-0.5 flex gap-2">
                                                    <span className={item.status === 'aktif' ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'}>
                                                        {item.status.toUpperCase()}
                                                    </span>
                                                    <span>•</span>
                                                    <span className={item.required ? 'text-blue-600 font-bold' : ''}>
                                                        {item.required ? 'Wajib Diisi' : 'Opsional'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Kolom 2: Config (Field & Type) */}
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit border border-indigo-100">
                                                    {item.field_name}
                                                </div>
                                                <div className="mt-1 font-semibold text-slate-500 uppercase text-[10px]">
                                                    Type: {item.input_type}
                                                </div>
                                            </td>

                                            {/* Kolom 3: Urutan */}
                                            <td className="px-6 py-4 font-bold text-slate-700">
                                                {item.urutan}
                                            </td>

                                            {/* Kolom 4: Aksi */}
                                            <td className="px-6 py-4 text-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-rose-600 hover:text-rose-900 font-bold hover:underline transition"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ========================================== */}
                {/* KOLOM KANAN: FORM INPUT                    */}
                {/* ========================================== */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
                    <div className="mb-4">
                        <h2 className="text-md font-bold text-slate-800">
                            {editId ? 'Ubah Rincian Biaya' : 'Tambah Rincian Biaya'}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {editId 
                                ? 'Ubah data struktur form rincian biaya ini.' 
                                : 'Konfigurasi field input baru untuk komponen biaya tertentu.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* STEP 1: Pilih Kelompok Biaya (TAMBAHAN UTAMA) */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Kelompok Biaya <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 transition"
                                value={selectedKelompokId}
                                onChange={handleKelompokChange}
                                required
                            >
                                <option value="">-- Pilih Kelompok Biaya --</option>
                                {kelompokBiaya.map((k) => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* STEP 2: Komponen Induk (Filtered) */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Komponen Induk <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                                value={data.komponen_biaya_id}
                                onChange={(e) => setData('komponen_biaya_id', e.target.value)}
                                disabled={!selectedKelompokId}
                                required
                            >
                                <option value="" disabled>
                                    {!selectedKelompokId 
                                        ? '-- Pilih Kelompok Biaya Dahulu --' 
                                        : '-- Pilih Komponen --'}
                                </option>
                                {filteredKomponenBiaya.map((k) => (
                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                ))}
                            </select>
                            {errors.komponen_biaya_id && (
                                <p className="text-rose-500 text-[10px] mt-1">{errors.komponen_biaya_id}</p>
                            )}
                        </div>

                        {/* Label Form */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Label Form <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                placeholder="Misal: Nama Hotel / Maskapai"
                                value={data.label}
                                onChange={handleLabelChange}
                                required
                            />
                            {errors.label && <p className="text-rose-500 text-[10px] mt-1">{errors.label}</p>}
                        </div>

                        {/* Field Name */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Field Name (Database) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition font-mono"
                                placeholder="Contoh: nama_hotel"
                                value={data.field_name}
                                onChange={(e) => setData('field_name', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                                required
                            />
                            <p className="text-[10px] text-slate-400 mt-1">Gunakan huruf kecil, spasi otomatis diubah ke underscore (_).</p>
                            {errors.field_name && <p className="text-rose-500 text-[10px] mt-1">{errors.field_name}</p>}
                        </div>

                        {/* Input Type */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Tipe Input <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                value={data.input_type}
                                onChange={(e) => setData('input_type', e.target.value)}
                                required
                            >
                                <option value="text">Teks Pendek (Text)</option>
                                <option value="number">Angka / Rupiah (Number)</option>
                                <option value="date">Tanggal (Date)</option>
                                <option value="select">Dropdown (Select)</option>
                            </select>
                        </div>

                        {/* Pilihan (Khusus Select) */}
                        {data.input_type === 'select' && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Opsi Pilihan <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    placeholder="Cth: Bintang 3, Bintang 4, Bintang 5 (Pisahkan dengan koma)"
                                    rows={3}
                                    value={data.pilihan || ''}
                                    onChange={(e) => setData('pilihan', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {/* Urutan */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Urutan Tampil <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition"
                                    value={data.urutan}
                                    onChange={(e) => setData('urutan', Number(e.target.value))}
                                    required
                                />
                            </div>

                            {/* Required (Wajib/Opsional) */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Validasi Data <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                    value={data.required}
                                    onChange={(e) => setData('required', Number(e.target.value))}
                                >
                                    <option value={1}>Wajib Diisi</option>
                                    <option value={0}>Opsional</option>
                                </select>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Status <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className="w-full border border-slate-200 p-2.5 text-xs rounded-xl bg-white focus:outline-none focus:border-blue-600 transition"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Nonaktif</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Rincian'}
                            </button>
                            
                            {editId !== null && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                        
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;