import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import EditButton from "../../components/button/EditButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";

const MemberList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("crmmembers", "/crmmembers/listbylo");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Member List" btn="Save" path="/crm/member/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Name of potential member" />
          <ListHeader label="Total family members" />
          <ListHeader label="Address" />
          <ListHeader label="Permanent/ Rented" />
          <ListHeader label="Phone number" />
          <ListHeader label="Type of business" />
          <ListHeader label="Monthly income from business" />
          <ListHeader label="Others income " />
          <ListHeader label="Loan from other MFI" />
          <ListHeader label="Expected loan amount" />
          <ListHeader label="Member potential for taking loan? Yes/No" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.memberId}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol
                label="Name of potential member : "
                value={item.memberName}
              />
              <ListCol
                label="Total family members : "
                value={item.totalFamilyMembers}
              />
              <ListCol label="Address : " value={item.contactAddress} />
              <ListCol label="Permanent/ Rented : " value={item.houseStatus} />
              <ListCol label="Phone number : " value={item.contactNumber} />
              <ListCol
                label="Type of business : "
                value={item.typeOfBusiness}
              />
              <ListCol
                label="Monthly income from business:"
                value={item.monthlyIncome}
              />
              <ListCol label=" Others income :" value={item.othersIncome} />
              <ListCol
                label=" Loan from other MFI:"
                value={item.loanFromOtherMfi}
              />
              <ListCol
                label=" Expected loan amount:"
                value={item.expectedLoanAmount}
              />
              <ListCol
                label=" Member potential for taking loan? Yes/No:"
                value={item.potentialForLoan}
              />
              <div className="flex justify-end space-x-2">
                <EditButton path={`/crm/member/edit/${item.memberId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/crmmembers/delete/${item.memberId}`}
                />
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

export default MemberList;
