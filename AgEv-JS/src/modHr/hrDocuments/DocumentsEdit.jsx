import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import DocumentsForm from "./DocumentsForm";

const DocumentsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrNotice", `/documents/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Notice" btn="Return" path="/hr/notice/list" />
      <NoticeForm
        defaultValues={{
          documentsId: list.data.documentsId,
          title: list.data.title,
          categoryId: list.data.categoryId,
          fileUrl: list.data.fileUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/documents/update"
        returnPath="/hr/notice/list"
      />
    </div>
  );
};

export default DocumentsEdit;
