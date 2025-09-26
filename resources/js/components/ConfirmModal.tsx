import React from 'react';
import { Button } from './ui/button';

interface Categoria {
  id: number;
  nombre: string;
}

interface ConfirmModalProps {
    text: string
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ text, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">¿Deseas eliminar la categoría <strong>{text}</strong>?</p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant={"secondary"}>Cancelar</Button>
          <Button onClick={onConfirm} variant={"destructive"}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
