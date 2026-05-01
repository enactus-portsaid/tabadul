'use client';

import { forwardRef, useCallback, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Modal — Dialog overlay with backdrop, accessible focus management
// ---------------------------------------------------------------------------

export interface ModalProps {
  /** Whether the modal is currently visible */
  open: boolean;
  /** Called when the modal should close (backdrop click, Escape key) */
  onClose: () => void;
  /** Modal title displayed in the header */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Hides the close (×) button in the header */
  hideCloseButton?: boolean;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      size = 'md',
      hideCloseButton = false,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        ref={ref}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          ref={dialogRef}
          className={[
            'relative w-full rounded-2xl bg-surface shadow-xl',
            'animate-in fade-in zoom-in-95 duration-200',
            sizeClasses[size],
          ].join(' ')}
        >
          {/* Header */}
          {(title || !hideCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-text-primary"
                >
                  {title}
                </h2>
              )}
              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="ms-auto rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
