<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'name',
        'image',
        'price',
        'quantity',
        'bonus',
        'origin',
        'style',
        'material',
        'paint',
        'string_name'
    ];
}
