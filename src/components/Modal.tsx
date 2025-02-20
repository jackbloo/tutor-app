"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({isOpen, setIsOpen, children}:PropsWithChildren<ModalProps> ) {
  if(!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-end justify-center">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Modal */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 w-full max-w-md bg-white p-5 shadow-lg h-screen"
      >
        <div className="w-full flex justify-start">
        <IoArrowBackOutline onClick={() => setIsOpen(false)} />
        </div>
       {children}
      </motion.div>
    </div>
  );
}