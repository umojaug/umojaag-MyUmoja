import React, { Fragment, useState } from "react";

import AcceptRemarks from "./AcceptRemarks";
import DialogBodyComponents from "../../../components/button/DialogBodyComponents";

const Accept = ({ id }) => {
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
        <AcceptRemarks
          defaultValues={{
            evaluationId: id,
            rejectRemarks: "",
          }}
          action={closeModal}
        />
      </DialogBodyComponents>
    </>
  );
};

export default Accept;
