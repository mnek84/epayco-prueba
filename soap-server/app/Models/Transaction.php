<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    const OPERATION_TYPE_ADD = 1;
    const OPERATION_TYPE_REMOVE = 0;

    public $fillable = [
        'operation_type',
        'description',
        'value',
    ];

    public function user():BelongsTo
    {
      return $this->belongsTo(User::class);
    }

}
