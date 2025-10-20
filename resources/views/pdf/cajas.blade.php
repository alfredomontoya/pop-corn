@"
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Cajas</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #333; padding: 4px; text-align: left; }
        th { background-color: #f2f2f2; }
        tfoot td { font-weight: bold; }
    </style>
</head>
<body>
    <h2>Listado de Cajas</h2>
    <h3>Desde: {{ $fechaInicio }} Hasta: {{ $fechaFin }}</h3>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Fecha Apertura</th>
                <th>Ingresos</th>
                <th>Egresos</th>
                <th>Saldo Final</th>
            </tr>
        </thead>
        <tbody>
            @php
                $totalIngresos = 0;
                $totalEgresos = 0;
                $totalSaldoFinal = 0;
            @endphp
            @foreach ($cajas as $caja)
                @php
                    $totalIngresos += $caja->total_ingresos;
                    $totalEgresos += $caja->total_egresos;
                    $totalSaldoFinal += $caja->saldo_final;
                @endphp
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $caja->user->name ?? '-' }}</td>
                    <td>{{ $caja->fecha_apertura }}</td>
                    <td>{{ number_format($caja->total_ingresos, 2, ',', '.') }}</td>
                    <td>{{ number_format($caja->total_egresos, 2, ',', '.') }}</td>
                    <td>{{ number_format($caja->saldo_final, 2, ',', '.') }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Totales</td>
                <td>{{ number_format($totalIngresos, 2, ',', '.') }}</td>
                <td>{{ number_format($totalEgresos, 2, ',', '.') }}</td>
                <td>{{ number_format($totalSaldoFinal, 2, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
"@ | Out-File resources\views\pdf\cajas.blade.php -Encoding UTF8
