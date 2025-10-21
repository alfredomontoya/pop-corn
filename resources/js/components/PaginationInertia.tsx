import { PaginationLink } from "@/interfaces/Venta.Interface";
import React from "react";
import { Button } from "./ui/button";

type PaginationProps = {
  links: PaginationLink[];
  onPageChange: (url: string) => void;
};

const PaginationInertia: React.FC<PaginationProps> = ({ links, onPageChange }) => {
  if (!links || links.length <= 1) return null;

  return (
    <div className="flex justify-center space-x-1 mt-4">
      {links.map((link, index) => {
        let label = link.label
          .replace(/&laquo;/g, "«")
          .replace(/&raquo;/g, "»")
          .replace(/Previous/i, "Anterior")
          .replace(/Next/i, "Siguiente");
        return (
          <Button
            key={index}
            disabled={!link.url}
            variant={`${link.active ? "default" : "secondary"}`}
            onClick={() => link.url && onPageChange(link.url)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default PaginationInertia;
