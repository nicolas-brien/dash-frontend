import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "./toast.scss";

export type ToastVariant = "success" | "error" | "info";

interface ToastProps {
    message: string;
    variant?: ToastVariant;
    duration?: number; // ms
    onClose?: () => void;
}

const EXIT_ANIMATION_MS = 200;

export const Toast: React.FC<ToastProps> = ({
    message,
    variant = "info",
    duration = 10000,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);
    const [remaining, setRemaining] = useState(duration);
    const [paused, setPaused] = useState(false);

    const startTimeRef = useRef<number>(Date.now());
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        startTimer(remaining);
        return clearTimer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startTimer = (time: number) => {
        clearTimer();
        startTimeRef.current = Date.now();

        timeoutRef.current = window.setTimeout(() => {
            triggerClose();
        }, time);
    };

    const clearTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const triggerClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, EXIT_ANIMATION_MS);
    };

    const handleMouseEnter = () => {
        if (paused) return;
        setPaused(true);
        clearTimer();
        setRemaining((prev) => prev - (Date.now() - startTimeRef.current));
    };

    const handleMouseLeave = () => {
        if (!paused) return;
        setPaused(false);
        startTimer(remaining);
    };

    if (!visible) return null;

    return createPortal(
        <div
            className={`toast toast--${variant} ${closing ? "toast--closing" : ""
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="toast__message">{message}</span>

            <button className="toast__close" onClick={triggerClose}>
                ×
            </button>

            <div
                className="toast__progress"
                style={{
                    animationDuration: `${duration}ms`,
                    animationPlayState: paused ? "paused" : "running",
                }}
            />
        </div>,
        document.body
    );
};
