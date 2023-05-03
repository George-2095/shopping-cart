<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes();

Route::post('addtocart', [HomeController::class, 'addtocart'])->name('addtocart');
Route::post('removefromcart', [HomeController::class, 'removefromcart'])->name('removefromcart');
Route::get('authuserapi', [ProductsController::class, 'authuser'])->name('authuser');
Route::get('/productsapi', [ProductsController::class, 'products'])->name('products');
Route::get('/cartapi', [HomeController::class, 'cart'])->name('cart');
Route::get('/{path?}', [ProductsController::class, 'main'])->name('main');
