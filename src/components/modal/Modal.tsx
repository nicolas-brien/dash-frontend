import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../button/Button';
import { ModalVariant, ModalSize } from './ModalTypes.ts';

import './modal.scss';

interface ModalProps {
  open: boolean;
  title: string;
  variant?: string;
  size?: string;

  onClose: () => void;

  ctaLabel?: string;
  ctaLoading?: boolean;
  onCta?: () => void;

  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Modal = ({
  open,
  title,
  variant = ModalVariant.Default,
  size = ModalSize.Medium,
  onClose,
  ctaLabel,
  onCta,
  footer,
  children,
}: ModalProps) => {
  const [mounted, setMounted] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    setMounted(true);
    document.body.style.overflow = 'hidden';
    lastFocusedElement.current = document.activeElement as HTMLElement;

    setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = '';
      lastFocusedElement.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleAnimationEnd = () => {
    if (!open) setMounted(false);
  };

  if (!mounted) return null;

  const renderFooter = () => {
    switch (variant) {
      case ModalVariant.Info:
        return (
          <Button variant="primary" onClick={onClose}>
            OK
          </Button>
        );

      case ModalVariant.Confirm:
      case ModalVariant.ConfirmDanger:
      case ModalVariant.ConfirmSuccess:
        return (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={
                variant === ModalVariant.ConfirmDanger
                  ? 'danger'
                  : variant === ModalVariant.ConfirmSuccess
                  ? 'success'
                  : 'primary'
              }
              onClick={onCta}
            >
              {ctaLabel}
            </Button>
          </>
        );

      case ModalVariant.Details:
        return null;

      default:
        return footer;
    }
  };

  return createPortal(
    <div
      className={`modal modal--${open ? 'open' : 'closing'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal__backdrop" onClick={onClose} />

      <div
        ref={panelRef}
        className={`
          modal__panel
          modal__panel--${variant}
          modal__panel--${size}
        `}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="modal__content">{children}</div>

        {variant !== ModalVariant.Details && (
          <footer className="modal__footer">
            {renderFooter()}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
