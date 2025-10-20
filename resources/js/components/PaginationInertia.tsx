import { PaginationLink } from "@/interfaces/Venta.Interface";
import React from "react";

type PaginationProps = {
  links: PaginationLink[];
  onPageChange: (url: string) => void;
};

const PaginationInertia: React.FC<PaginationProps> = ({ links, onPageChange }) => {
  if (!links || links.length <= 1) return null;

  return (
    <div className="flex justify-center space-x-1 mt-4">
      {links.map((link, index) => {
        const label = link.label.replace(/&laquo;/g, "«").replace(/&raquo;/g, "»");
        return (
          <button
            key={index}
            disabled={!link.url}
            onClick={() => link.url && onPageChange(link.url)}
            className={`px-3 py-1 border rounded ${
              link.active ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationInertia;
