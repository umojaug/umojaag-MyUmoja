import React, { Fragment, useState } from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import VisitCloseRemark from "./VisitCloseRemarkAdd";
import DialogBodyComponents from "../../../../components/button/DialogBodyComponents";

const VisitClose = ({ allVisitId, returnPath }) => {
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
        className="btn-danger px-4 w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <AiFillCloseCircle size={24} />
      </div>

      <DialogBodyComponents closeModal={closeModal} isOpen={isOpen}>
        <VisitCloseRemark
          allVisitId={allVisitId}
          action={closeModal}
          returnPath={returnPath}
        />
      </DialogBodyComponents>
    </>
  );
};

export default VisitClose;
