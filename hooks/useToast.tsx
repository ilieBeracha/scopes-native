import { useState, useCallback } from "react";

export interface ToastConfig {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
}

export function useToast() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    message: "",
    type: "error",
    duration: 3000,
  });

  const showToast = useCallback((config: ToastConfig) => {
    setToastConfig(config);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  return {
    toastVisible,
    toastConfig,
    showToast,
    hideToast,
  };
}