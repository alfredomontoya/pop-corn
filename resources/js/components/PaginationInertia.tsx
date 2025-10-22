import { PaginationLink } from "@/interfaces/Venta.Interface"
import React from "react"
import { Button } from "./ui/button"

type PaginationProps = {
  links: PaginationLink[]
  onPageChange: (url: string) => void
}

const PaginationInertia: React.FC<PaginationProps> = ({ links, onPageChange }) => {
  if (!links || links.length <= 1) return null

  // Índice de la página activa
  const activeIndex = links.findIndex((l) => l.active)

  // Función para decidir qué páginas mostrar
  const buildVisibleLinks = () => {
    const total = links.length
    const pages: (PaginationLink | { label: string; url: null; active: false })[] = []

    const addEllipsis = () => pages.push({ label: "...", url: null, active: false })

    // Siempre incluye la primera página
    pages.push(links[0])

    // Rango de páginas alrededor de la actual
    const start = Math.max(activeIndex - 2, 1)
    const end = Math.min(activeIndex + 2, total - 2)

    if (start > 1) addEllipsis()

    for (let i = start; i <= end; i++) {
      pages.push(links[i])
    }

    if (end < total - 2) addEllipsis()

    // Siempre incluye la última página
    pages.push(links[total - 1])

    return pages
  }

  const visibleLinks = buildVisibleLinks()

  return (
    <div className="flex justify-center mt-4 overflow-x-auto no-scrollbar">
      <div className="flex space-x-1 px-2">
        {visibleLinks.map((link, index) => {
          let label = link.label
            .replace(/&laquo;/g, "«")
            .replace(/&raquo;/g, "»")
            .replace(/Previous/i, "Anterior")
            .replace(/Next/i, "Siguiente")

          const isEllipsis = label === "..."

          return (
            <Button
              key={index}
              disabled={isEllipsis || !link.url}
              variant={link.active ? "default" : "secondary"}
              className={isEllipsis ? "pointer-events-none opacity-70" : ""}
              onClick={() => link.url && onPageChange(link.url)}
            >
              {label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default PaginationInertia
