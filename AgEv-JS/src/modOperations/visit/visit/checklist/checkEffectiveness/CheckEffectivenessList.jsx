import React from "react";
import RmCheckList from "./rmCheck/RmCheckList";
import AmCheckList from "./amCheck/AmCheckList";
import BmCheckList from "./bmCheck/BmCheckList";
import TopHeader from "../../../../../components/TopHeader";

const CheckEffectivenessList = ({ id, isSubmit, isManager, isBm }) => {
  return (
    <>
      <TopHeader title="7. Checking of BM, AM, RM& OPM role and its effectiveness:" />

      <div className="card w-full max-w-screen-xl gap-1">
        <BmCheckList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <AmCheckList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <RmCheckList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
      </div>
    </>
  );
};

export default CheckEffectivenessList;
