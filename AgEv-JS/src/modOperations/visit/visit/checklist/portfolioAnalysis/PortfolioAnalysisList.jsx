import React from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import PortfolioAnalysisAddModal from "./PortfolioAnalysisAdd";
import PortfolioAnalysisEdit from "./PortfolioAnalysisEdit";
import PortfolioAnalysisBmEdit from "./PortfolioAnalysisBmEdit";
import PortfolioAnalysisSupervisorEdit from "./PortfolioAnalysisSupervisorEdit";

const PortfolioAnalysisList = ({ id, isSubmit, isBm, isManager }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allPortfolioAnalysis", `/allPortfolioAnalysis/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="flex justify-between align-items-center">
        <TopHeader title="1. Portfolio Analysis:" />
        <PortfolioAnalysisAddModal />
      </div>
      <div className="overflow-auto h-auto">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center h-24">
              <th></th>
              <th className="p-2 -rotate-45">LO/ABM</th>
              <th className="p-2 -rotate-45">Borrower Micro Loan</th>
              <th className="p-2 -rotate-45">Borrower SBL</th>
              <th className="p-2 -rotate-45">Borrower Total</th>
              <th className="p-2 -rotate-45">OS Micro Loan</th>
              <th className="p-2 -rotate-45">OS Sbl</th>
              <th className="p-2 -rotate-45">OS Interest Total</th>
              <th className="p-2 -rotate-45">Borrower target</th>
              <th className="p-2 -rotate-45">Shortage no. of borrower</th>
              <th className="p-2 -rotate-45">Overdue No </th>
              <th className="p-2 -rotate-45">Overdue Amount</th>
              <th className="p-2 -rotate-45">Overdue In/De No</th>
              <th className="p-2 -rotate-45">Overdue In/De Amount</th>
              <th className="px-20 -rotate-45">BM Comments</th>
              <th className="px-20 -rotate-45">Supervisor Comments</th>
              <th className="px-20 -rotate-45">Supervisor Remarks</th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex align-top">
                    {isSubmit === 0 && (
                      <div className="flex justify-end space-x-2">
                        <PortfolioAnalysisEdit id={item.analysisId} />
                        <DeleteButton
                          action={refetch}
                          path={`/allPortfolioAnalysis/delete/${item.analysisId}`}
                        />
                      </div>
                    )}
                    {isSubmit === 1 && isBm === true && (
                      <PortfolioAnalysisBmEdit id={item.analysisId} />
                    )}
                    {isSubmit === 1 && isManager === true && (
                      <PortfolioAnalysisSupervisorEdit id={item.analysisId} />
                    )}
                  </td>
                  <td className="p-2 align-top">{item.employeeName}</td>
                  <td className="p-2 align-top">{item.borrowerMicroLoan}</td>
                  <td className="p-2 align-top">{item.borrowerSbl}</td>
                  <td className="p-2 align-top">{item.borrowerTotal}</td>
                  <td className="p-2 align-top">
                    {item.loiMicroLoan.toLocaleString()}
                  </td>
                  <td className="p-2 align-top">
                    {item.loiSbl.toLocaleString()}
                  </td>
                  <td className="p-2 align-top">
                    {item.loiTotal.toLocaleString()}
                  </td>
                  <td className="p-2 align-top">{item.borrowerTarget}</td>
                  <td className="p-2 align-top">{item.shortageNoOfBorrower}</td>
                  <td className="p-2 align-top">{item.overdueNo}</td>
                  <td className="p-2 align-top">
                    {item.overdueAmount.toLocaleString("en-US")}
                  </td>
                  <td className="p-2 align-top">{item.overdueInDeNo}</td>
                  <td className="p-2 align-top">
                    {item.overdueInDeAmount.toLocaleString("en-US")}
                  </td>
                  <td className="p-2 align-top md:pr-2">{item.bmComments}</td>
                  <td className="p-2 align-top md:pr-2">
                    {item.supervisorComments}
                  </td>
                  <td className="p-2 align-top">{item.supervisorRemarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PortfolioAnalysisList;
