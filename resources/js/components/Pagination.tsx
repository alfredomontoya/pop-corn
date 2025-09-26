import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "./ui/button";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: PaginationLink[];
}

const Pagination: React.FC<Props> = ({ links }) => {
  const handleClick = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveState: true });
  };

  return (
    <div className="flex justify-center mt-4 space-x-1">
      {links.map((link, i) => (
        <Button
          key={i}
          onClick={() => handleClick(link.url)}
          variant={link.active ? "default" : "outline"}
          className={`px-3 py-1 border rounded  ${!link.url ? "pointer-events-none opacity-50" : ""}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
};

export default Pagination;
