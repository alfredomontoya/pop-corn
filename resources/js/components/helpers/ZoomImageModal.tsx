import React from "react"

interface ZoomImageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  src: string
  alt: string
}

const ZoomImageModal: React.FC<ZoomImageModalProps> = ({
  open,
  onOpenChange,
  src,
  alt,
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[1050]">
      <button
        className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition"
        onClick={() => onOpenChange(false)}
      >
        X
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded shadow-lg"
      />
    </div>
  )
}

export default ZoomImageModal
