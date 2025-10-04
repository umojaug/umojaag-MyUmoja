import React from "react";
import EditButton from "../../components/button/EditButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";

const PayrollNoteList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrPayrollNote", "/emppayrollnotes/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Payroll Note" btn="Save" path="/hr/payroll/note/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Year" />
          <ListHeader label="Month" />
          <ListHeader label="Note" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.noteId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Year:" value={item.salaryYear} />
              <ListCol label="Month:" value={item.salaryMonth} />
              <ListCol label="Note:" value={item.note} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton path={`/hr/payroll/note/edit/${item.noteId}`} />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollNoteList;
