import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DocumentsCategoryForm from "./DocumentsCategoryForm";

const DocumentsCategoryEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/documentsCategory/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Department"
        btn="Return"
        path="/hr/settings/documentsCategory/list"
      />
      <DocumentsCategoryForm
        defaultValues={{
          categoryId: list.data.categoryId,
          categoryName: list.data.categoryName,
        }}
        action={refetch}
        btnText="Update"
        path="/documentsCategory/update"
        returnPath="/hr/settings/department/list"
      />
    </div>
  );
};

export default DocumentsCategoryEdit;
