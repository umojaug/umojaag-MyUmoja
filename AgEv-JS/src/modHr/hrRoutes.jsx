import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as ModHr from "./index";

const hrRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="hr" element={<ModHr.Dashboard />} />
      <Route path="hr/message/list" element={<ModHr.Message />} />
      <Route
        path="hr/evaluation/dashboard"
        element={<ModHr.EvaluationDashboard />}
      />
      <Route
        path="hr/evaluation/type/list"
        element={<ModHr.EvaluationTypeList />}
      />
      <Route
        path="hr/evaluation/type/add"
        element={<ModHr.EvaluationTypeAdd />}
      />
      <Route
        path="hr/evaluation/type/edit/:id"
        element={<ModHr.EvaluationTypeEdit />}
      />
      <Route
        path="hr/evaluation/question/list/:id"
        element={<ModHr.EvaluationQuestionList />}
      />
      <Route
        path="hr/employee/details/:id"
        element={<ModHr.EmployeeDetails />}
      />
      <Route path="hr/reports" element={<ModHr.Reports />} />
      <Route path="hr/training/list" element={<ModHr.Training />} />
      <Route path="hr/feedback/:id" element={<ModHr.FeedbackList />} />
      <Route path="hr/probation/:id" element={<ModHr.ProbationList />} />
      <Route path="hr/notice/list" element={<ModHr.NoticeList />} />
      <Route path="hr/notice/add" element={<ModHr.NoticeAdd />} />
      <Route path="hr/notice/edit/:id" element={<ModHr.NoticeEdit />} />
      <Route path="hr/archive/list/:id" element={<ModHr.ArchiveList />} />
      <Route
        path="hr/training/category/list"
        element={<ModHr.CategoryList />}
      />
      <Route path="hr/training/category/add" element={<ModHr.CategoryAdd />} />
      <Route
        path="hr/training/category/edit/:id"
        element={<ModHr.CategoryEdit />}
      />
      <Route path="hr/training/topic/list" element={<ModHr.TopicList />} />
      <Route path="hr/training/topic/add" element={<ModHr.TopicAdd />} />
      <Route path="hr/training/topic/edit/:id" element={<ModHr.TopicEdit />} />
      <Route
        path="hr/training/course/content/list/:id"
        element={<ModHr.ContentList />}
      />
      <Route path="hr/settings" element={<ModHr.Settings />} />
      <Route
        path="hr/reports/employee/list"
        element={<ModHr.RptEmployeeList />}
      />
      <Route
        path="hr/reports/employee/newjoin"
        element={<ModHr.RptEmployeeNew />}
      />
      <Route
        path="hr/reports/timelogsummery/myTimeLogSummeryReport"
        element={<ModHr.MyTimeLogSummeryReport />}
      />
      <Route
        path="hr/reports/timelogsummery/myTimeLogCard"
        element={<ModHr.MyTimeLogCard />}
      />
      <Route
        path="hr/reports/training/evaluation"
        element={<ModHr.TrainingEvaluationReportList />}
      />
      <Route
        path="hr/reports/employee/resign"
        element={<ModHr.RptEmployeeResign />}
      />
      <Route
        path="hr/reports/employee/leave"
        element={<ModHr.RptEmployeeLeave />}
      />
      <Route
        path="hr/reports/employee/leave/balance"
        element={<ModHr.RptEmployeeLeaveBalance />}
      />
      <Route
        path="hr/reports/employee/monthly/position"
        element={<ModHr.RptEmployeeMonthlyPosition />}
      />
      <Route
        path="hr/reports/employee/transfer"
        element={<ModHr.RptEmployeeTransfer />}
      />
      <Route
        path="hr/reports/employee/staff/position"
        element={<ModHr.EmployeeMonthlyStaff />}
      />
      <Route
        path="hr/reports/employee/monthly/position"
        element={<ModHr.RptEmployeeMonthlyPosition />}
      />
      <Route
        path="hr/reports/monthly/employee"
        element={<ModHr.MonthlyEmployeeStaff />}
      />
      <Route
        path="hr/reports/employee/disciplinary"
        element={<ModHr.RptEmployeeDisciplinaryLetter />}
      />
      <Route
        path="hr/reports/employee/disciplinary/Letter/preview/:id"
        element={<ModHr.RptEmployeeDisciplinaryLetterPreview />}
      />
      <Route
        path="hr/reports/employee/promotion"
        element={<ModHr.RptEmployeePromotion />}
      />
      <Route
        path="hr/reports/employee/demotion"
        element={<ModHr.RptEmployeeDemotion />}
      />
      <Route
        path="hr/reports/employee/history"
        element={<ModHr.RptEmployeeHistory />}
      />
      <Route
        path="hr/reports/employee/birthday"
        element={<ModHr.RptEmployeeBirthday />}
      />
      <Route
        path="hr/reports/employee/tenure"
        element={<ModHr.RptEmployeeTenure />}
      />
      <Route
        path="hr/reports/employee/notice"
        element={<ModHr.RptEmployeeNotice />}
      />
      <Route
        path="hr/reports/employee/Position"
        element={<ModHr.RptEmployeePosition />}
      />
      <Route
        path="hr/reports/employee/attendance"
        element={<ModHr.RptAttendance />}
      />
      <Route path="hr/salary/stop/list" element={<ModHr.EmpSalaryStopList />} />
      <Route path="hr/salary/stop/Add" element={<ModHr.EmpSalaryStopAdd />} />
      <Route
        path="hr/reports/payroll/salarysheet/stop"
        element={<ModHr.RptEmpSalaryStop />}
      />
      <Route
        path="hr/reports/payroll/attendance"
        element={<ModHr.RptEmpPayrollAttendance />}
      />
      <Route
        path="hr/reports/payroll/salarysheet"
        element={<ModHr.RptEmpSalary />}
      />
      <Route
        path="hr/reports/payroll/payslip"
        element={<ModHr.RptEmpPayslip />}
      />
      <Route
        path="hr/reports/payroll/bank"
        element={<ModHr.RptEmpPayrollBank />}
      />
      <Route
        path="hr/reports/payroll/nssf"
        element={<ModHr.RptEmpPayrollNssf />}
      />
      <Route
        path="hr/reports/payroll/taxpaye"
        element={<ModHr.RptEmpPayrollTax />}
      />
      <Route
        path="hr/reports/payroll/sacco"
        element={<ModHr.RptEmpPayrollSacco />}
      />
      <Route
        path="hr/reports/payroll/sacco/:id"
        element={<ModHr.RptEmpPayrollSaccoDetails />}
      />
      <Route
        path="hr/reports/payroll/allded"
        element={<ModHr.RptEmpPayrollAllDed />}
      />
      <Route
        path="hr/reports/employee/appoinment/:id"
        element={<ModHr.RptEmployeeLetter />}
      />
      <Route path="hr/payroll/note/list" element={<ModHr.PayrollNoteList />} />
      <Route path="hr/payroll/note/add" element={<ModHr.PayrollNoteAdd />} />
      <Route
        path="hr/payroll/note/edit/:id"
        element={<ModHr.PayrollNoteEdit />}
      />

      <Route
        path="hr/settings/department/list"
        element={<ModHr.DepartmentList />}
      />
      <Route
        path="hr/settings/department/add"
        element={<ModHr.DepartmentAdd />}
      />
      <Route
        path="hr/settings/department/edit/:id"
        element={<ModHr.DepartmentEdit />}
      />
      <Route
        path="hr/settings/designation/list"
        element={<ModHr.DesignationList />}
      />
      <Route
        path="hr/settings/designation/add"
        element={<ModHr.DesignationAdd />}
      />
      <Route
        path="hr/settings/designation/edit/:id"
        element={<ModHr.DesignationEdit />}
      />

      <Route
        path="hr/settings/education/list"
        element={<ModHr.EducationList />}
      />
      <Route
        path="hr/settings/education/add"
        element={<ModHr.EducationAdd />}
      />
      <Route
        path="hr/settings/education/edit/:id"
        element={<ModHr.EducationEdit />}
      />
      <Route
        path="hr/settings/shift/list"
        element={<ModHr.SettingsShiftList />}
      />
      <Route
        path="hr/settings/shift/add"
        element={<ModHr.SettingsShiftAdd />}
      />
      <Route
        path="hr/settings/shift/edit/:id"
        element={<ModHr.SettingsShiftEdit />}
      />
      <Route
        path="hr/settings/leave/list"
        element={<ModHr.SettingsLeaveList />}
      />
      <Route
        path="hr/settings/leave/add"
        element={<ModHr.SettingsLeaveAdd />}
      />
      <Route
        path="hr/settings/leave/edit/:id"
        element={<ModHr.SettingsLeaveEdit />}
      />
      <Route
        path="hr/settings/resign-reason/list"
        element={<ModHr.ResignReasonsList />}
      />
      <Route
        path="hr/settings/resign-reason/add"
        element={<ModHr.ResignReasonsAdd />}
      />
      <Route
        path="hr/settings/resign-reason/edit/:id"
        element={<ModHr.ResignReasonsEdit />}
      />
      <Route path="hr/settings/kpi/list" element={<ModHr.KpiList />} />
      <Route path="hr/settings/kpi/add" element={<ModHr.KpiAdd />} />
      <Route path="hr/settings/kpi/edit/:id" element={<ModHr.KpiEdit />} />
      <Route
        path="hr/settings/staff-type/list"
        element={<ModHr.StaffTypeList />}
      />
      <Route
        path="hr/settings/staff-type/add"
        element={<ModHr.StaffTypeAdd />}
      />
      <Route
        path="hr/settings/staff-type/edit/:id"
        element={<ModHr.StaffTypeEdit />}
      />
      <Route
        path="hr/settings/allowance-deduction/list"
        element={<ModHr.SettingsAllowanceDeductionList />}
      />
      <Route
        path="hr/settings/allowance-deduction/add"
        element={<ModHr.SettingsAllowanceDeductionAdd />}
      />
      <Route
        path="hr/settings/allowance-deduction/edit/:id"
        element={<ModHr.SettingsAllowanceDeductionEdit />}
      />
      <Route
        path="hr/settings/manager-mapping/add"
        element={<ModHr.ManagerMappingAdd />}
      />
      <Route
        path="hr/settings/manager-mapping/edit/:id"
        element={<ModHr.ManagerMappingEdit />}
      />
      <Route
        path="hr/settings/manager-mapping/list"
        element={<ModHr.ManagerMappingList />}
      />
      <Route path="hr/employee/list" element={<ModHr.EmployeeList />} />
      <Route path="hr/employee/add" element={<ModHr.EmployeeAdd />} />
      <Route path="hr/employee/edit/:id" element={<ModHr.EmployeeEdit />} />
      <Route path="hr/attendance/list" element={<ModHr.AttendanceList />} />
      <Route path="hr/attendance/add" element={<ModHr.AttendanceAdd />} />
      <Route path="hr/shift/list" element={<ModHr.ShifList />} />
      <Route path="hr/shift/add" element={<ModHr.ShifAdd />} />
      <Route path="hr/shift/edit/:id" element={<ModHr.ShifEdit />} />
      <Route path="hr/tour/list" element={<ModHr.TourList />} />
      <Route path="hr/tour/add" element={<ModHr.TourAdd />} />
      <Route path="hr/tour/edit/:id" element={<ModHr.TourEdit />} />

      <Route path="hr/kpi/list" element={<ModHr.EmpKpiList />} />
      <Route path="hr/kpi/add" element={<ModHr.EmpKpiAdd />} />
      <Route path="hr/disciplinary/list" element={<ModHr.DisciplinaryList />} />
      <Route path="hr/disciplinary/add" element={<ModHr.DisciplinaryAdd />} />
      <Route
        path="hr/disciplinary/edit/:id"
        element={<ModHr.DisciplinaryEdit />}
      />

      <Route path="hr/leave" element={<ModHr.LeaveDashboard />} />
      <Route path="hr/leaveprocess" element={<ModHr.LeaveProcess />} />

      <Route
        path="hr/leave/openning/balance"
        element={<ModHr.LeaveBalanceAdd />}
      />

      <Route path="hr/leave/list" element={<ModHr.LeaveList />} />
      <Route path="hr/leave/add" element={<ModHr.LeaveAdd />} />
      <Route path="hr/leave/Recommended" element={<ModHr.LeaveRecommended />} />
      <Route path="hr/leave/comments/:id" element={<ModHr.LeaveComments />} />
      <Route path="hr/resign/list" element={<ModHr.ResignList />} />
      <Route path="hr/resign/add" element={<ModHr.ResignAdd />} />
      <Route
        path="hr/transferpromotion/list"
        element={<ModHr.TransferPromotion />}
      />
      <Route path="hr/transfer/add" element={<ModHr.TransferAdd />} />
      <Route path="hr/increment/list" element={<ModHr.IncrementList />} />
      <Route path="hr/increment/add" element={<ModHr.IncrementAdd />} />
      <Route
        path="hr/salary-advance/list"
        element={<ModHr.SalaryAdvanceList />}
      />
      <Route
        path="hr/salary-advance/add"
        element={<ModHr.SalaryAdvanceAdd />}
      />
      <Route
        path="hr/allowance-deduction/list"
        element={<ModHr.AllowanceDeductionList />}
      />
      <Route
        path="hr/allowance-deduction/fileUpload"
        element={<ModHr.AllowanceDeductionFileUpload />}
      />
      <Route
        path="hr/allowance-deduction/add"
        element={<ModHr.AllowanceDeductionAdd />}
      />
      <Route path="hr/promotion/add" element={<ModHr.PromotionAdd />} />
      <Route path="hr/demotion/add" element={<ModHr.DemotionAdd />} />
      <Route
        path="hr/reports/stop/salaryPaid"
        element={<ModHr.StopSalaryPaid />}
      />
      <Route
        path="hr/advance/recommended"
        element={<ModHr.AdvanceSalaryRecommended />}
      />
      <Route
        path="hr/advance/recommended/comments/:id"
        element={<ModHr.AdvanceSalaryComments />}
      />
      <Route
        path="hr/reports/employee/advanceSalary"
        element={<ModHr.AdvanceSalaryReport />}
      />
      <Route
        path="hr/reports/employee/audit-trail"
        element={<ModHr.AuditTrail />}
      />
      <Route
        path="hr/reports/employee/audittrail"
        element={<ModHr.ApplicationAuditTrail />}
      />
      <Route
        path="hr/employee/resign/details/:id"
        element={<ModHr.EmployeeResignDetails />}
      />
      <Route
        path="hr/reports/employee/activeEmployee"
        element={<ModHr.ActiveEmployee />}
      />

      <Route path="hr/training/topic/list" element={<ModHr.TopicList />} />
      <Route path="hr/training/topic/add" element={<ModHr.TopicAdd />} />
      <Route path="hr/training/topic/edit/:id" element={<ModHr.TopicEdit />} />

      <Route path="hr/job/list" element={<ModHr.JobList />} />
      <Route path="hr/job/add" element={<ModHr.JobAdd />} />
      <Route path="hr/job/edit/:id" element={<ModHr.JobEdit />} />

      <Route path="hr/reports/cvbank" element={<ModHr.CvBankList />} />
      <Route path="hr/reports/jobapply" element={<ModHr.JobApplyList />} />
      <Route
        path="hr/reports/jobapply/details/:id"
        element={<ModHr.JobApplyDetails />}
      />

      <Route
        path="hr/settings/department/focal/list"
        element={<ModHr.DepartmentFocalList />}
      />

      <Route
        path="hr/settings/department/focal/add"
        element={<ModHr.DepartmentFocalAdd />}
      />
      <Route
        path="hr/settings/department/focal/edit/:id"
        element={<ModHr.DepartmentFocalEdit />}
      />

      <Route
        path="hr/settings/feedback-category/list"
        element={<ModHr.FeedbackCategoryList />}
      />
      <Route
        path="hr/settings/feedback-category/add"
        element={<ModHr.FeedbackCategoryAdd />}
      />
      <Route
        path="hr/settings/feedback-category/edit/:id"
        element={<ModHr.FeedbackCategoryEdit />}
      />

      <Route
        path="hr/allowance-deduction/recuring/list"
        element={<ModHr.AllowanceDeductionRecurList />}
      />
      <Route
        path="hr/allowance-deduction/recuring/add"
        element={<ModHr.AllowanceDeductionRecurAdd />}
      />

      <Route path="hr/feedback/note/:id" element={<ModHr.FeedbackNoteList />} />
      <Route
        path="hr/feedback/assign/:id"
        element={<ModHr.FeedbackAssignAdd />}
      />

      <Route
        path="hr/settings/documentsCategory/list"
        element={<ModHr.DocumentsCategoryList />}
      />
      <Route
        path="hr/settings/documentsCategory/add"
        element={<ModHr.DocumentsCategoryAdd />}
      />
      <Route
        path="hr/settings/documentsCategory/edit/:id"
        element={<ModHr.DocumentsCategoryEdit />}
      />

      <Route path="hr/documents/list" element={<ModHr.DocumentsList />} />
      <Route path="hr/documents/add" element={<ModHr.DocumentsAdd />} />
      <Route path="hr/documents/edit/:id" element={<ModHr.DocumentsEdit />} />
      <Route
        path="hr/salary-review/list"
        element={<ModHr.SalaryReviewList />}
      />
      <Route
        path="hr/salary-review/fileUpload"
        element={<ModHr.SalaryReviewFileUpload />}
      />
      <Route
        path="hr/reports/salary-review"
        element={<ModHr.SalaryReviewReport />}
      />

      <Route path="hr/branch/visit" element={<ModHr.BranchVisit />} />

      <Route path="hr/branch/visit/add" element={<ModHr.BranchVisitAdd />} />

      <Route
        path="hr/branch/visit/edit/:id"
        element={<ModHr.BranchVisitEdit />}
      />

      <Route path="hr/branch/visit/list" element={<ModHr.BranchVisitList />} />

      <Route
        path="hr/branch/visit/plan/add"
        element={<ModHr.BranchPlanAdd />}
      />

      <Route
        path="hr/branch/visit/plan/edit/:id"
        element={<ModHr.BranchPlanEdit />}
      />
      <Route
        path="hr/branch/visit/plan/list"
        element={<ModHr.BranchPlanList />}
      />

      <Route
        path="hr/branch/visit/plan/pending"
        element={<ModHr.BranchVisitPending />}
      />

      <Route
        path="hr/branch/visit/plan/approve"
        element={<ModHr.BranchVisitApprove />}
      />
      <Route
        path="hr/branch/visit/reports"
        element={<ModHr.BranchVisitReport />}
      />

      <Route
        path="hr/branch/visit/Details/:id"
        element={<ModHr.BranchVisitDetailsList />}
      />

      <Route
        path="hr/reports/employee/location"
        element={<ModHr.EmployeeLocationList />}
      />
    </Route>
  </Route>
);

export default hrRoutes;
