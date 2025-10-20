<?php

namespace App\Models;

class Util
{
    public static function formatoMoneda($monto): string
    {
        return '$' . number_format($monto, 2);
    }

    public static function randomDateInRange($start, $end)
    {
        return date('Y-m-d H:i:s', rand(strtotime($start), strtotime($end)));
    }
}
