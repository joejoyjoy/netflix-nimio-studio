import { createContext, useState, ReactNode, useEffect } from "react";

interface Params {
  success: boolean;
  error: {
    issues: [
      {
        message: string;
      }
    ];
  };
}

export interface ModalInterface {
  isModalOpen: boolean;
  modalStatus: string;
  openModal: (data: Params) => void;
  closeModal: () => void;
}

const defaultState = {
  isModalOpen: false,
  modalStatus: "",
  openModal: () => {},
  closeModal: () => {},
} as ModalInterface;

export const ModalContext = createContext(defaultState);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<string>("");

  const openModal = (data: Params) => {
    if (data.success) {
      setModalStatus("");
      setIsModalOpen(true);
    }
    if (!data.success) {
      setModalStatus(data.error.issues[0].message);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalStatus("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [isModalOpen]);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalStatus,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}