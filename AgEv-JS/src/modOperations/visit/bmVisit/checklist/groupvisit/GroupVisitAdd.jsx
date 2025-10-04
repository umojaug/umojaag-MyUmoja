import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import GroupVisitForm from "./GroupVisitForm";
import { useParams } from "react-router-dom";

const GroupVisitAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsBmGroupvisitId: 0,
    bmVisitId: id,
    loName: "",
    groupName: "",
    totalBorrower: 0,
    numberOfBorrower: 0,
    passbookChecked: 0,
    passbookMissing: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="1.Today’s group visit information:"
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <GroupVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmGroupVisit/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default GroupVisitAdd;
