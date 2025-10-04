import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import PayrollNoteForm from "./PayrollNoteForm";

const PayrollNoteEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrPayrollNote", `/emppayrollnotes/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Payroll Note"
        btn="Return"
        path="/hr/payroll/note/list"
      />
      <PayrollNoteForm
        defaultValues={{
          noteId: list.data.noteId,
          note: list.data.note,
        }}
        action={refetch}
        btnText="Update"
        path="/emppayrollnotes/update"
        returnPath="/hr/payroll/note/list"
      />
    </div>
  );
};

export default PayrollNoteEdit;
