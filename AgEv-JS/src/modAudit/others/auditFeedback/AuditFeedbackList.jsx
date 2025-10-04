import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import SearchHeader from "../../../components/SearchHeader";
import TopHeader from "../../../components/TopHeader";
import PrintHeader from "../../../components/PrintHeader";

const AuditFeedbackList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditFeedback", "/auditFeedback/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (item.auName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Feedback List" />
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="AuditDetails.csv"
          data={data.map(
            ({
              auditYear,
              monthName,
              auName,
              whatWentWell,
              handledBetter,
              keyLearningPoints,
              interPersonalRatings,
              interPersonalComments,
              abilityToRatings,
              abilityToComments,
              auditFindingsRatings,
              auditFindingsComments,
              auditScopeRatings,
              auditScopeComments,
              agreementWithAuditeesRatings,
              agreementWithAuditeesComments,
              otherComments,
              employeeName,
            }) => ({
              auditYear,
              monthName,
              auName,
              whatWentWell,
              handledBetter,
              keyLearningPoints,
              interPersonalRatings,
              interPersonalComments,
              abilityToRatings,
              abilityToComments,
              auditFindingsRatings,
              auditFindingsComments,
              auditScopeRatings,
              auditScopeComments,
              agreementWithAuditeesRatings,
              agreementWithAuditeesComments,
              otherComments,
              employeeName,
            })
          )}
          headers={[
            { label: "Audit Year", key: "auditYear" },
            { label: "Month Name", key: "monthName" },
            { label: "Audit Unit Name", key: "auName" },
            { label: "What Went Well", key: "whatWentWell" },
            { label: "Handled Better", key: "handledBetter" },
            { label: "Key Learning Points", key: "keyLearningPoints" },
            { label: "Interpersonal Ratings", key: "interPersonalRatings" },
            { label: "Interpersonal Comments", key: "interPersonalComments" },
            { label: "Ability to Ratings", key: "abilityToRatings" },
            { label: "Ability to Comments", key: "abilityToComments" },
            { label: "Audit Findings Ratings", key: "auditFindingsRatings" },
            { label: "Audit Findings Comments", key: "auditFindingsComments" },
            { label: "Audit Scope Ratings", key: "auditScopeRatings" },
            { label: "Audit Scope Comments", key: "auditScopeComments" },
            {
              label: "Agreement With Auditees Ratings",
              key: "agreementWithAuditeesRatings",
            },
            {
              label: "Agreement With Auditees Comments",
              key: "agreementWithAuditeesComments",
            },
            { label: "Other Comments", key: "otherComments" },
            { label: "Employee Name", key: "employeeName" },
          ]}
        />
      </div>

      <SearchHeader placeholder="Branch" action={setQuery} />
      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="p-2 text-center whitespace-pre-wrap">
                Audit Year
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">Month</th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Audit Entity
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                What went well with the just concluded Internal Audit review
                exercise?
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                What could have been handled better with the just concluded
                Internal audit review?
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                What have been your key learning points after this review?
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Inter personal relationship between the Auditors & the Auditees
                Ratings
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Inter personal relationship between the Auditors & the Auditees
                COMMENTS ON THE RATING AWARDED
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Ability to engage the auditee on issues observed during the
                course of the audit. Ratings
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Ability to engage the auditee on issues observed during the
                course of the audit. COMMENTS ON THE RATING AWARDED
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Timely communication of Audit findings to Auditees. Ratings
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Timely communication of Audit findings to Auditees. COMMENTS ON
                THE RATING AWARDED
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Timely communication of Audit Scope to Auditees. Ratings
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Timely communication of Audit Scope to Auditees. COMMENTS ON THE
                RATING AWARDED
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Agreement with Auditees on action plans for raised/ unresolved
                issues. Ratings
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Agreement with Auditees on action plans for raised/ unresolved
                issues. COMMENTS ON THE RATING AWARDED
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                Any Other Comments
              </th>
              <th className="p-2 text-center whitespace-pre-wrap">
                FeedBack Create
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr
                  key={item.fraudId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 align-top text-center">
                    {item.auditYear}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.monthName}
                  </td>
                  <td className="p-2 align-top text-center">{item.auName}</td>
                  <td className="p-2 align-top text-center">
                    {item.whatWentWell}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.handledBetter}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.keyLearningPoints}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.interPersonalRatings}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.interPersonalComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.abilityToRatings}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.abilityToComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditFindingsRatings}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditFindingsComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditScopeRatings}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditScopeComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.agreementWithAuditeesRatings}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.agreementWithAuditeesComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.otherComments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.employeeName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditFeedbackList;
