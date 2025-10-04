import React from "react";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import DetailsList from "./DetailsList";
import Transfer from "./Transfer";
import Promotion from "./Promotion";
import BeneficiaryDependentList from "./beneficiaryChildren/BeneficiaryDependentList";
import BeneficiaryPrimaryList from "./beneficiary/BeneficiaryPrimaryList";

const MyDetails = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employeeinfodetails", "/employeeinfo/details");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <DetailsList employee={list.data.employee} />
      <Transfer transfer={list.data.transfer} />
      <Promotion promotion={list.data.promotion} />
      <BeneficiaryDependentList />
      <BeneficiaryPrimaryList />
    </div>
  );
};

export default MyDetails;
