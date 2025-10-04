import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import StaffTypeForm from "./StaffTypeForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const StaffTypeEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("StaffType", `/staffTypes/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Staff Type"
        btn="Return"
        path="/hr/settings/staff-type/list"
      />
      <StaffTypeForm
        defaultValues={{
          staffTypeId: list.data.staffTypeId,
          staffTypeName: list.data.staffTypeName,
        }}
        action={refetch}
        btnText="Update"
        path="/staffTypes/update"
        returnPath="/hr/settings/staff-type/list"
      />
    </div>
  );
};

export default StaffTypeEdit;
