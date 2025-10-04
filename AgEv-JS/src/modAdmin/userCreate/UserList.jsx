import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { HashLoading } from "../../components/Loading";
import EditButton from "../../components/button/EditButton";
import { format } from "date-fns";
import SearchHeader from "../../components/SearchHeader";

const UserList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("member", "/member/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.memberPin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        memberId,
        memberPin,
        fullName,
        phoneNumber,
        dateOfBirth,
        nid,
        productName,
      }) => ({
        memberId,
        memberPin,
        fullName,
        phoneNumber,
        dateOfBirth,
        nid,
        productName,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Member List" btn="Save" path={"/sacco/ac/member/add"} />
      <SearchHeader
        action={setQuery}
        placeholder="Member name / Phone Number/ PIN "
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="PIN" />
          <ListHeader label="Member Name" />
          <ListHeader label="Phone Number" />
          <ListHeader label="Date Of Birth" />
          <ListHeader label="NID" />
          <ListHeader label="Savings Product" />
          <ListHeader label="" />
        </div>
        <div>
          {data.length > 0 &&
            data.map((item) => (
              <div
                key={item.memberId}
                className="grid grid-cols-1 md:grid-cols-7 list-body"
              >
                <ListCol label="PIN :" value={item.memberPin} />
                <ListCol label="Member Name :" value={item.fullName} />
                <ListCol label="Phone Number :" value={item.phoneNumber} />
                <ListCol
                  label="Date Of Birth :"
                  value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
                />
                <ListCol label="NID :" value={item.nid} />
                <ListCol label="Savings Product :" value={item.productName} />

                <div className="flex justify-end space-x-2">
                  <EditButton path={`/sacco/ac/member/edit/${item.memberId}`} />
                </div>
              </div>
            ))}
        </div>
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
