import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Settings = lazy(() => import("./settings/Settings"));

const Reports = lazy(() => import("./reports/Reports"));
const Training = lazy(() => import("./training/Training"));

const NoticeList = lazy(() => import("./notice/NoticeList"));
const NoticeAdd = lazy(() => import("./notice/NoticeAdd"));
const NoticeEdit = lazy(() => import("./notice/NoticeEdit"));

const CategoryList = lazy(() => import("./training/category/CategoryList"));
const CategoryAdd = lazy(() => import("./training/category/CategoryAdd"));
const CategoryEdit = lazy(() => import("./training/category/CategoryEdit"));

const TopicList = lazy(() => import("./training/topic/TopicList"));
const TopicAdd = lazy(() => import("./training/topic/TopicAdd"));
const TopicEdit = lazy(() => import("./training/topic/TopicEdit"));

const ContentList = lazy(() => import("./training/content/ContentList"));

const FeedbackList = lazy(() => import("./feedback/FeedbackList"));
//const FeedbackNoteList = lazy(() => import("./feedback/FeedbackList"));

const RptEmployeeList = lazy(() =>
  import("./reports/employeelist/EmployeeList")
);
const RptEmployeeNew = lazy(() => import("./reports/employeelist/EmployeeNew"));
const RptEmployeeResign = lazy(() =>
  import("./reports/employeelist/EmployeeResign")
);
const EmployeeResignDetails = lazy(() =>
  import("./reports/employeelist/resignDetails/Details")
);
const RptEmployeeLeave = lazy(() =>
  import("./reports/employeelist/EmployeeLeave")
);
const RptEmployeeLeaveBalance = lazy(() =>
  import("./reports/employeelist/EmployeeLeaveBalance")
);
const RptEmployeeMonthlyPosition = lazy(() =>
  import("./reports/employeelist/EmployeeMonthlyPosition")
);
const RptEmployeeBirthday = lazy(() =>
  import("./reports/employeelist/EmployeeBirthday")
);
const RptEmployeeTenure = lazy(() =>
  import("./reports/employeelist/EmployeeTenure")
);
const RptEmployeeDisciplinaryLetter = lazy(() =>
  import("./reports/employeelist/EmployeeDisciplinaryLetter")
);
const RptEmployeeDisciplinaryLetterPreview = lazy(() =>
  import("./reports/employeelist/EmployeeDisciplinaryLetterPreview")
);
const RptEmployeeNotice = lazy(() =>
  import("./reports/employeelist/EmployeeNotice")
);
const RptEmployeeTransfer = lazy(() =>
  import("./reports/employeelist/EmployeeTransfer")
);
const RptEmployeePromotion = lazy(() =>
  import("./reports/employeelist/EmployeePromotion")
);
const RptEmployeeDemotion = lazy(() =>
  import("./reports/employeelist/EmployeeDemotion")
);
const RptEmployeeHistory = lazy(() =>
  import("./reports/employeelist/EmployeeHistory")
);
const RptEmployeeLetter = lazy(() =>
  import("./reports/employeelist/EmployeeLetter")
);
const RptEmployeePosition = lazy(() =>
  import("./reports/employeeposition/EmployeePosition")
);
const RptEmpPayrollBank = lazy(() =>
  import("./reports/emppayroll/EmpPayrollBank")
);
const RptEmpPayrollAttendance = lazy(() =>
  import("./reports/emppayroll/EmpPayrollAttendacne")
);
const RptEmpPayrollNssf = lazy(() =>
  import("./reports/emppayroll/EmpPayrollNssf")
);
const RptEmpPayrollTax = lazy(() =>
  import("./reports/emppayroll/EmpPayrollTax")
);
const RptEmpPayrollSacco = lazy(() =>
  import("./reports/emppayroll/EmpPayrollSaccoSearch")
);
const RptEmpPayrollSaccoDetails = lazy(() =>
  import("./reports/emppayroll/EmpPayrollSaccoDetails")
);
const EmpSalaryStopList = lazy(() => import("./payrollstop/EmpSalaryStopList"));
const EmpSalaryStopAdd = lazy(() => import("./payrollstop/EmpSalaryStopAdd"));
const RptEmpSalaryStop = lazy(() =>
  import("./reports/emppayroll/EmpSalaryStop")
);
const RptEmpSalary = lazy(() => import("./reports/emppayroll/EmpSalary"));
const RptEmpPayslip = lazy(() => import("./reports/emppayroll/EmpPayslip"));
const RptEmpPayrollAllDed = lazy(() =>
  import("./reports/emppayroll/EmpPayrollAllDed")
);

