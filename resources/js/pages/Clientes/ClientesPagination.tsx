import React from "react";
import { router } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface LinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: LinkItem[];
}

export default function ClientesPagination({ links }: Props) {
  const renderLabel = (label: string) => {
    const labelLower = label.toLowerCase();

    if (labelLower.includes("previous") || label === "«") {
      return (
        <div className="flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" />
          {/* <span>{label}</span> */}
        </div>
      );
    }
    if (labelLower.includes("next") || label === "»") {
      return (
        <div className="flex items-center gap-1">
          {/* <span>{label}</span> */}
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      );
    }
    return <span>{label}</span>;
  };

  return (
    <div className="mt-4 flex gap-2">
      {links.map((link, i) => (
        <button
          key={i}
          disabled={!link.url}
          onClick={() => link.url && router.get(link.url)}
          className={`px-3 py-1 border rounded ${
            link.active ? "bg-gray-300" : ""
          } flex items-center justify-center`}
        >
          {renderLabel(link.label)}
        </button>
      ))}
    </div>
  );
}
