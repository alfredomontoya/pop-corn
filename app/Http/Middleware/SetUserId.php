<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SetUserId
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $request->merge(['user_id' => Auth::id()]);
        }

        return $next($request);
    }
}
