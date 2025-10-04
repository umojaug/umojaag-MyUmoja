import Error from "../../../components/Error";
import { format } from "date-fns";
import BeneficiaryDependentEdit from "./BeneficiaryDependentEdit";
import BeneficiaryDependentAdd from "./BeneficiaryDependentAdd";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import DeleteButton from "../../../components/button/DeleteButton";

const BeneficiaryDependentList = () => {
  // const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/BeneficiaryDependent/list/`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Dependent Children Details List
        </h1>
        <BeneficiaryDependentAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Child Name" />
          <ListHeader label="Date of Birth" />
          <ListHeader label="ID No" />
          <ListHeader label="Child Address" />
          <ListHeader label="Guardian Name" />
          <ListHeader label="Guardian Contact" />
          <ListHeader label="Guardian Address" />
          <ListHeader label="Designation" />
          <ListHeader label="Email" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.childDependentId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Child Full Name:" value={item.childFullName} />
              <ListCol
                label="Date of Birth:"
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
              />
              <ListCol label="ID Number:" value={item.idNumber} />
              <ListCol label="Child Address:" value={item.childAddress} />
              <ListCol
                label="Guardian Full Name:"
                value={item.guardianFullName}
              />
              <ListCol label="Guardian Contact:" value={item.guardianContact} />
              <ListCol label="Guardian Address:" value={item.guardianAddress} />
              <ListCol
                label="Guardian Designation:"
                value={item.guardianDesignation}
              />
              <ListCol label="Guardian Email:" value={item.guardianEmail} />
              <div className="flex justify-end space-x-2">
                <BeneficiaryDependentEdit id={item.childDependentId} />
                <DeleteButton
                  action={refetch}
                  path={`/BeneficiaryDependent/delete/${item.childDependentId}`}
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

export default BeneficiaryDependentList;
