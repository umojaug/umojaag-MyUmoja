import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFromDb } from "./SelectList";
import SearchButton from "./button/SearchButton";

const schema = yup.object({
  branchId: yup.date().required("Required."),
});

const SelectBranchSearch = ({ action }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      branchId: "",
    },
    resolver: yupResolver(schema),
  });
  const { branchId } = errors;

  const onSubmit = async (formData) => {
    action({
      branchId: formData.branchId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-2">
        <SelectFromDb
          control={control}
          label="Branch"
          path={"/Branches/Select"}
          name="branchId"
          errorMessage={branchId?.message}
        />
        <div className="form-row w-full place-content-end">
          <SearchButton />
        </div>
      </div>
    </form>
  );
};

export default SelectBranchSearch;
