<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function cart()
    {
        return Cart::where('userid', Auth::user()->id)->get();
    }

    public function addtocart(Request $req)
    {
        $req->validate([
            'productid' => 'required',
            'quantity' => 'required|numeric|min:1',
        ]);
        $cartItem = Cart::where('userid', Auth::user()->id)->where('productid', $req->productid)->first();
        if ($cartItem) {
            $cartItem->quantity += $req->quantity;
            $cartItem->save();
        } else {
            $productdata = array("userid" => Auth::user()->id, 'productid' => $req->productid, 'quantity' => $req->quantity);
            Cart::insert($productdata);
        }
    }

    public function removefromcart(Request $req)
    {
        $req->validate([
            'productid' => 'required'
        ]);

        Cart::where('userid', Auth::user()->id)->where('productid', $req->productid)->delete();
    }
}
