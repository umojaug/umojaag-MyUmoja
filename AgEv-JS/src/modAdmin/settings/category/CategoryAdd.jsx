import React from "react";
import TopHeader from "../../../components/TopHeader";
import CategoryForm from "./CategoryForm";

const CategoryAdd = () => {
  const defaultValues = {
    categoryId: "",
    categoryName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add New Ticket Category"
        btn="Return"
        path="/admin/settings/category/list"
      />
      <CategoryForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/adTicketCategory/create"
        returnPath="/admin/settings/category/list"
      />
    </div>
  );
};

export default CategoryAdd;
