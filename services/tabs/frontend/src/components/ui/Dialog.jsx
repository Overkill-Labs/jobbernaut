import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Generic modal dialog primitive.
 * Props:
 *   isOpen  — boolean
 *   onClose — () => void
 *   children
 */
export default function Dialog({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[var(--surface)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {children}
      </div>
    </div>,
    document.body,
  );
}
