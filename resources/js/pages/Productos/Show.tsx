import React from "react";
import { Head, usePage } from "@inertiajs/react";
import ProductoDetail from "@/components/Productos/ProductoDetail";
import { Producto } from "@/interfaces/Productos.Interface";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";

// Definimos la estructura que realmente vamos a usar
interface Props {
  flash?: any; // opcional
  producto: Producto;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "Productos", href: "/productos" }];

const Show: React.FC<Props> = ({producto}) => {
    console.log(producto)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto p-6">
        <Head title={`Producto: ${producto?.nombre ?? "Detalle"}`} />

        <h1 className="text-2xl font-bold mb-4">{producto?.nombre ?? "Producto"}</h1>

        <ProductoDetail producto={producto ?? null} />
        </div>
    </AppLayout>
  );
};

export default Show;
