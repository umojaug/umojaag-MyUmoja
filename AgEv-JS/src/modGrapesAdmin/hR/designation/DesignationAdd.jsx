import TopHeader from "../../../components/TopHeader";
import DesignationForm from "./DesignationForm";

const DesignationAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Designation Change" btn="Return" path="/grapes/hr" />
      <DesignationForm
        path="/DesignationChange/Change"
        returnPath="/grapes/hr"
      />
    </div>
  );
};

export default DesignationAdd;
