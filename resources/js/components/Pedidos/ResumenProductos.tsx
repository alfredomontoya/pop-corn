interface Props {
  resumen: {
    grandes: number;
    medianos: number;
    pequenos: number;
    total: number;
  };
  fondo?: string;
}

export default function ResumenProductos({ resumen }: Props) {
  const items = [
    { label: "Grandes", value: resumen.grandes, color: 'green' },
    { label: "Medianos", value: resumen.medianos, color: 'red' },
    { label: "Pequeños", value: resumen.pequenos, color : 'yellow' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {items.map((item, i) => (
        <div
          key={i}
          className={`shadow rounded-xl p-4 text-center bg-${item.color}-100`}
        >
          <h3 className={`text-lg font-semibold text-${item.color}-800`}>{item.label}</h3>
          <p className={`text-2xl font-bold text-blue-600 text-${item.color}-600`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
