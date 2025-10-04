import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import PreviewButton from "../../components/button/PreviewButton";
import TopHeader from "../../components/TopHeader";

const MyDisciplinaryLetterList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("mydisciplinaryletter", `/mydisciplinaryletter/list/`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.map(
    ({ disciplinaryLetterId, letterType, issueDate, title, particulars }) => ({
      disciplinaryLetterId,
      letterType,
      issueDate,
      title,
      particulars,
    })
  );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Disciplinary Letter" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Letter Type" />
          <ListHeader label="Issue Date" />
          <ListHeader label="Subject" className="md:col-span-3" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empDisciplinaryId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Letter Type: " value={item.letterType} />
              <ListCol
                label="Issue Date: "
                value={format(new Date(item.issueDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Subject : "
                value={item.title}
                className="md:col-span-3"
              />
              <div className="flex justify-end space-x-2">
                <PreviewButton
                  path={`/my/disciplinary/letter/preview/${item.disciplinaryLetterId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDisciplinaryLetterList;
