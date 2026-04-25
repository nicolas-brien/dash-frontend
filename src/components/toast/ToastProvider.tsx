import React, { useState, useCallback } from "react";

import { Toast, type ToastVariant } from "./Toast";
import { ToastContext } from "../../context/ToastContext";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, variant: ToastVariant) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          variant={t.variant}
          onClose={() => remove(t.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};