const EmployeeList = lazy(() => import("./employee/EmployeeList"));
const EmployeeAdd = lazy(() => import("./employee/EmployeeAdd"));
const EmployeeEdit = lazy(() => import("./employee/EmployeeEdit"));
const AttendanceList = lazy(() => import("./attendance/AttendanceList"));
const AttendanceAdd = lazy(() => import("./attendance/AttendanceAdd"));
const ShifList = lazy(() => import("./shift/ShiftList"));
const ShifAdd = lazy(() => import("./shift/ShiftAdd"));
const ShifEdit = lazy(() => import("./shift/ShiftEdit"));
const TourList = lazy(() => import("./tour/TourList"));
const TourAdd = lazy(() => import("./tour/TourAdd"));
const TourEdit = lazy(() => import("./tour/TourEdit"));
const DisciplinaryList = lazy(() => import("./disciplinary/DisciplinaryList"));
const DisciplinaryAdd = lazy(() => import("./disciplinary/DisciplinaryAdd"));
const DisciplinaryEdit = lazy(() => import("./disciplinary/DisciplinaryEdit"));
const LeaveList = lazy(() => import("./leave/LeaveList"));
const LeaveAdd = lazy(() => import("./leave/LeaveAdd"));
const LeaveRecommended = lazy(() => import("./leave/LeaveRecommended"));
const LeaveComments = lazy(() => import("./leave/LeaveComments"));
const EmpKpiList = lazy(() => import("./empkpi/EmpKpiList"));
const EmpKpiAdd = lazy(() => import("./empkpi/EmpKpiAdd"));
const TransferPromotion = lazy(() =>
  import("./transferpromotion/ListTransferPromotion")
);
const TransferAdd = lazy(() => import("./transferpromotion/TransferAdd"));
const PromotionAdd = lazy(() => import("./transferpromotion/PromotionAdd"));
const DemotionAdd = lazy(() => import("./transferpromotion/DemotionAdd"));
const ResignList = lazy(() => import("./resign/ResignList"));
const ResignAdd = lazy(() => import("./resign/ResignAdd"));

const AllowanceDeductionList = lazy(() =>
  import("./allowanceDeduction/AllowanceDeductionList")
);
const AllowanceDeductionFileUpload = lazy(() =>
  import("./allowanceDeduction/AllowanceDeductionFileUpload")
);
const IncrementList = lazy(() => import("./increment/IncrementList"));
const IncrementAdd = lazy(() => import("./increment/IncrementAdd"));
const AllowanceDeductionAdd = lazy(() =>
  import("./allowanceDeduction/AllowanceDeductionAdd")
);

const SalaryAdvanceList = lazy(() =>
  import("./salaryadvance/SalaryAdvanceList")
);
const SalaryAdvanceAdd = lazy(() => import("./salaryadvance/SalaryAdvanceAdd"));

const DepartmentList = lazy(() =>
  import("./settings/department/DepartmentList")
);
const DepartmentAdd = lazy(() => import("./settings/department/DepartmentAdd"));
const DepartmentEdit = lazy(() =>
  import("./settings/department/DepartmentEdit")
);
const DesignationList = lazy(() =>
  import("./settings/designation/DesignationList")
);
const DesignationAdd = lazy(() =>
  import("./settings/designation/DesignationAdd")
);
const DesignationEdit = lazy(() =>
  import("./settings/designation/DesignationEdit")
);
const KpiList = lazy(() => import("./settings/kpi/KpiList"));
const KpiAdd = lazy(() => import("./settings/kpi/KpiAdd"));
const KpiEdit = lazy(() => import("./settings/kpi/KpiEdit"));
const EducationList = lazy(() => import("./settings/education/EducationList"));
const EducationAdd = lazy(() => import("./settings/education/EducationAdd"));
const EducationEdit = lazy(() => import("./settings/education/EducationEdit"));
const SettingsShiftList = lazy(() => import("./settings/shift/ShiftList"));
const SettingsShiftAdd = lazy(() => import("./settings/shift/ShiftAdd"));
const SettingsShiftEdit = lazy(() => import("./settings/shift/ShiftEdit"));
const SettingsLeaveList = lazy(() => import("./settings/leave/LeaveList"));
const SettingsLeaveAdd = lazy(() => import("./settings/leave/LeaveAdd"));
const SettingsLeaveEdit = lazy(() => import("./settings/leave/LeaveEdit"));
const ResignReasonsList = lazy(() =>
  import("./settings/resignReasons/ResignReasonsList")
);
const ResignReasonsAdd = lazy(() =>
  import("./settings/resignReasons/ResignReasonsAdd")
);
const ResignReasonsEdit = lazy(() =>
  import("./settings/resignReasons/ResignReasonsEdit")
);
const StaffTypeList = lazy(() => import("./settings/staffType/StaffTypeList"));
const StaffTypeAdd = lazy(() => import("./settings/staffType/StaffTypeAdd"));
const StaffTypeEdit = lazy(() => import("./settings/staffType/StaffTypeEdit"));
const SettingsAllowanceDeductionList = lazy(() =>
  import("./settings/allowanceDeduction/AllowanceDeductionList")
);
const SettingsAllowanceDeductionAdd = lazy(() =>
  import("./settings/allowanceDeduction/AllowanceDeductionAdd")
);
const SettingsAllowanceDeductionEdit = lazy(() =>
  import("./settings/allowanceDeduction/AllowanceDeductionEdit")
);

