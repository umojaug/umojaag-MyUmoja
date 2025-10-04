import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as ModAudit from "./index";

const auditRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="audit" element={<ModAudit.Dashboard />} />
      <Route
        path="audit/excution/branch/list"
        element={<ModAudit.BranchExcutionList />}
      />
      <Route
        path="audit/excution/region/list"
        element={<ModAudit.RegionExcutionList />}
      />
      <Route
        path="audit/excution/branch/edit/:id"
        element={<ModAudit.BranchExcutionEdit />}
      />
      <Route
        path="audit/excution/region/edit/:id"
        element={<ModAudit.RegionExcutionEdit />}
      />
      <Route
        path="audit/settings/inherentrisk/list"
        element={<ModAudit.AuditInherentRiskList />}
      />
      <Route
        path="audit/settings/inherentrisk/add"
        element={<ModAudit.AuditInherentRiskAdd />}
      />
      <Route
        path="audit/settings/inherentrisk/edit/:id"
        element={<ModAudit.AuditInherentRiskEdit />}
      />
      <Route
        path="audit/settings/residualrisk/list"
        element={<ModAudit.AuditResidualRiskList />}
      />
      <Route
        path="audit/settings/residualrisk/add"
        element={<ModAudit.AuditResidualRiskAdd />}
      />
      <Route
        path="audit/settings/residualrisk/edit/:id"
        element={<ModAudit.AuditResidualRiskEdit />}
      />
      <Route
        path="audit/settings/weightage/list"
        element={<ModAudit.AuditWeightageList />}
      />
      <Route
        path="audit/settings/weightage/add"
        element={<ModAudit.AuditweightageAdd />}
      />
      <Route
        path="audit/settings/weightage/edit/:id"
        element={<ModAudit.AuditweightageEdit />}
      />
      <Route
        path="audit/settings/testarea/list"
        element={<ModAudit.AuditTestAreaList />}
      />
      <Route
        path="audit/settings/testarea/add"
        element={<ModAudit.AuditTestAreaAdd />}
      />
      <Route
        path="audit/settings/testarea/edit/:id"
        element={<ModAudit.AuditTestAreaEdit />}
      />
      <Route
        path="audit/settings/teststeps/add"
        element={<ModAudit.AuditTestStepsAdd />}
      />
      <Route
        path="audit/settings/teststeps/list"
        element={<ModAudit.AuditTestStepsList />}
      />
      <Route
        path="audit/settings/teststeps/edit/:id"
        element={<ModAudit.AuditTestStepsEdit />}
      />
      <Route
        path="audit/excution/branch/checklist/:id"
        element={<ModAudit.BranchChecklist />}
      />
      <Route
        path="audit/excution/region/checklist/:id"
        element={<ModAudit.RegionCheckList />}
      />
      <Route
        path="audit/checkdetails/:areaType/:excutionId/:areaId"
        element={<ModAudit.ChecklistDetails />}
      />
      <Route path="audit/settings" element={<ModAudit.Settings />} />
      <Route
        path="audit/settings/auditYear"
        element={<ModAudit.AuditYearOpen />}
      />
      <Route
        path="audit/workplanSummary/edit/:id"
        element={<ModAudit.AuditSummaryEdit />}
      />
      <Route
        path="audit/workplanSummary/list"
        element={<ModAudit.AuditSummaryList />}
      />
      <Route
        path="audit/workplan/add"
        element={<ModAudit.AuditWorkplanAdd />}
      />
      <Route
        path="audit/workplan/edit/:id"
        element={<ModAudit.AuditWorkplanEdit />}
      />
      <Route
        path="audit/workplan/list"
        element={<ModAudit.AuditWorkplanList />}
      />
      <Route
        path="audit/meetingMinutes/edit/:id"
        element={<ModAudit.MeetingMinutesEdit />}
      />
      <Route
        path="audit/excution/checklist/details/edit/:id"
        element={<ModAudit.AuditWorkStepEdit />}
      />
      <Route
        path="audit/settings/previousdata/list"
        element={<ModAudit.PreviousYearBranch />}
      />
      <Route
        path="audit/settings/previousdata/add"
        element={<ModAudit.PreviousYearBranchAdd />}
      />
      <Route
        path="audit/settings/previousdata/fileUpload"
        element={<ModAudit.PreviousYearBranchFileUpload />}
      />
      <Route path="audit/planning" element={<ModAudit.AuditPlan />} />
      <Route
        path="audit/planning/details/edit/:id"
        element={<ModAudit.AuditPlaningDetailsEdit />}
      />
      <Route
        path="audit/planning/details/:id/add"
        element={<ModAudit.AuditPlaningDetailsAdd />}
      />
      {/* Report  */}
      <Route
        path="audit/settings/departmentAuditTest/list"
        element={<ModAudit.DepartmentAuditTestList />}
      />
      <Route
        path="audit/settings/departmentAuditTest/add"
        element={<ModAudit.DepartmentAuditTestAdd />}
      />
      <Route
        path="audit/settings/departmentAuditTest/edit/:id"
        element={<ModAudit.DepartmentAuditTestEdit />}
      />
      <Route
        path="audit/settings/specialInvestigation/list"
        element={<ModAudit.SpecialInvestigationList />}
      />
      <Route
        path="audit/settings/specialInvestigation/add"
        element={<ModAudit.SpecialInvestigationAdd />}
      />
      <Route
        path="audit/settings/specialInvestigation/edit/:id"
        element={<ModAudit.SpecialInvestigationEdit />}
      />
      <Route
        path="audit/excution/special/investigation/list"
        element={<ModAudit.InvestigationList />}
      />
      <Route
        path="audit/excution/special/investigation/add"
        element={<ModAudit.InvestigationAdd />}
      />
      <Route
        path="audit/excution/special/investigation/edit/:id"
        element={<ModAudit.InvestigationEdit />}
      />
      <Route
        path="audit/excution/special/investigation/details/:id"
        element={<ModAudit.InvestigationDetails />}
      />
      <Route
        path="audit/excution/special/investigation/details/add/:id"
        element={<ModAudit.InvestigationDetailsAdd />}
      />
      <Route
        path="audit/excution/special/investigation/details/edit/:id/"
        element={<ModAudit.InvestigationDetailsEdit />}
      />
      <Route
        path="audit/excution/departmental/list"
        element={<ModAudit.DepartmentalInvestigationList />}
      />
      <Route
        path="audit/excution/departmental/add"
        element={<ModAudit.DepartmentalInvestigationAdd />}
      />
      <Route
        path="audit/excution/departmental/edit/:id"
        element={<ModAudit.DepartmentalInvestigationEdit />}
      />
      <Route
        path="audit/excution/departmental/details/:id"
        element={<ModAudit.DepartmentalInvestigationDetails />}
      />
      <Route
        path="audit/excution/departmental/details/edit/:id/"
        element={<ModAudit.DepartmentalInvestigationDetailsEdit />}
      />
      <Route
        path="audit/reporting/department/list"
        element={<ModAudit.AuditDepartmentReportList />}
      />
      <Route
        path="audit/reporting/department/add"
        element={<ModAudit.AuditDepartmentReportAdd />}
      />
      <Route
        path="audit/reporting/department/edit/:id"
        element={<ModAudit.AuditDepartmentReportEdit />}
      />
      <Route
        path="audit/reporting/department/comments/:id"
        element={<ModAudit.DepartmentCommentsList />}
      />
      <Route
        path="audit/reporting/Special/Investigation/list"
        element={<ModAudit.AuditSpecialInvestigationReportList />}
      />
      <Route
        path="audit/reporting/Special/Investigation/add"
        element={<ModAudit.AuditSpecialInvestigationReportAdd />}
      />
      <Route
        path="audit/reporting/Special/Investigation/edit/:id"
        element={<ModAudit.AuditSpecialInvestigationReportEdit />}
      />
      <Route
        path="audit/reporting/Special/comments/:id"
        element={<ModAudit.SpecialInCommentsList />}
      />
      <Route
        path="audit/reporting/region/list"
        element={<ModAudit.AuditRegionReportList />}
      />
      {/* <Route
        path="audit/reporting/region/add"
        element={<ModAudit.AuditRegionReportAdd />}
      /> */}
      <Route
        path="audit/reporting/region/edit/:id"
        element={<ModAudit.AuditRegionReportEdit />}
      />
      <Route
        path="audit/reporting/region/comments/:id"
        element={<ModAudit.RegionCommentsList />}
      />
      {/* audit Report  */}
      <Route path="audit/planning/submenu" element={<ModAudit.Planning />} />
      <Route path="audit/othersAudit" element={<ModAudit.OthersAudit />} />
      <Route path="audit/execution" element={<ModAudit.Execution />} />
      <Route path="audit/reporting" element={<ModAudit.Reporting />} />
      {/* audit Settings  */}
      <Route
        path="audit/settings/primaryRootCause/list"
        element={<ModAudit.PrimaryRootCauseList />}
      />
      <Route
        path="audit/settings/primaryRootCause/add"
        element={<ModAudit.PrimaryRootCauseAdd />}
      />
      <Route
        path="audit/settings/primaryRootCause/edit/:id"
        element={<ModAudit.PrimaryRootCauseEdit />}
      />
      <Route
        path="audit/settings/riskImplication/list"
        element={<ModAudit.RiskImplicationList />}
      />
      <Route
        path="audit/settings/riskImplication/add"
        element={<ModAudit.RiskImplicationAdd />}
      />
      <Route
        path="audit/settings/riskImplication/edit/:id"
        element={<ModAudit.RiskImplicationEdit />}
      />
      <Route
        path="audit/settings/typeOfFraud/list"
        element={<ModAudit.TypeOfFraudList />}
      />
      <Route
        path="audit/settings/typeOfFraud/add"
        element={<ModAudit.TypeOfFraudAdd />}
      />
      <Route
        path="audit/settings/typeOfFraud/:id"
        element={<ModAudit.TypeOfFraudEdit />}
      />
      <Route
        path="audit/reporting/branch/list"
        element={<ModAudit.AuditBranchReportList />}
      />
      {/* <Route
        path="audit/reporting/branch/add"
        element={<ModAudit.AuditBranchReportAdd />}
      /> */}
      <Route
        path="audit/reporting/branch/edit/:id"
        element={<ModAudit.AuditBranchReportEdit />}
      />
      <Route
        path="audit/reporting/branch/comments/:id"
        element={<ModAudit.CommentsList />}
      />
      <Route
        path="audit/settings/areaOfReview/list"
        element={<ModAudit.AreaOfReviewList />}
      />
      <Route
        path="audit/settings/areaOfReview/add"
        element={<ModAudit.AreaOfReviewAdd />}
      />
      <Route
        path="audit/settings/areaOfReview/:id"
        element={<ModAudit.AreaOfReviewEdit />}
      />
      <Route
        path="audit/others/trackerissue/list"
        element={<ModAudit.AuditTrackerIssueList />}
      />
      <Route
        path="audit/others/trackerissue/add"
        element={<ModAudit.AuditTrackerIssueAdd />}
      />
      <Route
        path="audit/others/trackerissue/edit/:id"
        element={<ModAudit.AuditTrackerIssueEdit />}
      />
      {/*Audit Fraud */}
      <Route
        path="audit/others/trackerfraud/list"
        element={<ModAudit.AuditTrackerFraudList />}
      />
      <Route
        path="audit/others/feedback/list"
        element={<ModAudit.AuditFeedbackList />}
      />
      {/* reporting details  */}

      <Route
        path="audit/reporting/branch/details/:id"
        element={<ModAudit.AuditBranchReportDetailsList />}
      />
      {/* <Route
        path="audit/reporting/branch/details/add"
        element={<ModAudit.AuditBranchReportDetailsAdd />}
      /> */}
      <Route
        path="audit/reporting/branch/details/edit/:id"
        element={<ModAudit.AuditBranchReportDetailsEdit />}
      />

      <Route
        path="audit/reporting/department/details/:id"
        element={<ModAudit.AuditDepartmentReportDetailsList />}
      />
      <Route
        path="audit/reporting/department/details/add"
        element={<ModAudit.AuditDepartmentReportDetailsAdd />}
      />
      <Route
        path="audit/reporting/department/details/edit/:id"
        element={<ModAudit.AuditDepartmentReportDetailsEdit />}
      />

      <Route
        path="audit/reporting/region/details/:id"
        element={<ModAudit.AuditRegionReportDetailsList />}
      />

      <Route
        path="audit/reporting/region/details/edit/:id"
        element={<ModAudit.AuditRegionReportDetailsEdit />}
      />

      <Route
        path="audit/others/closeList"
        element={<ModAudit.AuditWorkplanCloseList />}
      />

      <Route
        path="audit/others/riskRegister/list"
        element={<ModAudit.RiskRegisterList />}
      />
      <Route
        path="audit/others/riskRegister/details/list/:id"
        element={<ModAudit.RiskRegisterDetailsList />}
      />
    </Route>
  </Route>
);

export default auditRoutes;
