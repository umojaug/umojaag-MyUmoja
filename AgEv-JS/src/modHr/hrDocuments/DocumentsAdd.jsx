import React from "react";
import TopHeader from "../../components/TopHeader";
import DocumentsForm from "./DocumentsForm";

const DocumentsAdd = () => {
  const defaultValues = {
    documentsId: "",
    title: "",
    categoryId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Documents Create" btn="Return" path="/hr/documents/list" />
      <DocumentsForm
        defaultValues={defaultValues}
        action={() => {}}
        
        btnText="Save"
        path="/documents/create"
        returnPath="/hr/notice/list"
      />
    </div>
  );
};

export default DocumentsAdd;
