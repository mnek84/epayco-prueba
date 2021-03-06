<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OperationToken extends Model
{
    use HasFactory;


    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function scopeBySession($query,$session)
    {
        return $query->where("session","=",$session);
    }

    public function scopeByToken($query,$token)
    {
        return $query->where("token","=",$token);
    }


}
