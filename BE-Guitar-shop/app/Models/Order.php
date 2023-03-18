<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'address',
        'phone',
        'email',
        'note',
        'quantity',
        'total_price',
        'status'
    ];
}
