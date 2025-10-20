import React from "react"
import { Button } from "./ui/button"

interface Props {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ currentPage, lastPage, onPageChange }) => {
  if (lastPage <= 1) return null

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={`${page===currentPage?"default":"secondary"}`}
          className={`${page==currentPage?"":"cursor-pointer"}`}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination
