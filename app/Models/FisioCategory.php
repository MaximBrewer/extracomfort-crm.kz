<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FisioCategory extends Model
{
    use HasFactory;

    public function services(): HasMany
    {
        return $this->hasMany(FisioService::class, 'category_id');
    }
}
