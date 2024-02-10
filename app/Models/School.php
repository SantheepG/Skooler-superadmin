<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;
    protected $primaryKey = "id";
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'schools';
    protected $fillable = [
        'id',
        'name',
        'address',
        'country',
        'currency',
        'phone',
        'email',
        'logo',
        'subscription_expiry',
        'ui',
        'delivery',
        'pickup',
        'admin'


    ];
}
