import React from "react";

interface ImageGalleryProps {
  files: File[];                        // archivos subidos
  preview: string[];                     // URLs de previsualización
  principalIndex: number | null;        // índice de imagen principal
  onSelectPrincipal: (i: number) => void;
  onFilesChange?: (files: File[]) => void; // opcional, para actualizar archivos
}

export function ImageGallery({
  files,
  preview,
  principalIndex,
  onSelectPrincipal,
  onFilesChange,
}: ImageGalleryProps) {

  const handleRemove = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange?.(newFiles);
  };

  return (
    <div className="flex gap-3 mt-3 flex-wrap">
      {preview.map((src, i) => (
        <div
          key={i}
          className={`relative border rounded-lg p-1 cursor-pointer ${principalIndex === i ? "border-green-500" : ""}`}
        >
          <img
            src={src}
            alt={`preview-${i}`}
            className="w-24 h-24 object-cover rounded-lg"
            onClick={() => onSelectPrincipal(i)}
          />
          {principalIndex === i && (
            <span className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1 rounded">
              Principal
            </span>
          )}
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
