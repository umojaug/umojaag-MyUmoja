import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import BeneficiaryPrimaryAdd from "./BeneficiaryPrimaryAdd";
import BeneficiaryPrimaryEdit from "./BeneficiaryPrimaryEdit";
import DeleteButton from "../../../components/button/DeleteButton";

const BeneficiaryPrimaryList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/beneficiaryPrimary/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Beneficiary List
        </h1>
        <BeneficiaryPrimaryAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Sl. No" />
          <ListHeader label="Name" />
          <ListHeader label="Relationship" />
          <ListHeader label="Received Benefit(%)" />
          <ListHeader label="Date of Birth" />
          <ListHeader label="ID Number" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Email Address" />
          <ListHeader label="Address" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.beneficiaryId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Serial No (Sl. No):" value={item.slNo} />
              <ListCol label="Full Name:" value={item.name} />
              <ListCol label="Relationship:" value={item.relationship} />
              <ListCol
                label="Received Benefit Percentage (%):"
                value={item.receivedBenefitPercentage}
              />
              {/* <ListCol label="Date of Birth (DOB):" value={item.dob} /> */}
              <ListCol
                label="Date of Birth"
                value={format(new Date(item.dob), "dd/MMM/yyyy")}
              />
              <ListCol
                label="ID Number (NIN or Passport):"
                value={item.idNumber}
              />
              <ListCol
                label="Contact Number:"
                value={item.beneficiaryContactNumber}
              />
              <ListCol label="Email Address:" value={item.beneficiaryEmail} />
              <ListCol
                label="Residential Address:"
                value={item.beneficiaryAddress}
              />
              <div className="flex justify-end space-x-2">
                {/* <TaskButton
                  path={`/my/details/beneficiary/primary/${item.beneficiaryId}`}
                /> */}
                <BeneficiaryPrimaryEdit id={item.beneficiaryId} />
                <DeleteButton
                  action={refetch}
                  path={`/beneficiaryPrimary/delete/${item.beneficiaryId}`}
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

export default BeneficiaryPrimaryList;