const ManagerMappingAdd = lazy(() =>
  import("./settings/managerMapping/ManagerMappingAdd")
);
const ManagerMappingEdit = lazy(() =>
  import("./settings/managerMapping/ManagerMappingEdit")
);
const ManagerMappingList = lazy(() =>
  import("./settings/managerMapping/ManagerMappingList")
);

const PayrollNoteList = lazy(() => import("./payrollnote/PayrollNoteList"));
const PayrollNoteAdd = lazy(() => import("./payrollnote/PayrollNoteAdd"));
const PayrollNoteEdit = lazy(() => import("./payrollnote/PayrollNoteEdit"));

const EvaluationDashboard = lazy(() => import("./evaluation/Dashboard"));
const EvaluationTypeList = lazy(() =>
  import("./evaluation/evaluationType/EvaluationTypeList")
);
const EvaluationTypeAdd = lazy(() =>
  import("./evaluation/evaluationType/EvaluationTypeAdd")
);
const EvaluationTypeEdit = lazy(() =>
  import("./evaluation/evaluationType/EvaluationTypeEdit")
);
const EvaluationQuestionList = lazy(() =>
  import("./evaluation/evaluationquestion/QuestionList")
);
const ArchiveList = lazy(() => import("./archive/ArchiveList"));

const ProbationList = lazy(() => import("./probation/ProbationList"));
const EmployeeDetails = lazy(() => import("./reports/employee/Details"));
const Message = lazy(() => import("./message/Message"));

const LeaveDashboard = lazy(() => import("./leave/leave/Dashboard"));
const LeaveProcess = lazy(() => import("./leave/leave/LeaveProcess"));

const LeaveBalanceAdd = lazy(() =>
  import("./leave/leave/leaveOpenningBalance/LeaveBalanceAdd")
);
const RptAttendance = lazy(() => import("./reports/attendance/AttendanceList"));
const EmployeeMonthlyStaff = lazy(() =>
  import("./reports/employeelist/EmployeeMonthlyStaff")
);
const MonthlyEmployeeStaff = lazy(() =>
  import("./reports/monthlyEmployee/MonthlyEmployeeStaff")
);
const StopSalaryPaid = lazy(() =>
  import("./reports/emppayroll/StopSalaryPaid")
);
const AdvanceSalaryRecommended = lazy(() =>
  import("./advanceSalary/AdvanceSalaryRecommended")
);
const AdvanceSalaryComments = lazy(() =>
  import("./advanceSalary/AdvanceSalaryComments")
);
const AdvanceSalaryReport = lazy(() =>
  import("./reports/advanceSalary/AdvanceSalaryReport")
);
const AuditTrail = lazy(() => import("./reports/auditTrail/AuditTrail"));
const ApplicationAuditTrail = lazy(() =>
  import("./reports/applicationAuditTrail/ApplicationAuditTrail")
);
const ActiveEmployee = lazy(() =>
  import("./reports/activeEmployeeList/ActiveEmployee")
);
const MyTimeLogSummeryReport = lazy(() =>
  import("./reports/timelogsummery/MyTimeLogSummeryReport")
);
const MyTimeLogCard = lazy(() =>
  import("./reports/timelogsummery/MyTimeLogCard")
);
const TrainingEvaluationReportList = lazy(() =>
  import("./reports/trainingEvaluation/TrainingEvaluationReportList")
);
const JobList = lazy(() => import("./jobOpportunities/JobList"));
const JobAdd = lazy(() => import("./jobOpportunities/JobAdd"));
const JobEdit = lazy(() => import("./jobOpportunities/JobEdit"));
const CvBankList = lazy(() => import("./reports/cvBank/CvBankList"));
const JobApplyList = lazy(() => import("./reports/jobApply/JobApplyList"));
const JobApplyDetails = lazy(() =>
  import("./reports/jobApply/JobApplyDetails")
);

