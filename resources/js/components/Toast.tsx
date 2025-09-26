import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
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
      <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Toast;
