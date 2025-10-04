import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import DisciplinaryFormUpdate from "./DisciplinaryFormUpdate";

const EmployeesEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "empdisciplinaryletter",
    `/empdisciplinaryletter/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Disciplinary Letter Update"
        btn="Return"
        path="/hr/disciplinary/list"
      />
      <DisciplinaryFormUpdate
        defaultValues={{
          disciplinaryLetterId: list.data.disciplinaryLetterId,
          letterType: list.data.letterType,
          issueDate: new Date(list.data.issueDate),
          title: list.data.title,
          particulars: list.data.particulars,
        }}
        action={refetch}
        btnText="Update"
        path="/empdisciplinaryletter/update"
        returnPath="/hr/disciplinary/list"
      />
    </div>
  );
};

export default EmployeesEdit;
