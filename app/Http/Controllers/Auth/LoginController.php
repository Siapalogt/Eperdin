<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // Cek kecocokan data dengan tabel users di database
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('dashboard'); // Jika benar, masuk ke dashboard
        }

        // Jika salah, kembalikan error ke halaman welcome React tadi
        return back()->withErrors([
            'email' => 'Kredensial yang diberikan tidak cocok dengan data kami.',
        ]);
    }

    // Fungsi untuk keluar aplikasi
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }
}