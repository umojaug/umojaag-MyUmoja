import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import PortfolioAnalysisForm from "./PortfolioAnalysisForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";

const PortfolioAnalysisEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allPortfolioAnalysisdetails",
    `/allPortfolioAnalysis/details/${id}`
  );

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Portfolio Analysis"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {!isLoading && !isError && (
        <PortfolioAnalysisForm
          defaultValues={{
            analysisId: list.data.analysisId,
            allVisitId: list.data.allVisitId,
            employeeId: list.data.employeeId,
            borrowerMicroLoan: list.data.borrowerMicroLoan,
            borrowerSbl: list.data.borrowerSbl,
            borrowerTotal: list.data.borrowerTotal,
            loiMicroLoan: list.data.loiMicroLoan,
            loiSbl: list.data.loiSbl,
            loiTotal: list.data.loiTotal,
            borrowerTarget: list.data.borrowerTarget,
            shortageNoOfBorrower: list.data.shortageNoOfBorrower,
            overdueNo: list.data.overdueNo,
            overdueAmount: list.data.overdueAmount,
            overdueInDeNo: list.data.overdueInDeNo,
            overdueInDeAmount: list.data.overdueInDeAmount,
          }}
          action={refetch}
          btnText="Update"
          path="/allPortfolioAnalysis/update"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default PortfolioAnalysisEdit;
