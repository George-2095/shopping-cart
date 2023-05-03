<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'image' => 'headphones.jpg',
                'name' => 'Headphones',
                'gender' => 'Female',
                'age' => 20,
                'hobby' => 'Listening to music',
                'price' => 150,
                'type' => '3D crystal',
                'ideas' => 'Accesories'
            ],
            [
                'image' => 'sunglasses.jpg',
                'name' => 'Sunglasses',
                'gender' => 'Male',
                'age' => 25,
                'hobby' => 'Sport',
                'price' => 50,
                'type' => 'Jewellery',
                'ideas' => 'Accesories'
            ],
            [
                'image' => 'watch.jpg',
                'name' => 'Watch',
                'gender' => 'Female',
                'age' => 17,
                'hobby' => 'Listening to music',
                'price' => 300,
                'type' => 'Jewellery',
                'ideas' => 'Women box'
            ],
        ]);
    }
}
