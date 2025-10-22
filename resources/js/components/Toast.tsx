import React, { useEffect, useState } from 'react';

interface ToastProps {
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title='Mensaje', message, duration = 5000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!show || !message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-foreground text-secondary px-4 py-2 rounded-sm shadow-lg">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
