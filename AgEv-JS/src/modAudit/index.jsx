import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const BranchExcutionList = lazy(() =>
  import("./auditExecution/auditBranch/BranchExcutionList")
);

const BranchExcutionEdit = lazy(() =>
  import("./auditExecution/auditBranch/BranchExcutionEdit")
);

const RegionExcutionList = lazy(() =>
  import("./auditExecution/auditRegion/RegionExcutionList")
);

const RegionExcutionEdit = lazy(() =>
  import("./auditExecution/auditRegion/RegionExcutionEdit")
);

const AuditTestAreaList = lazy(() =>
  import("./settings/auditTestArea/AuditAreaList")
);
const AuditTestAreaAdd = lazy(() =>
  import("./settings/auditTestArea/AuditAreaAdd")
);
const AuditTestAreaEdit = lazy(() =>
  import("./settings/auditTestArea/AuditAreaEdit")
);

const AuditTestStepsList = lazy(() =>
  import("./settings/auditTestSteps/AuditTestStepsList")
);
const AuditTestStepsAdd = lazy(() =>
  import("./settings/auditTestSteps/AuditTestStepsAdd")
);
const AuditTestStepsEdit = lazy(() =>
  import("./settings/auditTestSteps/AuditTestStepsEdit")
);

const BranchChecklist = lazy(() =>
  import("./auditExecution/auditBranch/BranchChecklist")
);

const RegionCheckList = lazy(() =>
  import("./auditExecution/auditRegion/RegionCheckList")
);
const ChecklistDetails = lazy(() =>
  import("./auditExecution/auditChecklist/ChecklistDetails")
);

const Settings = lazy(() => import("./settings/Settings"));

const AuditYearOpen = lazy(() => import("./settings/auditYear/AuditYearOpen"));

const AuditSummaryEdit = lazy(() => import("./auditSummary/AuditSummaryEdit"));
const AuditSummaryList = lazy(() => import("./auditSummary/AuditSummaryList"));

const AuditWorkplanAdd = lazy(() =>
  import("./auditPlanning/auditWorkplan/AuditWorkplanAdd")
);
const AuditWorkplanEdit = lazy(() =>
  import("./auditPlanning/auditWorkplan/AuditWorkplanEdit")
);
const AuditWorkplanList = lazy(() =>
  import("./auditPlanning/auditWorkplan/AuditWorkplanList")
);
const MeetingMinutesEdit = lazy(() =>
  import("./auditExecution/auditChecklist/entryExitMeeting/MeetingMinutesEdit")
);
const AuditWorkStepEdit = lazy(() =>
  import(
    "./auditExecution/auditChecklist/detailsSteps/AuditExcutionUnitStepsEdit"
  )
);

const AuditInherentRiskAdd = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskAdd")
);
const AuditInherentRiskEdit = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskEdit")
);
const AuditInherentRiskList = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskList")
);

const AuditResidualRiskAdd = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskAdd")
);
const AuditResidualRiskEdit = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskEdit")
);
const AuditResidualRiskList = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskList")
);

const AuditweightageAdd = lazy(() =>
  import("./settings/auditWeightage/WeightageAdd")
);
const AuditweightageEdit = lazy(() =>
  import("./settings/auditWeightage/WeightageEdit")
);
const AuditWeightageList = lazy(() =>
  import("./settings/auditWeightage/WeightageList")
);

const PreviousYearBranch = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranch")
);
const PreviousYearBranchAdd = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranchAdd")
);
const PreviousYearBranchFileUpload = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranchFileUpload")
);
const AuditPlan = lazy(() => import("./auditPlanning/auditPlaning/AuditPlan"));

const AuditPlaningDetailsAdd = lazy(() =>
  import("./auditPlanning/auditPlaning/AuditPlaningDetailsAdd")
);

const AuditPlaningDetailsEdit = lazy(() =>
  import("./auditPlanning/auditPlaning/AuditPlaningDetailsEdit")
);

const DepartmentAuditTestAdd = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestAdd")
);
const DepartmentAuditTestEdit = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestEdit")
);
const DepartmentAuditTestList = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestList")
);

