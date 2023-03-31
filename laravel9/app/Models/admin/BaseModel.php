<?php

namespace App\Models\admin;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use HasFactory;

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    // public function serializeDate(DateTimeInterface $date): string
    // {
    //     return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    // }

}
