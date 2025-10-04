import React from "react";
import TopHeader from "../../../components/TopHeader";
import CategoryForm from "./CategoryForm";

const CategoryAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Category"
        btn="Return"
        path="/hr/training/category/list"
      />
      <CategoryForm
        defaultValues={{
          categoryId: "",
          categoryName: "",
        }}
        action={() => {}}
        btnText="Save"
        path="/category/create"
        returnPath="/hr/training/category/list"
      />
    </div>
  );
};

export default CategoryAdd;
