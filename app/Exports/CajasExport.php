<?php

namespace App\Exports;

use App\Models\Caja;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class CajasExport implements FromView
{
    public $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function view(): View
    {
        $query = Caja::query();

        if ($this->request->filled('fechaInicio')) {
            $query->whereDate('fecha_apertura', '>=', $this->request->fechaInicio);
        }

        if ($this->request->filled('fechaFin')) {
            $query->whereDate('fecha_apertura', '<=', $this->request->fechaFin);
        }

        return view('excel.cajas', [ // ← aquí usas la vista del PDF
            'cajas' => $query->with('user')->get()
        ]);
    }
}