const DepartmentFocalAdd = lazy(() =>
  import("./settings/departmentFocal/DepartmentFocalAdd")
);
const DepartmentFocalList = lazy(() =>
  import("./settings/departmentFocal/DepartmentFocalList")
);
const DepartmentFocalEdit = lazy(() =>
  import("./settings/departmentFocal/DepartmentFocalEdit")
);

const FeedbackCategoryAdd = lazy(() =>
  import("./settings/feedbackCatogory/FeedbackCategoryAdd")
);
const FeedbackCategoryEdit = lazy(() =>
  import("./settings/feedbackCatogory/FeedbackCategoryEdit")
);
const FeedbackCategoryList = lazy(() =>
  import("./settings/feedbackCatogory/FeedbackCategoryList")
);

const FeedbackNoteList = lazy(() =>
  import("./feedback/feedbacknote/FeedbackNoteList")
);

const AllowanceDeductionRecurAdd = lazy(() =>
  import("./allowanceDeductionRecur/AllowanceDeductionRecurAdd")
);

const AllowanceDeductionRecurList = lazy(() =>
  import("./allowanceDeductionRecur/AllowanceDeductionRecurList")
);

const FeedbackAssignAdd = lazy(() =>
  import("./feedback/feedbackAssign/FeedbackAssignAdd")
);

const DocumentsList = lazy(() => import("./hrDocuments/DocumentsList"));
const DocumentsAdd = lazy(() => import("./hrDocuments/DocumentsAdd"));
const DocumentsEdit = lazy(() => import("./hrDocuments/DocumentsEdit"));

const DocumentsCategoryList = lazy(() =>
  import("./settings/documentsCategory/DocumentsCategoryList")
);
const DocumentsCategoryAdd = lazy(() =>
  import("./settings/documentsCategory/DocumentsCategoryAdd")
);
const DocumentsCategoryEdit = lazy(() =>
  import("./settings/documentsCategory/DocumentsCategoryEdit")
);

const SalaryReviewList = lazy(() => import("./salaryReview/SalaryReviewList"));
const SalaryReviewFileUpload = lazy(() =>
  import("./salaryReview/SalaryReviewFileUpload")
);
const SalaryReviewReport = lazy(() =>
  import("./reports/salaryReview/SalaryReviewList")
);
const BranchVisit = lazy(() => import("./branchVisit/BranchVisit"));
const BranchVisitAdd = lazy(() => import("./branchVisit/BranchVisitAdd"));
const BranchVisitEdit = lazy(() => import("./branchVisit/BranchVisitEdit"));
const BranchVisitList = lazy(() => import("./branchVisit/BranchVisitList"));

const BranchVisitDetailsList = lazy(() =>
  import("./branchVisit/branchVisitDetails/BranchVisitDetailsList")
);

const BranchVisitApprove = lazy(() =>
  import("./branchVisit/BranchVisitList")
);

const BranchVisitPending = lazy(() =>
  import("./branchVisit/planPending/BranchVisitList")
);

const BranchVisitReport = lazy(() => import("./branchVisit/BranchVisitReport"));

const BranchPlanAdd = lazy(() => import("./branchVisit/plan/BranchVisitAdd"));
const BranchPlanEdit = lazy(() => import("./branchVisit/plan/BranchVisitEdit"));
const BranchPlanList = lazy(() => import("./branchVisit/plan/BranchVisitList"));

const EmployeeLocationList = lazy(() =>
  import("./reports/employeeLocation/EmployeeLocation")
);

