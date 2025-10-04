import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import AuditTrackerIssueModelEdit from "./AuditTrackerIssueModelEdit";
import { format } from "date-fns";

const AuditTrackerIssueList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("auditTrackerIssue", "/auditTrackerIssue/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      (item.departmentName !== null &&
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.regionName !== null &&
        item.regionName.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.auditIssue !== null &&
        item.auditIssue.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.risk !== null &&
        item.risk.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.comments !== null &&
        item.comments.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.recommendations !== null &&
        item.recommendations.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.branchName !== null &&
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Tracker Issue List" />
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="AuditTrackerIssueReport.csv"
          data={data.map(
            ({
              auditType,
              year,
              monthOfAudit,
              departmentName,
              branchName,
              regionName,
              auditIssue,
              risk,
              recommendations,
              implementedByName,
              commitmentDate,
              implementationDate,
              issueStatus,
              inChargeName,
              followUpDate,
              comments,
            }) => ({
              auditType,
              year,
              monthOfAudit,
              departmentName,
              branchName,
              regionName,
              auditIssue,
              risk,
              recommendations,
              implementedByName,
              commitmentDate,
              implementationDate,
              issueStatus,
              inChargeName,
              followUpDate,
              comments,
            })
          )}
          headers={[
            { label: "AuditT ype", key: "auditType" },
            { label: "Year", key: "year" },
            { label: "Month Of Audit", key: "monthOfAudit" },
            { label: "Department Name", key: "departmentName" },
            { label: "Branch Name", key: "branchName" },
            { label: "Region Name", key: "regionName" },
            { label: "Audit Issue", key: "auditIssue" },
            { label: "Risk", key: "risk" },
            { label: "Recommendations", key: "recommendations" },
            { label: "Implemented By Name", key: "implementedByName" },
            { label: "Commitmen tDate", key: "commitmentDate" },
            { label: "Implementation Date", key: "implementationDate" },
            { label: "Issue Status", key: "issueStatus" },
            { label: "IA In ChargeName", key: "inChargeName" },
            { label: "Follow UpDate", key: "followUpDate" },
            { label: "Comments", key: "comments" },
          ]}
        />
      </div>
      <SearchHeader
        placeholder="Department / Region / Involved / Fraudster / Perpetrated / Witness / Observations / Recommendations / Response"
        action={setQuery}
      />
      <div className="overflow-auto h-96  border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Type of Audit
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Year of Audit
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Month Of Audit
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Department
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Branch / HQ
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Region
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Audit Issue
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Risk
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Recommendations
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Implemented By
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Commitment Date
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Implementation Date
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Status
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                IA In Charge
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Follow Up Date
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Comments
              </th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr
                  key={item.auditTrackerIssueId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between align-top text-center space-x-2">
                    <AuditTrackerIssueModelEdit id={item.auditTrackerIssueId} />
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditType}
                  </td>
                  <td className="p-2 align-top text-center">{item.year}</td>
                  <td className="p-2 align-top text-center">
                    {item.monthOfAudit}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.departmentName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.branchName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.regionName}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.auditIssue}
                  </td>
                  <td className="p-2 align-top text-center">{item.risk}</td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.implementedByName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.commitmentDate !== "1980-12-31T00:00:00" ? (
                      format(new Date(item.commitmentDate), "dd/MMM/yyyy")
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.implementationDate !== "1980-12-31T00:00:00" ? (
                      format(new Date(item.implementationDate), "dd/MMM/yyyy")
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.issueStatus}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.inChargeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.followUpDate !== "1980-12-31T00:00:00" ? (
                      format(new Date(item.followUpDate), "dd/MMM/yyyy")
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">{item.comments}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrackerIssueList;
