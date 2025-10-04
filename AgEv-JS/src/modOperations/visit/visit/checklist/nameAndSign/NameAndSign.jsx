import React from "react";
import { format } from "date-fns";

const NameAndSign = ({ data }) => {
  return (
    <div className="font-semibold py-3">
      <div className="grid grid-cols-1 md:grid-cols-3 pb-2">
        <p>
          Name of AM/RM/Supervisor :
          <span className="font-normal">{data.managerName} </span>
        </p>
        <p className="justify-self-center">
          Signature :<span className="font-normal">{data.managerName}</span>
        </p>
        <p className="justify-self-end">
          Date :
          <span className="font-normal">
            {format(new Date(data.visitDate), "dd/MMM/yyyy")}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <p>
          Acknowledged by BM,Name :
          <span className="font-normal">{data.branchManagerName}</span>
        </p>
        <p className="justify-self-center">
          Signature :
          <span className="font-normal">{data.branchManagerName}</span>
        </p>
        <p className="justify-self-end">
          Date :
          <span className="font-normal">
            {format(new Date(data.visitDate), "dd/MMM/yyyy")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NameAndSign;
