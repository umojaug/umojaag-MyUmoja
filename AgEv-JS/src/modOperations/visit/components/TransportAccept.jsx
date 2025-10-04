import React, { useState } from "react";

import TransportAcceptRemarks from "./TransportAcceptRemarks";
import DialogBodyComponents from "../../../components/button/DialogBodyComponents";

const TransportAccept = ({ id, returnPath, path }) => {
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
        className="btn-umojayellow w-full h-10"
        onClick={() => {
          openModal();
        }}
      >
        Accept
      </div>

      <DialogBodyComponents closeModal={closeModal} isOpen={isOpen}>
        <TransportAcceptRemarks
          defaultValues={{
            travelId: id,
            rejectRemarks: "",
          }}
          action={closeModal}
          path={path}
          returnPath={returnPath}
        />
      </DialogBodyComponents>
    </>
  );
};

export default TransportAccept;
