import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import CategoryForm from "./CategoryForm";

const CategoryEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("counselingtopicdetails", `/adTicketCategory/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Ticket Category"
        btn="Return"
        path="/admin/settings/category/list"
      />
      <CategoryForm
        defaultValues={{
          categoryId: list.data.categoryId,
          categoryName: list.data.categoryName,
        }}
        action={refetch}
        btnText="Update"
        path="/adTicketCategory/update"
        returnPath="/admin/settings/category/list"
      />
    </div>
  );
};

export default CategoryEdit;
