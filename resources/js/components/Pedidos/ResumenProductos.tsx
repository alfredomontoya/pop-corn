interface Props {
  resumen: {
    grandes: number;
    medianos: number;
    pequenos: number;
  };
}

export default function ResumenProductos({ resumen }: Props) {
  const items = [
    { label: "Grandes", value: resumen.grandes },
    { label: "Medianos", value: resumen.medianos },
    { label: "Pequeños", value: resumen.pequenos },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-xl p-4 text-center"
        >
          <h3 className="text-lg font-semibold">{item.label}</h3>
          <p className="text-2xl font-bold text-blue-600">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
