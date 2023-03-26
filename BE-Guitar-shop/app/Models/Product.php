<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'image',
        'price',
        'amount',
        'description',
        'status',
        'bonus',
        'origin',
        'style',
        'material',
        'paint',
        'brand',
        'string_name',
        'sold'
    ];
}
