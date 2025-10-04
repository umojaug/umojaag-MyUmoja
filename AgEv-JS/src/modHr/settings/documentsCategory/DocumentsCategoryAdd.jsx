import React from "react";
import TopHeader from "../../../components/TopHeader";
import DocumentsCategoryForm from "./DocumentsCategoryForm";

const DocumentsCategoryAdd = () => {
  const defaultValues = {
    categoryId: "",
    categoryName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Category"
        btn="Return"
        path="/hr/settings/documentsCategory/list"
      />
      <DocumentsCategoryForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/documentsCategory/create"
        returnPath="/hr/settings/documentsCategory/list"
      />
    </div>
  );
};

export default DocumentsCategoryAdd;
