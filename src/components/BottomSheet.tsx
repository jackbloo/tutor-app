"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { IoMdClose } from "react-icons/io";

type BottomSheetProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function BottomSheet({isOpen, setIsOpen, children}:PropsWithChildren<BottomSheetProps> ) {
  if(!isOpen) return false
  return (
    <div className="fixed inset-0 flex items-end justify-center">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 w-full max-w-md bg-white p-5 rounded-t-2xl shadow-lg"
      >
        <div className="w-full flex justify-end">
        <IoMdClose onClick={() => setIsOpen(false)} />
        </div>
       {children}
      </motion.div>
    </div>
  );
}