import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";

const AuditFeedbackOwnList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditFeedback", "/Auditfeedback/auditFeedbackOwn");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Feedback Own List"
        // btn="Save"
        // path="/audit/others/trackerfraud/add"
      />

      <SearchHeader placeholder="Branch" action={setQuery} />
      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="p-2 text-center whitespace-nowrap">
                What Went Well
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Handled Better
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Key Learning Points
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                InterPersonal Ratings
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                InterPersonal Comments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Ability To Ratings
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Ability To Comments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Findings Ratings
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                audit Findings Comments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Scope Ratings
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Scope Comments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Agreement With AuditeesRatings
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Agreement With Auditees Comments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Other Comments
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditFeedbackOwnList;
