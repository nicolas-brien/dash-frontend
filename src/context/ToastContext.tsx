import React from "react";

import type { ToastVariant } from "components/toast/Toast";

export const ToastContext = React.createContext<{
  show: (message: string, variant: ToastVariant) => void;
} | null>(null);