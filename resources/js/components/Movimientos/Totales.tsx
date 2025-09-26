interface Props {
    totalIngresos: number;
    totalEgresos: number;
    saldo: number;
}

const Totales = ({ totalIngresos, totalEgresos, saldo }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="font-semibold text-green-800">Total Ingresos</h2>
            <p className="text-2xl font-bold text-green-600">
              {Number(totalIngresos).toFixed(2)}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="font-semibold text-red-800">Total Egresos</h2>
            <p className="text-2xl font-bold text-red-600">
              {Number(totalEgresos).toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="font-semibold text-blue-800">Saldo</h2>
            <p
              className={`text-2xl font-bold ${
                saldo >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {Number(saldo).toFixed(2)}
            </p>
          </div>
        </div>
  );
};

export { Totales };
