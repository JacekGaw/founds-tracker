import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  ref?: React.Ref<ModalRef>;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ className = "", children, onClose, ref }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
    close() {
      if (dialog.current) {
        dialog.current.close();
      }
    },
  }));

  const handleClose = () => {
    if (onClose) onClose();
    if (dialog.current) dialog.current.close();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialog.current) {
      handleClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClick={handleBackdropClick}
      className={`
        ${className} 
        backdrop:bg-black/50 
        p-8 
        bg-bg 
        border 
        border-border 
        text-text 
        rounded-xl 
        shadow-lg  
        max-w-xl
        w-full
        m-auto
        max-h-[90vh]
        overflow-auto
      `}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="absolute right-2 top-2">
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            type="button"
            onClick={handleClose}
            className="p-2 cursor-pointer hover:text-secondary"
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;