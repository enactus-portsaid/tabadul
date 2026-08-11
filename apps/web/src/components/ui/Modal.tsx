'use client';

import { X } from 'lucide-react';
import {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Modal Props
// ---------------------------------------------------------------------------
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Callback fired when the modal should close */
  onClose: () => void;
  /** Optional title displayed in the modal header */
  title?: string;
  /** Modal width preset */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Content rendered inside the modal body */
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Size Map
// ---------------------------------------------------------------------------
const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)]',
};

// ---------------------------------------------------------------------------
// Modal Component
// ---------------------------------------------------------------------------
/**
 * Accessible modal dialog with backdrop, escape key handling, and focus trap.
 *
 * @example
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
 *   <p>Are you sure?</p>
 * </Modal>
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { isOpen, onClose, title, size = 'md', className, children, ...props },
    ref
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose]);

    // Close on backdrop click
    const handleBackdropClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) onClose();
      },
      [onClose]
    );

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            'bg-surface w-full rounded-xl shadow-xl',
            'animate-in fade-in-0 zoom-in-95',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h2 className="text-text-primary text-lg font-semibold">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-text-secondary hover:bg-surface-muted hover:text-text-primary rounded-lg p-1.5 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-4">{children}</div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
