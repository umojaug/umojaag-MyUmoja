import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
// import PrintButton from "../../../components/button/PrintButton";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";

const MemberListSearch = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "crmmemberslist",
    `/crmmembers/list/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.loContactNumber.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.memberName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.contactNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.LoContactNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        employeePin,
        employeeName,
        loContactNumber,
        branchName,
        memberId,
        memberName,
        totalFamilyMembers,
        contactAddress,
        contactNumber,
        houseStatus,
        typeOfBusiness,
        monthlyIncome,
        othersIncome,
        loanFromOtherMfi,
        expectedLoanAmount,
        potentialForLoan,
        entryDate,
      }) => ({
        employeePin,
        employeeName,
        loContactNumber,
        branchName,
        memberId,
        memberName,
        totalFamilyMembers,
        contactAddress,
        houseStatus,
        contactNumber,
        typeOfBusiness,
        monthlyIncome,
        othersIncome,
        loanFromOtherMfi,
        expectedLoanAmount,
        potentialForLoan,
        entryDate,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/crmPdf/list/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="Member.csv"
          data={data.map(
            ({
              employeePin,
              employeeName,
              loContactNumber,
              branchName,
              memberId,
              memberName,
              totalFamilyMembers,
              contactAddress,
              houseStatus,
              contactNumber,
              typeOfBusiness,
              monthlyIncome,
              othersIncome,
              loanFromOtherMfi,
              expectedLoanAmount,
              potentialForLoan,
              entryDate,
            }) => ({
              employeePin,
              employeeName,
              loContactNumber,
              branchName,
              memberId,
              memberName,
              totalFamilyMembers,
              contactAddress,
              houseStatus,
              contactNumber: `\t${contactNumber}`,
              typeOfBusiness,
              monthlyIncome,
              othersIncome,
              loanFromOtherMfi,
              expectedLoanAmount,
              potentialForLoan,
              entryDate,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Loan Contact Number", key: "loContactNumber" },
            { label: "Branch Name", key: "branchName" },
            { label: "Member ID", key: "memberId" },
            { label: "Member Name", key: "memberName" },
            { label: "Total Family Members", key: "totalFamilyMembers" },
            { label: "Contact Address", key: "contactAddress" },
            { label: "House Status", key: "houseStatus" },
            { label: "Contact Number", key: "contactNumber" },
            { label: "Type of Business", key: "typeOfBusiness" },
            { label: "Monthly Income", key: "monthlyIncome" },
            { label: "Others Income", key: "othersIncome" },
            { label: "Loan from Other MFI", key: "loanFromOtherMfi" },
            { label: "Expected Loan Amount", key: "expectedLoanAmount" },
            { label: "Potential for Loan", key: "potentialForLoan" },
            { label: "Entry Date", key: "entryDate" },
          ]}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="LO Name / Branch / Member Name / Phone"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Loan Branchr" />
          <ListHeader label="Name of potential member" />
          <ListHeader label="Total family members" />
          <ListHeader label="Permanent/ Rented" />
          <ListHeader label="Type of business" />
          <ListHeader label="Monthly income from business" />
          <ListHeader label="Others income " />
          <ListHeader label="Loan from other MFI" />
          <ListHeader label="Expected loan amount" />
          <ListHeader label="Member potential for taking loan? Yes/No" />
          <ListHeader label="Entrt Date" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.memberId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <div className="grid">
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    PIN :
                  </span>
                  <span className="break-words">{item.employeePin}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Name :
                  </span>
                  <span className="break-words">{item.employeeName}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Contact Number :
                  </span>
                  <span className="break-words">{item.loContactNumber}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Branch :
                  </span>
                  <span className="break-words">{item.branchName}</span>
                </div>
              </div>
              <div className="grid">
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Name of potential member :
                  </span>
                  <span className="break-all">{item.memberName}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Phone :
                  </span>
                  <span className="break-words">{item.contactNumber}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Address :
                  </span>
                  <span className="break-words">{item.contactAddress}</span>
                </div>
              </div>
              <ListCol
                label="Total family members : "
                value={item.totalFamilyMembers}
                className="flex justify-start md:justify-center"
              />
              <ListCol
                label="Permanent/ Rented : "
                value={item.houseStatus}
                className="flex justify-start md:justify-center"
              />
              <ListCol
                label="Type of business : "
                value={item.typeOfBusiness}
                className="flex justify-start md:justify-center"
              />
              <ListCol
                label="Monthly income from business:"
                value={item.monthlyIncome}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Others income :"
                value={item.othersIncome}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Loan from other MFI:"
                value={item.loanFromOtherMfi}
                className="flex justify-start md:justify-center"
              />
              <ListCol
                label="Expected loan amount:"
                value={item.expectedLoanAmount}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label=" Member potential for taking loan? Yes/No:"
                value={item.potentialForLoan}
                className="flex justify-start md:justify-center"
              />
              <ListCol
                label="Entry Date: "
                value={format(new Date(item.entryDate), "dd/MMM/yyyy")}
              />
              {/* <div className="flex justify-end space-x-2">
                <PrintButton
                  path={`/joiningletter?Memberid=${item.MemberId}`}
                />
              </div> */}
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberListSearch;
