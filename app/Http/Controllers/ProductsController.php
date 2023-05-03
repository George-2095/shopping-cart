<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    public function authuser()
    {
        if (Auth::check()) {
            $user = auth()->user();
            return response()->json($user);
        } else {
            return response()->json([]);
        }
    }

    public function main()
    {
        return view('home');
    }

    public function products()
    {
        return Product::orderBy("id", "desc")->get();
    }
}
