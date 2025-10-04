import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

const GlobalModalForm = ({
  title,
  children,
  buttonIcon = <AiOutlinePlusCircle size={36} />,
  buttonClassName = "btn-animation text-primary",
  maxWidth = "max-w-3xl",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        closeModal: closeModal,
        action: (...args) => {
          if (child.props.action) {
            child.props.action(...args);
          }
          closeModal();
        },
      });
    }
    return child;
  });

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        {buttonIcon}
      </button>

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <DialogBackdrop
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className={`w-full ${maxWidth} transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all my-8`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="btn-animation text-danger"
                      onClick={closeModal}
                    >
                      <AiOutlineCloseCircle size={36} />
                    </button>
                  </div>

                  <div className="mt-4">{childrenWithProps}</div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GlobalModalForm;
