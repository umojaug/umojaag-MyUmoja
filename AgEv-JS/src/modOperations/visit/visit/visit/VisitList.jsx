import React from "react";
import DeleteButton from "../../../../components/button/DeleteButton";
import EditButton from "../../../../components/button/EditButton";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import { useGetData } from "../../../../hooks/dataApi";
import TaskButton from "../../../../components/button/TaskButton";
import { format } from "date-fns";
import PrintHeader from "../../../../components/PrintHeader";
import { useNavigate } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import PdfButton from "../../../../components/button/PdfButton";
import VisitClose from "../visitClose/VisitClose";

const VisitList = ({ dataForm }) => {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "visitbyuser",
    `/allVisit/listbyuser/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      visitDate,
      entryTime,
      visitEndDate,
      exitTime,
      branchName,
      visitType,
      stayOvernight,
      branchManagerName,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    }) => ({
      visitDate,
      entryTime,
      visitEndDate,
      exitTime,
      branchName,
      visitType,
      stayOvernight,
      branchManagerName,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    })
  );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/opsPdf/listbyuser/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="VisitDetails.csv"
          data={list.data.map(
            ({
              visitDate,
              entryTime,
              visitEndDate,
              exitTime,
              branchName,
              visitType,
              stayOvernight,
              branchManagerName,
              managerName,
              submitDate,
              submitRemarks,
              acceptRemarks,
              rejectRemarks,
            }) => ({
              visitDate,
              entryTime,
              visitEndDate,
              exitTime,
              branchName,
              visitType,
              stayOvernight,
              branchManagerName,
              managerName,
              submitDate,
              submitRemarks,
              acceptRemarks,
              rejectRemarks,
            })
          )}
          headers={[
            { label: "Visit Date", key: "visitDate" },
            { label: "Entry Time", key: "entryTime" },
            { label: "Visit End Date", key: "visitEndDate" },
            { label: "Exit Time", key: "exitTime" },
            { label: "Branch Name", key: "branchName" },
            { label: "Visit Type", key: "visitType" },
            { label: "Stay Overnight", key: "stayOvernight" },
            { label: "Branch Manager Name", key: "branchManagerName" },
            { label: "Manager Name", key: "managerName" },
            { label: "Submit Date", key: "submitDate" },
            { label: "Submit Remarks", key: "submitRemarks" },
            { label: "Accept Remarks", key: "acceptRemarks" },
            { label: "Reject Remarks", key: "rejectRemarks" },
          ]}
        />
      </div>

      <div className="list-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {list.data.length > 0 &&
            list.data.map((item, index) => (
              <div
                key={index}
                className="mb-2 relative p-4 rounded-md hover:shadow-md  bg-gray-200"
              >
                <div className="absolute top-0 left-0 bg-sky-500 p-2 text-white font-semibold  text-xs md:text-md rounded-md">
                  Visit Start Date :
                  {format(new Date(item.visitDate), "dd/MMM/yyyy")}-{" "}
                  {format(new Date(item.entryTime), "hh:mm aa")}
                </div>
                <div className="absolute top-0 right-0 bg-sky-500 p-2 text-white font-semibold text-xs md:text-md rounded-md">
                  Visit End Date :
                  {format(new Date(item.visitEndDate), "dd/MMM/yyyy")}-{" "}
                  {format(new Date(item.exitTime), "hh:mm aa")}
                </div>
                <h4 className="pt-6 pb-2 text-xl text-center font-bold text-sky-700">
                  Branch : {item.branchName}
                </h4>

                <div>
                  <div>
                    <div className="text-base text-primary">
                      <p>
                        <span className="font-medium">Visit Type:</span>
                        {item.visitType}
                      </p>
                      <p>
                        <span className="font-medium">Stay Overnight:</span>
                        {item.stayOvernight}
                      </p>
                      <p>
                        <span className="font-medium">Branch Manager:</span>
                        {item.branchManagerName}
                      </p>
                      <p>
                        <span className="font-medium">Supervisor:</span>
                        {item.managerName}
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="text-primary text-sm">
                        <span className="font-medium">Submit Remarks :</span>
                        {item.submitRemarks}
                      </p>
                      <p className="text-primary text-sm">
                        <span className="font-medium">Accept Remarks :</span>
                        {item.acceptRemarks}
                      </p>
                      <p className="text-primary text-sm">
                        <span className="font-medium">Reject Remarks :</span>
                        {item.rejectRemarks}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end space-x-2">
                    {item.isSubmit === 1 && (
                      <VisitClose
                        allVisitId={item.allVisitId}
                        returnPath="/ops/visit/list"
                      />
                    )}

                    <TaskButton
                      path={`/ops/visit/preview/${item.allVisitId}`}
                      btnColor={
                        item.isSubmit === 0 ? "btn-umojayellow" : "btn-gray"
                      }
                    />

                    {item.isSubmit === 0 ? (
                      <button
                        className="btn-teal w-12 h-10"
                        onClick={() =>
                          navigate(
                            `${`/ops/visit/doc/list/${item.allVisitId}`}`
                          )
                        }
                      >
                        <AiOutlineFileAdd size={24} />
                      </button>
                    ) : (
                      <button
                        className="btn-teal w-12 h-10"
                        onClick={() =>
                          navigate(
                            `${`/ops/visit/doc/preview/list/${item.allVisitId}`}`
                          )
                        }
                      >
                        <AiOutlineFileAdd size={24} />
                      </button>
                    )}

                    {item.isSubmit === 5 && (
                      <button
                        className="btn-yam w-12 h-10"
                        onClick={() =>
                          navigate(
                            `${`/ops/transportBill/add/${item.allVisitId}`}`
                          )
                        }
                      >
                        <MdOutlineTravelExplore size={24} />
                      </button>
                    )}

                    {item.isSubmit === 0 && (
                      <>
                        <EditButton
                          path={`/ops/visit/edit/${item.allVisitId}`}
                        />
                        <DeleteButton
                          action={refetch}
                          path={`/allVisit/delete/${item.allVisitId}`}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL: {data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitList;