const SpecialInvestigationAdd = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationAdd")
);
const SpecialInvestigationEdit = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationEdit")
);
const SpecialInvestigationList = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationList")
);

const InvestigationAdd = lazy(() =>
  import("./auditExecution/specialInvestigation/InvestigationAdd")
);
const InvestigationEdit = lazy(() =>
  import("./auditExecution/specialInvestigation/InvestigationEdit")
);
const InvestigationList = lazy(() =>
  import("./auditExecution/specialInvestigation/InvestigationList")
);

const InvestigationDetailsEdit = lazy(() =>
  import(
    "./auditExecution/specialInvestigation/specialInvestigationDetails/InvestigationDetailsEdit"
  )
);
const InvestigationDetails = lazy(() =>
  import(
    "./auditExecution/specialInvestigation/specialInvestigationDetails/InvestigationDetails"
  )
);

const DepartmentalInvestigationDetailsEdit = lazy(() =>
  import(
    "./auditExecution/departmentalInvestigation/departmentalInvestigationDetailsReport/DepartmentalInvestigationDetailsEdit"
  )
);
const DepartmentalInvestigationDetails = lazy(() =>
  import(
    "./auditExecution/departmentalInvestigation/departmentalInvestigationDetailsReport/DepartmentalInvestigationDetails"
  )
);

const DepartmentalInvestigationAdd = lazy(() =>
  import(
    "./auditExecution/departmentalInvestigation/DepartmentalInvestigationAdd"
  )
);
const DepartmentalInvestigationEdit = lazy(() =>
  import(
    "./auditExecution/departmentalInvestigation/DepartmentalInvestigationEdit"
  )
);
const DepartmentalInvestigationList = lazy(() =>
  import(
    "./auditExecution/departmentalInvestigation/DepartmentalInvestigationList"
  )
);

//menu

const Planning = lazy(() => import("./auditPlanning/Planning"));
const OthersAudit = lazy(() => import("./others/OthersAudit"));
const Execution = lazy(() => import("./auditExecution/Execution"));
const Reporting = lazy(() => import("./auditReporting/Reporting"));

// settings
const PrimaryRootCauseAdd = lazy(() =>
  import("./settings/primaryRootCause/PrimaryRootCauseAdd")
);
const PrimaryRootCauseEdit = lazy(() =>
  import("./settings/primaryRootCause/PrimaryRootCauseEdit")
);
const PrimaryRootCauseList = lazy(() =>
  import("./settings/primaryRootCause/PrimaryRootCauseList")
);

const RiskImplicationAdd = lazy(() =>
  import("./settings/riskImplication/RiskImplicationAdd")
);
const RiskImplicationEdit = lazy(() =>
  import("./settings/riskImplication/RiskImplicationEdit")
);
const RiskImplicationList = lazy(() =>
  import("./settings/riskImplication/RiskImplicationList")
);

const TypeOfFraudAdd = lazy(() =>
  import("./settings/typeOfFraud/TypeOfFraudAdd")
);
const TypeOfFraudEdit = lazy(() =>
  import("./settings/typeOfFraud/TypeOfFraudEdit")
);
const TypeOfFraudList = lazy(() =>
  import("./settings/typeOfFraud/TypeOfFraudList")
);

// Reporting

// const AuditBranchReportAdd = lazy(() =>
//   import("./auditReporting/auditBranchReport/AuditBranchReportAdd")
// );
const AuditBranchReportEdit = lazy(() =>
  import("./auditReporting/auditBranchReport/AuditBranchReportEdit")
);
const AuditBranchReportList = lazy(() =>
  import("./auditReporting/auditBranchReport/AuditBranchReportList")
);

const AuditDepartmentReportAdd = lazy(() =>
  import("./auditReporting/auditDepartmentReport/AuditDepartmentReportAdd")
);
const AuditDepartmentReportEdit = lazy(() =>
  import("./auditReporting/auditDepartmentReport/AuditDepartmentReportEdit")
);
const AuditDepartmentReportList = lazy(() =>
  import("./auditReporting/auditDepartmentReport/AuditDepartmentReportList")
);

