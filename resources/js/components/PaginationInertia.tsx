import React from "react"
import { Button } from "./ui/button"

interface Link {
  url: string | null
  label: string
  active: boolean
}

interface Props {
  links: Link[]
  onPageChange: (url: string | null) => void
}

const PaginationInertia: React.FC<Props> = ({ links, onPageChange }) => {
  if (!links || links.length <= 1) return null

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {links.map((link, index) => {
        // Laravel/Inertia a veces devuelve etiquetas con HTML, limpiamos los símbolos
        const label = link.label.replace(/&laquo;|&raquo;/g, "").trim()

        return (
          <Button
            key={index}
            onClick={() => onPageChange(link.url)}
            disabled={!link.url}
            className={`px-3 py-1 ${
              link.active ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            }`}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default PaginationInertia
