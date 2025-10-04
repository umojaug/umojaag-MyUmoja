import { lazy } from "react";

const UnderConstruction = lazy(() => import("./UnderConstruction"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const SaccoStatement = lazy(() => import("./sacco/SaccoStatement"));
const PaySlip = lazy(() => import("./payslip/PaySlip"));
const LeaveList = lazy(() => import("./myleave/LeaveList"));
const LeaveAdd = lazy(() => import("./myleave/LeaveAdd"));
const LeavePending = lazy(() => import("./application/LeavePending"));
const LeaveComments = lazy(() => import("./application/LeaveComments"));

const FeedbackNoteList = lazy(() =>
  import("./myfeedbacknote/FeedbackNoteList")
);
const NoticeList = lazy(() => import("./notice/NoticeList"));
const MyPasswordReset = lazy(() => import("./mypassword/MyPasswordReset"));
const MyDetails = lazy(() => import("./mydetails/MyDetails"));
const MyTraining = lazy(() => import("./mytraining/MyTraining"));
const TrainingEvaluationAdd = lazy(() =>
  import("./mytraining/trainingEvaluation/TrainingEvaluationAdd")
);
const MyTeam = lazy(() => import("./dashboard/MyTeam"));
const MyDisciplinaryLetterList = lazy(() =>
  import("./disciplinary/MyDisciplinaryLetterList")
);
const MyDisciplinaryLetterPreview = lazy(() =>
  import("./disciplinary/MyDisciplinaryLetterPreview")
);
const DeviceRegisterList = lazy(() =>
  import("./deviceRegister/DeviceRegisterList")
);

const Evaluations = lazy(() => import("./evaluations/Evaluations"));

const MyEvaluationList = lazy(() =>
  import("./evaluations/myEvaluations/evaluation/EvaluationList")
);
const MyEvaluationAdd = lazy(() =>
  import("./evaluations/myEvaluations/evaluation/EvaluationAdd")
);
const MyEvaluationEdit = lazy(() =>
  import("./evaluations/myEvaluations/evaluation/EvaluationEdit")
);
const MyEvaluationDetails = lazy(() =>
  import("./evaluations/myEvaluations/details/Info")
);
const MyEvaluationDetailsSixMonths = lazy(() =>
  import("./evaluations/myEvaluations/detailsSixMonths/Info")
);

const MyEvaluationDetailsThreeMonths = lazy(() =>
  import("./evaluations/myEvaluations/detailsThreeMonths/Info")
);

const MyEvaluationPendingView = lazy(() =>
  import("./evaluations/myEvaluations/PendingView")
);

const MyEvaluationPendingViewThreeMonths = lazy(() =>
  import("./evaluations/myEvaluations/PendingViewThreeMonths")
);
const MyEvaluationPendingViewSixMonths = lazy(() =>
  import("./evaluations/myEvaluations/PendingViewSixMonths")
);

const EvaluationFirstReviewList = lazy(() =>
  import("./evaluations/firstReview/EvaluationList")
);
const EvaluationFirstReviewDetailsInfo = lazy(() =>
  import("./evaluations/firstReview/details/Info")
);
const EvaluationThreeFirstReviewDetailsInfo = lazy(() =>
  import("./evaluations/firstReview/detailsThree/Info")
);
const EvaluationSixFirstReviewDetailsInfo = lazy(() =>
  import("./evaluations/firstReview/detailsSix/Info")
);

const EvaluationSecondReviewList = lazy(() =>
  import("./evaluations/secondReview/EvaluationList")
);

const EvaluationSecondReviewDetails = lazy(() =>
  import("./evaluations/secondReview/DetailsView")
);
const EvaluationThreeSecondReviewDetails = lazy(() =>
  import("./evaluations/secondReview/DetailsViewThree")
);
const EvaluationSixSecondReviewDetails = lazy(() =>
  import("./evaluations/secondReview/DetailsViewSix")
);

// const ApplicationReview = lazy(() =>
//   import("./evaluations/application/Review")
// );

// const ApplicationsReview = lazy(() =>
//   import("./evaluations/firstReview/details/ViewApplication")
// );
// const ApplicationsPreview = lazy(() =>
//   import("./evaluations/myEvaluations/evaluationDetails/ViewMyApplication")
// );

const EvaluationReportsComplete = lazy(() =>
  import("./evaluations/reports/Complete")
);
const EvaluationThreeReportsComplete = lazy(() =>
  import("./evaluations/reports/CompleteThree")
);
const EvaluationSixReportsComplete = lazy(() =>
  import("./evaluations/reports/CompleteSix")
);

const EvaluationReportsCompleteView = lazy(() =>
  import("./evaluations/reports/CompleteView")
);
const EvaluationThreeReportsCompleteView = lazy(() =>
  import("./evaluations/reports/CompleteViewThree")
);
const EvaluationSixReportsCompleteView = lazy(() =>
  import("./evaluations/reports/CompleteViewSix")
);

const EvaluationReportsSummary = lazy(() =>
  import("./evaluations/reports/Summary")
);
const EvaluationReportsReject = lazy(() =>
  import("./evaluations/reports/RejectList")
);

const AdvanceSalary = lazy(() => import("./advanceSalary/AdvanceSalary"));
const AdvanceSalaryAdd = lazy(() => import("./advanceSalary/AdvanceSalaryAdd"));
const AdvanceSalaryList = lazy(() =>
  import("./advanceSalary/AdvanceSalaryList")
);
const RecommendApplications = lazy(() =>
  import("./advanceSalary/RecommendApplications")
);
const AdvanceSalaryComments = lazy(() =>
  import("./advanceSalary/AdvanceSalaryComments")
);
const AdvanceSalaryView = lazy(() =>
  import("./advanceSalary/AdvanceSalaryView")
);

const TransportBill = lazy(() => import("./transportBill/TransportBill"));

const TransportBillReceived = lazy(() =>
  import("./transportBill/billReceived/BillReceivedList")
);

const TransportBillList = lazy(() => import("./transportBill/bill/BillSearch"));

const TransportBillAdd = lazy(() => import("./transportBill/bill/BillAdd"));

const TransportBillEdit = lazy(() => import("./transportBill/bill/BillEdit"));

const TransportBillPreview = lazy(() =>
  import("./transportBill/checklist/Preview")
);

const TransportBillDetailsList = lazy(() =>
  import("./transportBill/checklist/billDetails/BillDetailsList")
);

const TransportBillDetailsAdd = lazy(() =>
  import("./transportBill/checklist/billDetails/BillDetailsAdd")
);

const TransportBillDetailsEdit = lazy(() =>
  import("./transportBill/checklist/billDetails/BillDetailsEdit")
);

const TransportBillReceivedDetails = lazy(() =>
  import("./transportBill/billReceived/BillReceivedDetails")
);

const UnpaidTravelBillList = lazy(() =>
  import("./transportBill/unpaidTravelBill/UnpaidTravelBillList")
);
const UnpaidTravelBillPreview = lazy(() =>
  import("./transportBill/unpaidTravelBill/UnpaidTravelBillPreview")
);

const MyTimeLog = lazy(() => import("./myTimeLog/MyTimeLog"));
const MyTimeLogNew = lazy(() => import("./myTimeLog/MyTimeLogNew"));
const MyTimeLogList = lazy(() => import("./myTimeLog/MyTimeLogList"));

const MyTimeLogAdd = lazy(() => import("./myTimeLog/MyTimeLogAdd"));
const MyTimeLogApplications = lazy(() =>
  import("./myTimeLog/TimeLogApplications")
);

const MyTimeLogEdit = lazy(() => import("./myTimeLog/MyTimeLogEdit"));
const MyFeedBack = lazy(() => import("./myfeedback/MyFeedBack"));

const MyFeedbackAssign = lazy(() =>
  import("./myfeedback/myfeedbackAssign/FeedbackList")
);
const FeedbackDetails = lazy(() =>
  import("./myfeedback/myfeedbackAssign/FeedbackNoteList")
);

const FeedbackAdd = lazy(() =>
  import("./myfeedback/myfeedbackAdd/MyFeedbackAdd")
);
const FeedbackList = lazy(() =>
  import("./myfeedback/myfeedbackAdd/MyFeedbackList")
);

const EvaluationReportsPending = lazy(() =>
  import("./evaluations/reports/pendingApplication/Pending")
);
const DocumentsList = lazy(() => import("./userDocuments/DocumentsList"));

const AuditFeedbackList = lazy(() =>
  import("./auditFeedback/AuditFeedbackList")
);

const AuditFeedbackAdd = lazy(() => import("./auditFeedback/AuditFeedbackAdd"));
const AuditFeedbackOwnList = lazy(() =>
  import("./auditFeedback/AuditFeedbackOwnList")
);

const JobInternalSearch = lazy(() => import("./internalJob/JobInternalSearch"));
const JobOpportunitiesDetails = lazy(() =>
  import("./internalJob/JobOpportunitiesDetails")
);

const AuditFeedback = lazy(() => import("./auditFeedback/AuditFeedback"));

const TicketAdd = lazy(() => import("./ticket/TicketAdd"));
const TicketEdit = lazy(() => import("./ticket/TicketEdit"));
const TicketList = lazy(() => import("./ticket/TicketList"));
const TicketViewWrapper = lazy(() =>
  import("./ticket/approve/TicketViewWrapper")
);
const TicketMenu = lazy(() => import("./ticket/Ticket"));
const MyTicketAll = lazy(() => import("./ticket/report/MyTicketAll"));
const MyTicketCountry = lazy(() => import("./ticket/report/MyTicketCountry"));
const TicketClosed = lazy(() => import("./ticket/report/TicketClosed"));
const MyTicketOpen = lazy(() => import("./ticket/report/MyTicketOpen"));

const MyLetterView = lazy(() => import("./myLetter/MyLetterView"));

const BeneficiaryPrimaryList = lazy(() =>
  import("./mydetails/beneficiary/BeneficiaryPrimaryList")
);

const BeneficiaryDependentList = lazy(() =>
  import("./mydetails/beneficiaryChildren/BeneficiaryDependentList")
);

const RiskRegisterDetailsList = lazy(() =>
  import("./riskRegister/details/RiskRegisterDetailsList")
);

const RiskRegisterList = lazy(() => import("./riskRegister/RiskRegisterList"));

const BranchVisitDetailsList = lazy(() =>
  import("./branchVisit/branchVisitDetails/BranchVisitDetailsList")
);
const MonthlyBoardList = lazy(() => import("./monthlyBoard/MonthlyBoardList"));
const MonthlyBoardEdit = lazy(() => import("./monthlyBoard/MonthlyBoardEdit"));
const MonthlyBoardDetails = lazy(() =>
  import("./monthlyBoard/details/MonthlyBoardDetails")
);

const LeaveMenu = lazy(() => import("./myleave/LeaveMenu"));

const RecruitmentRequestAdd = lazy(() =>
  import("./recruitmentRequests/RecruitmentRequestAdd")
);
const RecruitmentRequestEdit = lazy(() =>
  import("./recruitmentRequests/RecruitmentRequestEdit")
);
const RecruitmentRequestList = lazy(() =>
  import("./recruitmentRequests/RecruitmentRequestList")
);

export {
  Dashboard,
  PaySlip,
  SaccoStatement,
  LeaveList,
  LeaveAdd,
  LeavePending,
  LeaveComments,
  FeedbackList,
  FeedbackAdd,
  FeedbackNoteList,
  NoticeList,
  MyTeam,
  MyPasswordReset,
  MyDetails,
  MyTraining,
  MyDisciplinaryLetterList,
  MyDisciplinaryLetterPreview,
  UnderConstruction,
  DeviceRegisterList,
  Evaluations,
  MyEvaluationDetails,
  MyEvaluationList,
  MyEvaluationAdd,
  MyEvaluationEdit,
  MyEvaluationPendingView,
  EvaluationReportsComplete,
  EvaluationReportsCompleteView,
  EvaluationReportsSummary,
  EvaluationReportsReject,
  EvaluationFirstReviewList,
  EvaluationFirstReviewDetailsInfo,
  EvaluationSecondReviewList,
  EvaluationSecondReviewDetails,
  MyEvaluationPendingViewSixMonths,
  MyEvaluationDetailsSixMonths,
  MyEvaluationDetailsThreeMonths,
  MyEvaluationPendingViewThreeMonths,
  EvaluationThreeFirstReviewDetailsInfo,
  EvaluationSixFirstReviewDetailsInfo,
  EvaluationThreeReportsCompleteView,
  EvaluationSixReportsCompleteView,
  EvaluationThreeSecondReviewDetails,
  EvaluationSixSecondReviewDetails,
  EvaluationThreeReportsComplete,
  EvaluationSixReportsComplete,
  AdvanceSalary,
  AdvanceSalaryAdd,
  AdvanceSalaryList,
  RecommendApplications,
  AdvanceSalaryComments,
  AdvanceSalaryView,
  TransportBill,
  TransportBillReceived,
  TransportBillList,
  TransportBillAdd,
  TransportBillEdit,
  TransportBillPreview,
  TransportBillDetailsList,
  TransportBillDetailsAdd,
  TransportBillDetailsEdit,
  TransportBillReceivedDetails,
  UnpaidTravelBillList,
  UnpaidTravelBillPreview,
  MyTimeLog,
  MyTimeLogNew,
  MyTimeLogList,
  MyTimeLogAdd,
  MyTimeLogApplications,
  MyTimeLogEdit,
  TrainingEvaluationAdd,
  MyFeedBack,
  MyFeedbackAssign,
  FeedbackDetails,
  EvaluationReportsPending,
  DocumentsList,
  AuditFeedbackList,
  AuditFeedbackAdd,
  AuditFeedbackOwnList,
  JobOpportunitiesDetails,
  JobInternalSearch,
  AuditFeedback,
  TicketAdd,
  TicketEdit,
  TicketList,
  TicketMenu,
  MyTicketOpen,
  MyTicketCountry,
  TicketViewWrapper,
  TicketClosed,
  MyTicketAll,
  MyLetterView,
  BeneficiaryPrimaryList,
  BeneficiaryDependentList,
  RiskRegisterList,
  RiskRegisterDetailsList,
  BranchVisitDetailsList,
  MonthlyBoardList,
  MonthlyBoardDetails,
  MonthlyBoardEdit,
  LeaveMenu,
  RecruitmentRequestAdd,
  RecruitmentRequestEdit,
  RecruitmentRequestList,
};
