import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import DialogBodyComponents from "../../../../../components/button/DialogBodyComponents";

const ImageView = ({ imageUrl }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="btn-success w-12 h-10 "
        onClick={() => {
          openModal();
        }}
      >
        <BsImage size={24} />
      </div>

      <DialogBodyComponents closeModal={closeModal} isOpen={isOpen}>
        <div className="relative h-full inline-block w-full max-w-3xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-lighter shadow-xl rounded-2xl">
          <div className="absolute right-2 top-2">
            <button
              className="btn-header btn-animation text-danger"
              onClick={() => {
                closeModal();
              }}
            >
              <AiOutlineCloseCircle size={36} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="pt-4">
              <img
                className="w-screen object-contain"
                src={`https://drive.google.com/thumbnail?id=${imageUrl}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </DialogBodyComponents>
    </>
  );
};

export default ImageView;