export {
  Dashboard,
  NoticeList,
  NoticeAdd,
  NoticeEdit,
  TopicAdd,
  TopicEdit,
  TopicList,
  ContentList,
  CategoryList,
  CategoryAdd,
  CategoryEdit,
  Settings,
  DepartmentList,
  DepartmentAdd,
  DepartmentEdit,
  DesignationList,
  DesignationAdd,
  DesignationEdit,
  KpiList,
  KpiAdd,
  KpiEdit,
  EmpKpiList,
  EmpKpiAdd,
  Reports,
  Training,
  FeedbackList,
  RptEmployeeList,
  RptEmployeeNew,
  RptEmployeeResign,
  RptEmployeeLeave,
  RptEmployeeBirthday,
  RptEmployeeTenure,
  RptEmpPayrollBank,
  RptEmpPayrollNssf,
  RptEmpPayrollTax,
  RptEmployeeLetter,
  RptEmpPayrollSacco,
  RptEmpPayrollSaccoDetails,
  RptEmployeePosition,
  RptEmployeeNotice,
  RptEmpSalary,
  RptEmpPayslip,
  RptEmployeeTransfer,
  RptEmployeePromotion,
  RptEmployeeDemotion,
  RptEmployeeHistory,
  RptEmpPayrollAllDed,
  RptEmpSalaryStop,
  RptEmployeeDisciplinaryLetter,
  RptEmployeeDisciplinaryLetterPreview,
  AttendanceList,
  AttendanceAdd,
  EmployeeList,
  EmployeeAdd,
  EmployeeEdit,
  EmpSalaryStopList,
  EmpSalaryStopAdd,
  ShifList,
  ShifAdd,
  ShifEdit,
  TourList,
  TourAdd,
  TourEdit,
  DisciplinaryList,
  DisciplinaryAdd,
  DisciplinaryEdit,
  LeaveList,
  LeaveAdd,
  LeaveRecommended,
  LeaveComments,
  RptEmployeeLeaveBalance,
  RptEmployeeMonthlyPosition,
  TransferPromotion,
  TransferAdd,
  IncrementList,
  IncrementAdd,
  SalaryAdvanceList,
  SalaryAdvanceAdd,
  EmployeeMonthlyStaff,
  ResignList,
  ResignAdd,
  PromotionAdd,
  DemotionAdd,
  AllowanceDeductionList,
  AllowanceDeductionFileUpload,
  AllowanceDeductionAdd,
  EducationList,
  EducationAdd,
  EducationEdit,
  SettingsShiftList,
  SettingsShiftAdd,
  SettingsShiftEdit,
  SettingsLeaveList,
  SettingsLeaveAdd,
  SettingsLeaveEdit,
  ResignReasonsList,
  ResignReasonsAdd,
  ResignReasonsEdit,
  StaffTypeList,
  StaffTypeAdd,
  StaffTypeEdit,
  SettingsAllowanceDeductionList,
  SettingsAllowanceDeductionAdd,
  SettingsAllowanceDeductionEdit,
  ManagerMappingAdd,
  ManagerMappingEdit,
  ManagerMappingList,
  PayrollNoteList,
  PayrollNoteAdd,
  PayrollNoteEdit,
  EvaluationDashboard,
  EvaluationTypeList,
  EvaluationTypeAdd,
  EvaluationTypeEdit,
  EvaluationQuestionList,
  ProbationList,
  ArchiveList,
  EmployeeDetails,
  Message,
  LeaveDashboard,
  LeaveProcess,
  LeaveBalanceAdd,
  RptEmpPayrollAttendance,
  RptAttendance,
  MonthlyEmployeeStaff,
  StopSalaryPaid,
  AdvanceSalaryRecommended,
  AdvanceSalaryComments,
  AdvanceSalaryReport,
  AuditTrail,
  ApplicationAuditTrail,
  EmployeeResignDetails,
  ActiveEmployee,
  MyTimeLogSummeryReport,
  MyTimeLogCard,
  TrainingEvaluationReportList,
  JobList,
  JobAdd,
  JobEdit,
  CvBankList,
  JobApplyList,
  JobApplyDetails,
  DepartmentFocalAdd,
  DepartmentFocalList,
  DepartmentFocalEdit,
  FeedbackCategoryList,
  FeedbackCategoryEdit,
  FeedbackCategoryAdd,
  FeedbackNoteList,
  AllowanceDeductionRecurAdd,
  AllowanceDeductionRecurList,
  FeedbackAssignAdd,
  DocumentsList,
  DocumentsAdd,
  DocumentsEdit,
  DocumentsCategoryAdd,
  DocumentsCategoryList,
  DocumentsCategoryEdit,
  SalaryReviewList,
  SalaryReviewFileUpload,
  SalaryReviewReport,
  BranchVisit,
  BranchVisitAdd,
  BranchVisitEdit,
  BranchVisitList,
  BranchVisitDetailsList,
  BranchVisitApprove,
  BranchVisitPending,
  BranchVisitReport,
  BranchPlanAdd,
  BranchPlanEdit,
  BranchPlanList,
  EmployeeLocationList,
};
