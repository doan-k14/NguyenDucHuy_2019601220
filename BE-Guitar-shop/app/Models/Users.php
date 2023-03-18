<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $fillable = [
        'username',
        'password',
        'full_name',
        'phone',
        'email',
        'address'
    ];
}
