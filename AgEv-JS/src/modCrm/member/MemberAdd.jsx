import React from "react";
import TopHeader from "../../components/TopHeader";
import MemberForm from "./MemberForm";

const MemberAdd = () => {
  const defaultValues = {
    memberId: "",
    memberName: "",
    totalFamilyMembers: "",
    contactAddress: "",
    houseStatus: "",
    contactNumber: "",
    typeOfBusiness: "",
    monthlyIncome: "",
    othersIncome: "",
    loanFromOtherMfi: "",
    expectedLoanAmount: "",
    potentialForLoan: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="New Member" btn="Return" path="/crm/member/list" />
      <MemberForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/crmmembers/create"
        returnPath="/crm/member/list"
      />
    </div>
  );
};

export default MemberAdd;
