import TopHeader from "../../../components/TopHeader";
import BranchVisitForm from "./BranchVisitForm";

const BranchVisitAdd = () => {
  const defaultValues = {
    branchVisitId: "",
    branchId: "",
    visitDate: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Plan Add"
        btn="Return"
        path="/hr/branch/visit/plan/list"
      />
      <BranchVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/branchVisit/create"
        returnPath="/hr/branch/visit/plan/list"
      />
    </div>
  );
};

export default BranchVisitAdd;