// const AuditRegionReportAdd = lazy(() =>
//   import("./auditReporting/auditRegionReport/AuditRegionReportAdd")
// );
const AuditRegionReportEdit = lazy(() =>
  import("./auditReporting/auditRegionReport/AuditRegionReportEdit")
);
const AuditRegionReportList = lazy(() =>
  import("./auditReporting/auditRegionReport/AuditRegionReportList")
);

const AuditSpecialInvestigationReportEdit = lazy(() =>
  import(
    "./auditReporting/auditSpecialInvestigationReport/AuditSpecialInvestigationReportEdit"
  )
);
const AuditSpecialInvestigationReportList = lazy(() =>
  import(
    "./auditReporting/auditSpecialInvestigationReport/AuditSpecialInvestigationReportList"
  )
);

const AuditSpecialInvestigationReportAdd = lazy(() =>
  import(
    "./auditReporting/auditSpecialInvestigationReport/AuditSpecialInvestigationReportAdd"
  )
);

// const AuditBranchReportDetailsAdd = lazy(() =>
//   import(
//     "./auditReporting/auditBranchReport/auditBranchReportDetails/AuditBranchReportDetailsAdd"
//   )
// );
const AuditBranchReportDetailsEdit = lazy(() =>
  import(
    "./auditReporting/auditBranchReport/auditBranchReportDetails/AuditBranchReportDetailsEdit"
  )
);
const AuditBranchReportDetailsList = lazy(() =>
  import(
    "./auditReporting/auditBranchReport/auditBranchReportDetails/AuditBranchReportDetailsList"
  )
);

const AuditDepartmentReportDetailsAdd = lazy(() =>
  import(
    "./auditReporting/auditDepartmentReport/auditDepartmentReportDetails/AuditDepartmentReportDetailsAdd"
  )
);
const AuditDepartmentReportDetailsEdit = lazy(() =>
  import(
    "./auditReporting/auditDepartmentReport/auditDepartmentReportDetails/AuditDepartmentReportDetailsEdit"
  )
);
const AuditDepartmentReportDetailsList = lazy(() =>
  import(
    "./auditReporting/auditDepartmentReport/auditDepartmentReportDetails/AuditDepartmentReportDetailsList"
  )
);

// const AuditRegionReportDetailsAdd = lazy(() =>
//   import(
//     "./auditReporting/auditRegionReport/auditRegionReportDetails/AuditRegionReportDetailsAdd"
//   )
// );

const AuditRegionReportDetailsEdit = lazy(() =>
  import(
    "./auditReporting/auditRegionReport/auditRegionReportDetails/AuditRegionReportDetailsEdit"
  )
);
const AuditRegionReportDetailsList = lazy(() =>
  import(
    "./auditReporting/auditRegionReport/auditRegionReportDetails/AuditRegionReportDetailsList"
  )
);

const AreaOfReviewAdd = lazy(() =>
  import("./settings/areaOfReview/AreaOfReviewAdd")
);
const AreaOfReviewEdit = lazy(() =>
  import("./settings/areaOfReview/AreaOfReviewEdit")
);
const AreaOfReviewList = lazy(() =>
  import("./settings/areaOfReview/AreaOfReviewList")
);

const AuditTrackerIssueAdd = lazy(() =>
  import("./others/auditTrackerIssue/AuditTrackerIssueAdd")
);
const AuditTrackerIssueEdit = lazy(() =>
  import("./others/auditTrackerIssue/AuditTrackerIssueEdit")
);
const AuditTrackerIssueList = lazy(() =>
  import("./others/auditTrackerIssue/AuditTrackerIssueList")
);

const AuditTrackerFraudList = lazy(() =>
  import("./others/auditTrackerFraud/AuditTrackerFraudList")
);

const AuditFeedbackList = lazy(() =>
  import("./others/auditFeedback/AuditFeedbackList")
);

const CommentsList = lazy(() =>
  import("./auditReporting/superviorComments/CommentsList")
);
const DepartmentCommentsList = lazy(() =>
  import("./auditReporting/superviorComments/CommentsList")
);
const RegionCommentsList = lazy(() =>
  import("./auditReporting/superviorComments/CommentsList")
);
const SpecialInCommentsList = lazy(() =>
  import("./auditReporting/superviorComments/CommentsList")
);

