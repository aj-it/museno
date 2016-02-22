<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    /**
     * Les attributs que l'on peut assigner en masse.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Retourne le timestamp converti en datetime.
     *
     * @param $value
     * @return int
     */
    public function getCreatedAtAttribute($value)
    {
        $d = new \DateTime($value);
        return $d->getTimestamp();
    }

    /**
     * Retourne le timestamp converti en datetime.
     *
     * @param $value
     * @return int
     */
    public function getUpdatedAtAttribute($value)
    {
        $d = new \DateTime($value);
        return $d->getTimestamp();
    }
}
