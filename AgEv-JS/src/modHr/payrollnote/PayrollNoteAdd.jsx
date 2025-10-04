import React from "react";
import TopHeader from "../../components/TopHeader";
import PayrollNoteForm from "./PayrollNoteForm";

const PayrollNoteAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Current Month Payroll Note"
        btn="Return"
        path="/hr/payroll/note/list"
      />
      <PayrollNoteForm
        defaultValues={{
          noteId: "",
          note: "",
        }}
        action={() => {}}
        btnText="Save"
        path="/emppayrollnotes/create"
        returnPath="/hr/payroll/note/list"
      />
    </div>
  );
};

export default PayrollNoteAdd;
