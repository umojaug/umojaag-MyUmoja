import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import PortfolioAnalysisSupervisorForm from "./PortfolioAnalysisSupervisorForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const PortfolioAnalysisSupervisorEdit = ({ id }) => {
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
      title="Edit Portfolio Comments"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <PortfolioAnalysisSupervisorForm
          defaultValues={{
            analysisId: list.data.analysisId,
            allVisitId: list.data.allVisitId,
            pinName: list.data.pinName,
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
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
            supervisorRemarks: list.data.supervisorRemarks,
          }}
          action={refetch}
          btnText="Update"
          path="/allPortfolioAnalysis/updateCommentsByManager"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default PortfolioAnalysisSupervisorEdit;
