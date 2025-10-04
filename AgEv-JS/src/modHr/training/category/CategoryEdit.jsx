import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import CategoryForm from "./CategoryForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const CategoryEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("categorysdetails", `/category/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Category"
        btn="Return"
        path="/hr/training/category/list"
      />
      <CategoryForm
        defaultValues={{
          categoryId: list.data.categoryId,
          categoryName: list.data.categoryName,
        }}
        action={refetch}
        btnText="Update"
        path="/category/update"
        returnPath="/hr/training/category/list"
      />
    </div>
  );
};

export default CategoryEdit;
