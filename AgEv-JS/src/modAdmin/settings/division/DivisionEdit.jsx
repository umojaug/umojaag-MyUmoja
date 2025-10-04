import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import DivisionForm from "./DivisionForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const DivisionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDivision", `/divisions/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Division"
        btn="Return"
        path="/admin/settings/division/list"
      />
      <DivisionForm
        defaultValues={{
          divisionId: list.data.divisionId,
          divisionName: list.data.divisionName,
        }}
        action={refetch}
        btnText="Update"
        path="/divisions/update"
        returnPath="/admin/settings/division/list"
      />
    </div>
  );
};

export default DivisionEdit;
