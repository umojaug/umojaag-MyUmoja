import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import EditButton from "../../../../components/button/EditButton";
import { AiOutlineFile } from "react-icons/ai";

const InvestigationDetailsList = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "evaluationdetailsinfo",
    `/auditSpInvestigation/detailsList/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="mt-2">
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Guideline" />
          <ListHeader label="Details Guideline" />
          <ListHeader label="Report inputs" />
          {/* <ListHeader label="Test Conclusion" /> */}
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.investigationDetailsId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Guideline :" value={item.guideline} />
              <ListCol label="Details Guideline :" value={item.testSteps} />
              <ListCol label="Report Inputs :" value={item.reportInputs} />
              {/* <ListCol label="Test Conclusion :" value={item.testConclusion} /> */}
              <div className="flex justify-end space-x-2">
                {item.evidences1 !== "" ? (
                  <a href={item.evidences1} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <></>
                )}
                {item.evidences2 !== "" ? (
                  <a href={item.evidences2} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <></>
                )}
                {item.evidences3 !== "" ? (
                  <a href={item.evidences3} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <></>
                )}
                <EditButton
                  path={`/audit/excution/special/investigation/details/edit/${item.investigationDetailsId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetailsList;
