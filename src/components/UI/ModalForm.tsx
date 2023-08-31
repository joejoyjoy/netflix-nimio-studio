"use client";

import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import { BsExclamationCircle, BsCheckCircle } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

export default function ModalForm() {
  const { isModalOpen, modalStatus, closeModal } = useContext(ModalContext);

  return (
    <div
      className={`absolute inset-0 ${
        isModalOpen ? "flex" : "hidden"
      } items-center justify-center z-30 bg-black bg-opacity-70`}
    >
      <div className="relative rounded-lg bg-gray-700 w-full max-w-[435px]">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
          onClick={closeModal}
        >
          <IoCloseOutline className="w-6 h-6" />
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 w-12 h-12 text-gray-200">
            {modalStatus !== "" ? (
              <BsExclamationCircle className="mx-auto mb-4 w-12 h-12 text-gray-200" />
            ) : (
              <BsCheckCircle className="mx-auto mb-4 w-12 h-12 text-gray-200" />
            )}
          </div>
          <h3 className="mb-5 text-lg font-normal text-gray-400">
            {modalStatus !== "" ? modalStatus : "Successfully done!"}
          </h3>
          <button
            type="button"
            className={`text-white ${
              modalStatus !== ""
                ? "bg-red-600 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-800"
            } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
            onClick={closeModal}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
