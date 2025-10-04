import React, { useState } from "react";

import TransportRejectRemarks from "./TransportRejectRemarks";
import DialogBodyComponents from "../../../components/button/DialogBodyComponents";

const TransportReject = ({ id, returnPath, path }) => {
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
        Return for Queries
      </div>

      <DialogBodyComponents closeModal={closeModal} isOpen={isOpen}>
        <TransportRejectRemarks
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

export default TransportReject;
