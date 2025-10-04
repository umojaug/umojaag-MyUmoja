import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFromDb } from "./SelectList";

const schema = yup.object({
  noticeId: yup.string().max(50),
});

const SearchNotice = ({ action }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      noticeId: "",
    },
    resolver: yupResolver(schema),
  });
  const { noticeId } = errors;

  const onSubmit = async (formData) => {
    action(formData.noticeId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        <SelectFromDb
          control={control}
          label="Notice Title"
          path="/notices/select"
          name="noticeId"
          errorMessage={noticeId?.message}
        />

        <div className="form-row w-full place-content-end">
          <button type="submit" className="btn-umojayellow h-9">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchNotice;
