import { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { useNavigate } from "react-router";
import SaveButton from "../../components/button/SaveButton";

const schema = yup.object({
  // executiveSummery: yup.string().required("Required."),
});

const MonthlyBoardForm = ({
  defaultValues,
  path,
  action,
  returnPath,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    reportMonth,
    reportYear,
    preparedBy,
    reportDate,
    executiveSummary,
    significantDevelopments,
    totalHeadcount,
    turnoverRateMonth,
    turnoverRateYTD,
    seniorLevelNewHires,
    seniorLevelVacancies,
    trainingUpdates,
    legalCaseUpdates,
    systemPerformance,
    cybersecurityUpdates,
    itSupportGaps,
    auditPlanExecution,
    emergingRisks,
    fraudSummary,
    riskSummary,
    mitigationSteps,
    upcomingPlans,
    boardInputNeeded,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("reportId", formData.reportId);
    data.append("executiveSummary", formData.executiveSummary);
    data.append("significantDevelopments", formData.significantDevelopments);
    data.append("totalHeadcount", formData.totalHeadcount);
    data.append("turnoverRateMonth", formData.turnoverRateMonth);
    data.append("turnoverRateYTD", formData.turnoverRateYTD);
    data.append("seniorLevelNewHires", formData.seniorLevelNewHires);
    data.append("seniorLevelVacancies", formData.seniorLevelVacancies);
    data.append("trainingUpdates", formData.trainingUpdates);
    data.append("legalCaseUpdates", formData.legalCaseUpdates);
    data.append("systemPerformance", formData.systemPerformance);
    data.append("cybersecurityUpdates", formData.cybersecurityUpdates);
    data.append("itSupportGaps", formData.itSupportGaps);
    data.append("auditPlanExecution", formData.auditPlanExecution);
    data.append("emergingRisks", formData.emergingRisks);
    data.append("fraudSummary", formData.fraudSummary);
    data.append("riskSummary", formData.riskSummary);
    data.append("mitigationSteps", formData.mitigationSteps);
    data.append("upcomingPlans", formData.upcomingPlans);
    data.append("boardInputNeeded", formData.boardInputNeeded);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        reset();
        toast.success("Update successful!");
        setTimeout(() => navigate(returnPath), 300);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-2">
        <TextArea
          control={control}
          name="executiveSummary"
          label="Executive Summary"
          errorMessage={executiveSummary?.message}
        />
        <TextArea
          control={control}
          name="significantDevelopments"
          label="Significant Developments"
          errorMessage={significantDevelopments?.message}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pb-2">
        <Input
          name="totalHeadcount"
          label="Total Headcount"
          type="text"
          register={register}
          errorMessage={totalHeadcount?.message}
        />
        <Input
          name="turnoverRateMonth"
          label="Turnover Rate Month"
          type="text"
          register={register}
          errorMessage={turnoverRateMonth?.message}
        />
        <Input
          name="turnoverRateYTD"
          label="Turnover Rate YTD"
          type="text"
          register={register}
          errorMessage={turnoverRateYTD?.message}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-2">
        <TextArea
          control={control}
          name="seniorLevelNewHires"
          label="Senior Level New Hires"
          errorMessage={seniorLevelNewHires?.message}
        />
        <TextArea
          control={control}
          name="seniorLevelVacancies"
          label="Senior Level Vacancies"
          errorMessage={seniorLevelVacancies?.message}
        />
        <TextArea
          control={control}
          name="trainingUpdates"
          label="Training Updates"
          errorMessage={trainingUpdates?.message}
        />
        <TextArea
          control={control}
          name="legalCaseUpdates"
          label="Legal Case Updates"
          errorMessage={legalCaseUpdates?.message}
        />
        <TextArea
          control={control}
          name="systemPerformance"
          label="System Performance"
          errorMessage={systemPerformance?.message}
        />
        <TextArea
          control={control}
          name="cybersecurityUpdates"
          label="Cybersecurity Updates"
          errorMessage={cybersecurityUpdates?.message}
        />
        <TextArea
          control={control}
          name="itSupportGaps"
          label="IT Support Gaps"
          errorMessage={itSupportGaps?.message}
        />
        <TextArea
          control={control}
          name="auditPlanExecution"
          label="Audit Plan Execution"
          errorMessage={auditPlanExecution?.message}
        />
        <TextArea
          control={control}
          name="emergingRisks"
          label="Emerging Risks"
          errorMessage={emergingRisks?.message}
        />
        <TextArea
          control={control}
          name="fraudSummary"
          label="Fraud Summary"
          errorMessage={fraudSummary?.message}
        />
        <TextArea
          control={control}
          name="riskSummary"
          label="Risk Summary"
          errorMessage={riskSummary?.message}
        />
        <TextArea
          control={control}
          name="mitigationSteps"
          label="Mitigation Steps"
          errorMessage={mitigationSteps?.message}
        />
        <TextArea
          control={control}
          name="upcomingPlans"
          label="Upcoming Plans"
          errorMessage={upcomingPlans?.message}
        />
        <TextArea
          control={control}
          name="boardInputNeeded"
          label="Board Input Needed"
          errorMessage={boardInputNeeded?.message}
        />
      </div>
      <div className="flex space-x-2 justify-center pt-4">
        <SaveButton btnText="Update" disabled={submitting} />
      </div>
    </form>
  );
};

export default MonthlyBoardForm;
