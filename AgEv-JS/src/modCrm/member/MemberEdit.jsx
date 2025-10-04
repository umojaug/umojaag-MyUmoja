import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import MemberForm from "./MemberForm";

const MemberEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("cmrmembersupdate", `/crmmembers/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Member" btn="Return" path="/crm/member/list" />
      <MemberForm
        defaultValues={{
          memberId: list.data.memberId,
          memberName: list.data.memberName,
          totalFamilyMembers: list.data.totalFamilyMembers,
          contactAddress: list.data.contactAddress,
          houseStatus: list.data.houseStatus,
          contactNumber: list.data.contactNumber,
          typeOfBusiness: list.data.typeOfBusiness,
          monthlyIncome: list.data.monthlyIncome,
          othersIncome: list.data.othersIncome,
          loanFromOtherMfi: list.data.loanFromOtherMfi,
          expectedLoanAmount: list.data.expectedLoanAmount,
          potentialForLoan: list.data.potentialForLoan,
        }}
        action={refetch}
        btnText="Update"
        path="/crmmembers/update"
        returnPath="/crm/member/list"
      />
    </div>
  );
};

export default MemberEdit;
