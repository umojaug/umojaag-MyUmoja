import TopHeader from "../../../components/TopHeader";
import ManagerMappingForm from "./ManagerMappingForm";

const ManagerMappingAdd = () => {
  const defaultValues = {
    designationId: "",
    mappedTo: "In Country",
    managerFirst: "",
    managerSecond: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Manager Mapping Add"
        btn="Return"
        path="/hr/settings/manager-mapping/list"
      />
      <ManagerMappingForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/managerMapping/create"
        returnPath="/hr/settings/manager-mapping/list"
      />
    </div>
  );
};

export default ManagerMappingAdd;
