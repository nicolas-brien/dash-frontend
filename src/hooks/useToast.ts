import React from "react";

import { ApiException, getErrorMessage } from "api/errors";
import { ToastContext } from "context/ToastContext";

type PromiseMessages<T = any> = {
  success?: string | ((result: T) => string);
  error?: string | ((err: any) => string);
};

export const useToast = () => {
    const ctx = React.useContext(ToastContext);

    if (!ctx) {
        throw new Error("useToast must be used within ToastProvider");
    }

    const { show } = ctx;

    return {
        success: (message: string) => show(message, "success"),

        error: (err: string | unknown, context?: string) => {
            if (typeof err === "string") {
                show(err, "error");
            } else if (err instanceof ApiException) {
                show(getErrorMessage(err, context), "error");
            } else {
                show("Error", "error");
            }
        },

        info: (message: string) => show(message, "info"),

        async promise<T>(promise: Promise<T>, messages: PromiseMessages<T>) {
            try {
                const result = await promise;

                if (messages.success) {
                    const msg =
                        typeof messages.success === "function"
                            ? messages.success(result)
                            : messages.success;

                    show(msg, "success");
                }

                return result;
            } catch (err) {
                if (messages.error) {
                    const msg =
                        typeof messages.error === "function"
                            ? messages.error(err)
                            : messages.error;

                    show(msg, "error");
                }

                throw err;
            }
        },
    };
};