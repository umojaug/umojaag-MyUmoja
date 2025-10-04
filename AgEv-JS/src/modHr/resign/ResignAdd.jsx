import React from "react";
import TopHeader from "../../components/TopHeader";
import ResignForm from "./ResignForm";

const ResignAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Resign Create" btn="Return" path="/hr/resign/list" />
      <ResignForm path="/empresign/create" returnPath="/hr/resign/list" />
    </div>
  );
};

export default ResignAdd;
