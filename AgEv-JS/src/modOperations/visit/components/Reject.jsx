import React, { useState } from "react";

import RejectRemarks from "./RejectRemarks";
import DialogBodyComponents from "../../../components/button/DialogBodyComponents";

const Reject = ({ id, returnPath }) => {
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
        className="btn-danger w-full h-10"
        onClick={() => {
          openModal();
        }}
      >
        Reject
      </div>
      <DialogBodyComponents closeModal={closeModal} isOpen={isOpen}>
        <RejectRemarks
          defaultValues={{
            visitId: id,
            rejectRemarks: "",
          }}
          action={closeModal}
          returnPath={returnPath}
        />
      </DialogBodyComponents>
    </>
  );
};

export default Reject;
