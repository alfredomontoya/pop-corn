<!-- resources/views/exports/cajas.blade.php -->
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
        @foreach ($cajas as $caja)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $caja->user->name ?? '-' }}</td>
                <td>{{ $caja->fecha_apertura }}</td>
                <td>{{ $caja->total_ingresos, 2, ',', '.' }}</td>
                <td>{{ $caja->total_egresos, 2, ',', '.' }}</td>
                <td>{{ $caja->saldo_final, 2, ',', '.' }}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Totales</td>
            <td>{{ $cajas->sum('total_ingresos') }}</td>
            <td>{{ $cajas->sum('total_egresos') }}</td>
            <td>{{ $cajas->sum('saldo_final') }}</td>
        </tr>
</table>
