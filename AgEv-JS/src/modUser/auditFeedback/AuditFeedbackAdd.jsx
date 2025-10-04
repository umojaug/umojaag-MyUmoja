import AuditFeedbackForm from "./AuditFeedbackForm";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";

const AuditFeedbackAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    auditFeedbackId: "",
    WorkPlanId: id,
    whatWentWell: "",
    handledBetter: "",
    keyLearningPoints: "",
    interPersonalRatings: "",
    interPersonalComments: "",
    abilityToRatings: "",
    abilityToComments: "",
    auditFindingsRatings: "",
    auditFindingsComments: "",
    auditScopeRatings: "",
    auditScopeComments: "",
    agreementWithAuditeesRatings: "",
    agreementWithAuditeesComments: "",
    otherComments: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Feedback Add"
        btn="Return"
        path="/auditfeedback/list"
      />
      <AuditFeedbackForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditFeedback/create"
        returnPath="/auditfeedback/list"
      />
    </div>
  );
};

export default AuditFeedbackAdd;
