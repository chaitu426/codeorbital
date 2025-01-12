import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#1e1e2e] rounded-lg shadow-lg p-6 w-full max-w-lg text-white"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            onClick={onClose}
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="mt-2">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
