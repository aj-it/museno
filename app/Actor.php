<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    //

    public function getCreatedAtAttribute($value)
    {
        $d = new \DateTime($value);
        return $d->getTimestamp();
    }

    public function getUpdatedAtAttribute($value)
    {
        $d = new \DateTime($value);
        return $d->getTimestamp();
    }
}
