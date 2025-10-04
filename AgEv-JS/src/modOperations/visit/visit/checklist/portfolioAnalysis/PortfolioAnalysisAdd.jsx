import React from "react";
import PortfolioAnalysisForm from "./PortfolioAnalysisForm";
import { useParams } from "react-router-dom";
import GlobalModalForm from "../../../../../components/GlobalModalForm";

const PortfolioAnalysisAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    analysisId: 0,
    allVisitId: id,
    employeeId: "",
    borrowerMicroLoan: 0,
    borrowerSbl: 0,
    borrowerTotal: 0,
    loiMicroLoan: 0,
    loiSbl: 0,
    loiTotal: 0,
    borrowerTarget: 0,
    shortageNoOfBorrower: 0,
    overdueNo: 0,
    overdueAmount: 0,
    overdueInDeNo: 0,
    overdueInDeAmount: 0,
  };

  return (
    <GlobalModalForm title="Portfolio Analysis Add">
      <PortfolioAnalysisForm
        defaultValues={defaultValues}
        btnText="Save"
        path="/allPortfolioAnalysis/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default PortfolioAnalysisAdd;