const AuditWorkplanCloseList = lazy(() =>
  import("./others/auditClose/AuditWorkplanCloseList")
);
const InvestigationDetailsAdd = lazy(() =>
  import(
    "./auditExecution/specialInvestigation/specialInvestigationDetails/InvestigationDetailsAdd"
  )
);

const RiskRegisterList = lazy(() =>
  import("./others/riskRegister/RiskRegisterList")
);
const RiskRegisterDetailsList = lazy(() =>
  import("./others/riskRegister/details/RiskRegisterDetailsList")
);
export {
  Dashboard,
  BranchExcutionList,
  BranchExcutionEdit,
  BranchChecklist,
  ChecklistDetails,
  Settings,
  AuditTestAreaList,
  AuditTestAreaAdd,
  AuditTestAreaEdit,
  AuditTestStepsList,
  AuditTestStepsAdd,
  AuditTestStepsEdit,
  AuditYearOpen,
  AuditSummaryEdit,
  AuditSummaryList,
  AuditWorkplanAdd,
  AuditWorkplanEdit,
  AuditWorkplanList,
  MeetingMinutesEdit,
  AuditWorkStepEdit,
  AuditInherentRiskAdd,
  AuditInherentRiskEdit,
  AuditInherentRiskList,
  AuditResidualRiskAdd,
  AuditResidualRiskEdit,
  AuditweightageAdd,
  AuditweightageEdit,
  AuditWeightageList,
  PreviousYearBranch,
  PreviousYearBranchAdd,
  AuditResidualRiskList,
  PreviousYearBranchFileUpload,
  AuditPlan,
  AuditPlaningDetailsEdit,
  SpecialInvestigationAdd,
  SpecialInvestigationEdit,
  SpecialInvestigationList,
  InvestigationAdd,
  InvestigationEdit,
  InvestigationList,
  InvestigationDetailsEdit,
  InvestigationDetails,
  DepartmentalInvestigationAdd,
  DepartmentalInvestigationEdit,
  DepartmentalInvestigationList,
  DepartmentalInvestigationDetailsEdit,
  DepartmentalInvestigationDetails,
  DepartmentAuditTestList,
  DepartmentAuditTestAdd,
  DepartmentAuditTestEdit,
  AuditDepartmentReportAdd,
  AuditDepartmentReportEdit,
  AuditDepartmentReportList,
  AuditSpecialInvestigationReportList,
  AuditSpecialInvestigationReportEdit,
  AuditSpecialInvestigationReportAdd,
  Planning,
  OthersAudit,
  Execution,
  Reporting,
  PrimaryRootCauseAdd,
  PrimaryRootCauseEdit,
  PrimaryRootCauseList,
  RiskImplicationAdd,
  RiskImplicationEdit,
  RiskImplicationList,
  TypeOfFraudAdd,
  TypeOfFraudEdit,
  TypeOfFraudList,
  AuditTrackerFraudList,
  RegionExcutionList,
  RegionCheckList,
  RegionExcutionEdit,
  // AuditRegionReportAdd,
  AuditRegionReportEdit,
  AuditRegionReportList,
  // AuditBranchReportAdd,
  AuditBranchReportEdit,
  AuditBranchReportList,
  AreaOfReviewList,
  AreaOfReviewEdit,
  AreaOfReviewAdd,
  AuditTrackerIssueAdd,
  AuditTrackerIssueEdit,
  AuditTrackerIssueList,
  AuditPlaningDetailsAdd,
  AuditFeedbackList,
  CommentsList,
  SpecialInCommentsList,
  RegionCommentsList,
  DepartmentCommentsList,
  AuditDepartmentReportDetailsAdd,
  AuditDepartmentReportDetailsEdit,
  AuditDepartmentReportDetailsList,
  // AuditRegionReportDetailsAdd,
  AuditRegionReportDetailsEdit,
  AuditRegionReportDetailsList,
  // AuditBranchReportDetailsAdd,
  AuditBranchReportDetailsEdit,
  AuditBranchReportDetailsList,
  AuditWorkplanCloseList,
  InvestigationDetailsAdd,
  RiskRegisterList,
  RiskRegisterDetailsList,
};
