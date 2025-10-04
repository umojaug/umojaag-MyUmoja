import { lazy } from "react";

const Dashboard = lazy(() => import("./visit/Dashboard"));

const BmVisitList = lazy(() => import("./visit/bmVisit/visit/VisitSearch"));
const BmVisitAdd = lazy(() => import("./visit/bmVisit/visit/VisitAdd"));
const BmVisitEdit = lazy(() => import("./visit/bmVisit/visit/VisitEdit"));
const BmVisitPreview = lazy(() => import("./visit/bmVisit/checklist/Preview"));

//group
const BmGroupVisitList = lazy(() =>
  import("./visit/bmVisit/checklist/groupvisit/GroupVisitList")
);
const BmGroupVisitAdd = lazy(() =>
  import("./visit/bmVisit/checklist/groupvisit/GroupVisitAdd")
);
const BmGroupVisitEdit = lazy(() =>
  import("./visit/bmVisit/checklist/groupvisit/GroupVisitEdit")
);

// loan

const BmLoanVerificationAdd = lazy(() =>
  import("./visit/bmVisit/checklist/loanverification/LoanVerificationAdd")
);
const BmLoanVerificationList = lazy(() =>
  import("./visit/bmVisit/checklist/loanverification/LoanVerificationList")
);
const BmLoanVerificationEdit = lazy(() =>
  import("./visit/bmVisit/checklist/loanverification/LoanVerificationEdit")
);

// Today’s OD follow up information:

const BmOdFollowUpdAdd = lazy(() =>
  import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpAdd")
);
const BmOdFollowUpdList = lazy(() =>
  import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpList")
);
const BmOdFollowUpdEdit = lazy(() =>
  import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpEdit")
);

const BmDailyReportAdd = lazy(() =>
  import("./visit/bmVisit/checklist/dailyreport/DailyReportAdd")
);
const BmDailyReportList = lazy(() =>
  import("./visit/bmVisit/checklist/dailyreport/DailyReportList")
);
const BmDailyReportEdit = lazy(() =>
  import("./visit/bmVisit/checklist/dailyreport/DailyReportEdit")
);

// BM highlights

const BmHighlightsAdd = lazy(() =>
  import("./visit/bmVisit/checklist/highlights/HighlightsAdd")
);
const BmHighlightsList = lazy(() =>
  import("./visit/bmVisit/checklist/highlights/HighlightsList")
);
const BmHighlightsEdit = lazy(() =>
  import("./visit/bmVisit/checklist/highlights/HighlightsEdit")
);

// //     Today’s OD follow up information:

// const BmOdFollowUpdAdd = lazy(() =>
//   import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpAdd")
// );
// const BmOdFollowUpdList = lazy(() =>
//   import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpList")
// );
// const BmOdFollowUpdEdit = lazy(() =>
//   import("./visit/bmVisit/checklist/odfollowupinformation/OdFollowUpEdit")
// );

// cash at hand

const BmCashAtHandAdd = lazy(() =>
  import("./visit/bmVisit/checklist/cashathand/CashAtHandAdd")
);
const BmCashAtHandList = lazy(() =>
  import("./visit/bmVisit/checklist/cashathand/CashAtHandList")
);
const BmCashAtHandEdit = lazy(() =>
  import("./visit/bmVisit/checklist/cashathand/CashAtHandEdit")
);

// Bank information:

const BmBankInfoAdd = lazy(() =>
  import("./visit/bmVisit/checklist/bankinfo/BankInfoAdd")
);
const BmBankInfoList = lazy(() =>
  import("./visit/bmVisit/checklist/bankinfo/BankInfoList")
);
const BmBankInfoEdit = lazy(() =>
  import("./visit/bmVisit/checklist/bankinfo/BankInfoEdit")
);

// am

const AmGroupVisitList = lazy(() =>
  import("./visit/amVisit/checklist/groupvisit/GroupVisitList")
);
const AmGroupVisitAdd = lazy(() =>
  import("./visit/amVisit/checklist/groupvisit/GroupVisitAdd")
);
const AmGroupVisitEdit = lazy(() =>
  import("./visit/amVisit/checklist/groupvisit/GroupVisitEdit")
);

// cash at hand

const AmCashAtHandAdd = lazy(() =>
  import("./visit/amVisit/checklist/cashathand/CashAtHandAdd")
);
const AmCashAtHandList = lazy(() =>
  import("./visit/amVisit/checklist/cashathand/CashAtHandList")
);
const AmCashAtHandEdit = lazy(() =>
  import("./visit/amVisit/checklist/cashathand/CashAtHandEdit")
);

//    am Today’s OD follow up information

const AmOdFollowUpdAdd = lazy(() =>
  import("./visit/amVisit/checklist/odfollowupinformation/OdFollowUpAdd")
);
const AmOdFollowUpdList = lazy(() =>
  import("./visit/amVisit/checklist/odfollowupinformation/OdFollowUpList")
);
const AmOdFollowUpdEdit = lazy(() =>
  import("./visit/amVisit/checklist/odfollowupinformation/OdFollowUpEdit")
);

// Am Record Keeping

const AmRecordKeepingAdd = lazy(() =>
  import("./visit/amVisit/checklist/recordkeeping/AmRecordKeepingAdd")
);
const AmRecordKeepingEdit = lazy(() =>
  import("./visit/amVisit/checklist/recordkeeping/AmRecordKeepingEdit")
);
const AmRecordKeepingList = lazy(() =>
  import("./visit/amVisit/checklist/recordkeeping/AmRecordKeepingList")
);

// Am Branch Performance

const AmBranchPerformanceAdd = lazy(() =>
  import("./visit/amVisit/checklist/branchperformance/AmBranchPerformanceAdd")
);

const AmBranchPerformanceEdit = lazy(() =>
  import("./visit/amVisit/checklist/branchperformance/AmBranchPerformanceEdit")
);

const AmBranchPerformanceList = lazy(() =>
  import("./visit/amVisit/checklist/branchperformance/AmBranchPerformanceList")
);

// BM highlights

const AmHighlightsAdd = lazy(() =>
  import("./visit/amVisit/checklist/highlights/HighlightsAdd")
);
const AmHighlightsList = lazy(() =>
  import("./visit/amVisit/checklist/highlights/HighlightsList")
);
const AmHighlightsEdit = lazy(() =>
  import("./visit/amVisit/checklist/highlights/HighlightsEdit")
);

const SubmitRemarks = lazy(() =>
  import("./visit/bmVisit/checklist/SubmitToManager")
);

const ReviewList = lazy(() => import("./visit/review/ReviewSearch"));
const ReviewPreview = lazy(() => import("./visit/review/ReviewPreview"));
const ApprovedList = lazy(() => import("./visit/approved/ApprovedSearch"));
const ApprovedPreview = lazy(() => import("./visit/approved/ApprovedPreview"));

const AmVisitList = lazy(() => import("./visit/amVisit/visit/VisitSearch"));
const AmVisitAdd = lazy(() => import("./visit/amVisit/visit/VisitAdd"));
const AmVisitEdit = lazy(() => import("./visit/amVisit/visit/VisitEdit"));
const AmVisitPreview = lazy(() => import("./visit/amVisit/checklist/Preview"));

const RmVisitList = lazy(() => import("./visit/rmVisit/visit/VisitSearch"));
const RmVisitAdd = lazy(() => import("./visit/rmVisit/visit/VisitAdd"));
const RmVisitEdit = lazy(() => import("./visit/rmVisit/visit/VisitEdit"));
const RmVisitPreview = lazy(() => import("./visit/rmVisit/checklist/Preview"));

//-------- Rm----------

//

const RmGroupVisitList = lazy(() =>
  import("./visit/rmVisit/checklist/groupvisit/GroupVisitList")
);
const RmGroupVisitAdd = lazy(() =>
  import("./visit/rmVisit/checklist/groupvisit/GroupVisitAdd")
);
const RmGroupVisitEdit = lazy(() =>
  import("./visit/rmVisit/checklist/groupvisit/GroupVisitEdit")
);

// cash at hand

const RmCashAtHandAdd = lazy(() =>
  import("./visit/rmVisit/checklist/cashathand/CashAtHandAdd")
);
const RmCashAtHandList = lazy(() =>
  import("./visit/rmVisit/checklist/cashathand/CashAtHandList")
);
const RmCashAtHandEdit = lazy(() =>
  import("./visit/rmVisit/checklist/cashathand/CashAtHandEdit")
);

//    am Today’s OD follow up information

const RmOdFollowUpdAdd = lazy(() =>
  import("./visit/rmVisit/checklist/odfollowupinformation/OdFollowUpAdd")
);
const RmOdFollowUpdList = lazy(() =>
  import("./visit/rmVisit/checklist/odfollowupinformation/OdFollowUpList")
);
const RmOdFollowUpdEdit = lazy(() =>
  import("./visit/rmVisit/checklist/odfollowupinformation/OdFollowUpEdit")
);

// Rm Record Keeping

const RmRecordKeepingAdd = lazy(() =>
  import("./visit/rmVisit/checklist/recordkeeping/RmRecordKeepingAdd")
);
const RmRecordKeepingEdit = lazy(() =>
  import("./visit/rmVisit/checklist/recordkeeping/RmRecordKeepingEdit")
);
const RmRecordKeepingList = lazy(() =>
  import("./visit/rmVisit/checklist/recordkeeping/RmRecordKeepingList")
);

// Rm Branch Performance

const RmBranchPerformanceAdd = lazy(() =>
  import("./visit/rmVisit/checklist/branchperformance/RmBranchPerformanceAdd")
);

const RmBranchPerformanceEdit = lazy(() =>
  import("./visit/rmVisit/checklist/branchperformance/RmBranchPerformanceEdit")
);

const RmBranchPerformanceList = lazy(() =>
  import("./visit/rmVisit/checklist/branchperformance/RmBranchPerformanceList")
);

// RM highlights

const RmHighlightsAdd = lazy(() =>
  import("./visit/rmVisit/checklist/highlights/HighlightsAdd")
);
const RmHighlightsList = lazy(() =>
  import("./visit/rmVisit/checklist/highlights/HighlightsList")
);
const RmHighlightsEdit = lazy(() =>
  import("./visit/rmVisit/checklist/highlights/HighlightsEdit")
);

const TransportBill = lazy(() => import("./visit/transportBill/TransportBill"));

const TransportBillReceived = lazy(() =>
  import("./visit/transportBill/billReceived/BillReceivedList")
);

const TransportBillList = lazy(() =>
  import("./visit/transportBill/bill/BillSearch")
);
const AllTravelBillSearch = lazy(() =>
  import("./visit/transportBill/bill/AllTravelBillSearch")
);

const TransportBillAdd = lazy(() =>
  import("./visit/transportBill/bill/BillAdd")
);

const TransportBillEdit = lazy(() =>
  import("./visit/transportBill/bill/BillEdit")
);

const TransportBillPreview = lazy(() =>
  import("./visit/transportBill/checklist/Preview")
);
const TransportBillCheckedByPreview = lazy(() =>
  import("./visit/transportBill/checkedByBills/TransportBillCheckedByPreview")
);
const TransportBillReceivedPreview = lazy(() =>
  import("./visit/transportBill/billReceived/TransportBillReceivedPreview")
);

const TransportBillDetailsList = lazy(() =>
  import("./visit/transportBill/checklist/billDetails/BillDetailsList")
);

const TransportBillDetailsAdd = lazy(() =>
  import("./visit/transportBill/checklist/billDetails/BillDetailsAdd")
);

const TransportBillDetailsEdit = lazy(() =>
  import("./visit/transportBill/checklist/billDetails/BillDetailsEdit")
);

const TransportBillReceivedDetails = lazy(() =>
  import("./visit/transportBill/billReceived/BillReceivedDetails")
);

const OpsOthersBill = lazy(() =>
  import("./visit/transportBill/checklist/othersBill/OthersBillEdit")
);

const CheckedByBillList = lazy(() =>
  import("./visit/transportBill/checkedByBills/CheckedByBillList")
);
const CheckedByBillDetails = lazy(() =>
  import("./visit/transportBill/checkedByBills/CheckedByBillDetails")
);
//visit for

const Visit = lazy(() => import("./visit/visit/visit/Visit"));
const VisitList = lazy(() => import("./visit/visit/visit/VisitSearch"));
const VisitAdd = lazy(() => import("./visit/visit/visit/VisitAdd"));
const VisitEdit = lazy(() => import("./visit/visit/visit/VisitEdit"));
const VisitPreview = lazy(() => import("./visit/visit/checklist/Preview"));
const VisitReportPreview = lazy(() =>
  import("./reports/visitHistory/VisitReportPreview")
);

const VisitDocAdd = lazy(() =>
  import("./visit/visit/visitDocuments/VisitDocAdd")
);
const VisitDocList = lazy(() =>
  import("./visit/visit/visitDocuments/VisitDocList")
);
const VisitDocPreviewList = lazy(() =>
  import("./visit/visit/visitDocuments/VisitDocPreviewList")
);
const VisitDocBmPreviewList = lazy(() =>
  import("./visit/bmReview/VisitDocBmPreviewList")
);
const VisitDocManagerPreviewList = lazy(() =>
  import("./visit/managerReview/VisitDocManagerPreviewList")
);

const PortfolioAnalysisAdd = lazy(() =>
  import("./visit/visit/checklist/portfolioAnalysis/PortfolioAnalysisAdd")
);

const AuditIssuesAdd = lazy(() =>
  import("./visit/visit/checklist/auditIssues/AuditIssuesAdd")
);
const AuditIssuesEdit = lazy(() =>
  import("./visit/visit/checklist/auditIssues/AuditIssuesEdit")
);

// checkEffect bm,am,rm

const AmCheckAdd = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/amCheck/AmCheckAdd")
);

const AmCheckEdit = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/amCheck/AmCheckEdit")
);
const BmCheckAdd = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/bmCheck/BmCheckAdd")
);

const BmCheckEdit = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/bmCheck/BmCheckEdit")
);
const RmCheckAdd = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/rmCheck/RmCheckAdd")
);

const RmCheckEdit = lazy(() =>
  import("./visit/visit/checklist/checkEffectiveness/rmCheck/RmCheckEdit")
);

// feedback

const FeedbackMtgAdd = lazy(() =>
  import("./visit/visit/checklist/feedbackMtg/FeedbackMtgAdd")
);
const FeedbackMtgEdit = lazy(() =>
  import("./visit/visit/checklist/feedbackMtg/FeedbackMtgEdit")
);

//PortfolioAnalysis
const PortfolioAnalysisEdit = lazy(() =>
  import("./visit/visit/checklist/portfolioAnalysis/PortfolioAnalysisEdit")
);
const PortfolioAnalysisBmEdit = lazy(() =>
  import("./visit/visit/checklist/portfolioAnalysis/PortfolioAnalysisBmEdit")
);
const PortfolioAnalysisSupervisorEdit = lazy(() =>
  import(
    "./visit/visit/checklist/portfolioAnalysis/PortfolioAnalysisSupervisorEdit"
  )
);

//Verify Lona Application

const GroupVisitEdit = lazy(() =>
  import("./visit/visit/checklist/groupVisit/GroupVisitEdit")
);
const GroupVisitBmEdit = lazy(() =>
  import("./visit/visit/checklist/groupVisit/GroupVisitBmEdit")
);

const GroupVisitSupervisorEdit = lazy(() =>
  import("./visit/visit/checklist/groupVisit/GroupVisitSupervisorEdit")
);

// borrower visit
const BorrowerVisitAdd = lazy(() =>
  import("./visit/visit/checklist/borrowerVisit/BorrowerVisitAdd")
);
const BorrowerVisitEdit = lazy(() =>
  import("./visit/visit/checklist/borrowerVisit/BorrowerVisitEdit")
);
const BorrowerVisitList = lazy(() =>
  import("./visit/visit/checklist/borrowerVisit/BorrowerVisitList")
);
const BorrowerVisitBmEdit = lazy(() =>
  import("./visit/visit/checklist/borrowerVisit/BorrowerVisitBmEdit")
);
const BorrowerVisitSupervisorEdit = lazy(() =>
  import("./visit/visit/checklist/borrowerVisit/BorrowerVisitSupervisorEdit")
);

const CashAtHandEdit = lazy(() =>
  import("./visit/visit/checklist/cashathand/CashAtHandEdit")
);
const DocumentationEdit = lazy(() =>
  import("./visit/visit/checklist/documentationCheck/DocumentationEdit")
);
const DocCheckBmEdit = lazy(() =>
  import("./visit/visit/checklist/documentationCheck/DocCheckBmEdit")
);
const DocCheckSupervisorEdit = lazy(() =>
  import("./visit/visit/checklist/documentationCheck/DocCheckSupervisorEdit")
);
const CashAtHandBmEdit = lazy(() =>
  import("./visit/visit/checklist/cashathand/CashAtHandBmEdit")
);
const CashAtHandSupervisorEdit = lazy(() =>
  import("./visit/visit/checklist/cashathand/CashAtHandSupervisorEdit")
);

const AuditIssueBmEdit = lazy(() =>
  import("./visit/visit/checklist/auditIssues/AuditIssueBmEdit")
);
const AuditIssueManagerEdit = lazy(() =>
  import("./visit/visit/checklist/auditIssues/AuditIssueManagerEdit")
);

const BmReviewList = lazy(() => import("./visit/bmReview/BmReviewList"));
const ManagerReviewList = lazy(() =>
  import("./visit/managerReview/ManagerReviewList")
);
const ManagerPreview = lazy(() =>
  import("./visit/managerReview/ManagerPreview")
);

//Reports
const Report = lazy(() => import("./reports/Reports"));
const VisitHistorySearch = lazy(() =>
  import("./reports/visitHistory/VisitHistorySearch")
);
const MyVisitHistorySearch = lazy(() =>
  import("./reports/myVisitHistory/MyVisitHistorySearch")
);

const MyVisitReportPreview = lazy(() =>
  import("./reports/myVisitHistory/MyVisitReportPreview")
);
const VisitHistorySupervisorSearch = lazy(() =>
  import("./reports/visitHistoryAsSupervisor/VisitHistorySupervisorSearch")
);

const VisitReportSupervisorPreview = lazy(() =>
  import("./reports/visitHistoryAsSupervisor/VisitReportSupervisorPreview")
);
const TravelHistorySearch = lazy(() =>
  import("./reports/travelHistory/TravelHistorySearch")
);
const TravelBillPreview = lazy(() =>
  import("./reports/travelHistory/TravelBillPreview")
);
const BmTravelBillSearch = lazy(() =>
  import("./visit/bmReview/BmTravelBillSearch")
);
const BmTravelBillPreview = lazy(() =>
  import("./visit/bmReview/BmTravelBillPreview")
);
const ManagerTravelBillSearch = lazy(() =>
  import("./visit/managerReview/ManagerTravelBillSearch")
);
const ManagerTravelBillPreview = lazy(() =>
  import("./visit/managerReview/ManagerTravelBillPreview")
);
const VisitCountSearch = lazy(() =>
  import("./reports/visitCount/VisitCountSearch")
);
const MyVisitCountSearch = lazy(() =>
  import("./reports/myVisitCount/MyVisitCountSearch")
);
const VisitCountSupervisorSearch = lazy(() =>
  import("./reports/visitCountAsSupervisor/VisitCountSupervisorSearch")
);

const FmpuList = lazy(() => import("./fmpu/FmpuList"));
const FmpuAdd = lazy(() => import("./fmpu/FmpuAdd"));
const FmpuEdit = lazy(() => import("./fmpu/FmpuEdit"));
const FmpuListReport = lazy(() => import("./reports/fmpu/FmpuList"));

const RiskRegisterList = lazy(() =>
  import("./risk/riskRegister/RiskRegisterList")
);

const RiskRegisterDetailsList = lazy(() =>
  import("./risk/riskRegister/details/RiskRegisterDetailsList")
);

export {
  Dashboard,
  SubmitRemarks,
  ReviewList,
  ReviewPreview,
  ApprovedList,
  ApprovedPreview,
  AmVisitList,
  AmVisitAdd,
  AmVisitEdit,
  AmVisitPreview,
  AmGroupVisitList,
  AmGroupVisitAdd,
  AmGroupVisitEdit,
  AmCashAtHandAdd,
  AmCashAtHandList,
  AmCashAtHandEdit,
  AmOdFollowUpdAdd,
  AmOdFollowUpdList,
  AmOdFollowUpdEdit,
  AmRecordKeepingAdd,
  AmRecordKeepingEdit,
  AmRecordKeepingList,
  AmBranchPerformanceAdd,
  AmBranchPerformanceEdit,
  AmBranchPerformanceList,
  AmHighlightsAdd,
  AmHighlightsList,
  AmHighlightsEdit,
  BmVisitList,
  BmVisitAdd,
  BmVisitEdit,
  BmVisitPreview,
  BmGroupVisitList,
  BmGroupVisitAdd,
  BmGroupVisitEdit,
  BmHighlightsList,
  BmHighlightsAdd,
  BmHighlightsEdit,
  BmBankInfoAdd,
  BmBankInfoList,
  BmBankInfoEdit,
  BmCashAtHandAdd,
  BmCashAtHandList,
  BmCashAtHandEdit,
  BmOdFollowUpdAdd,
  BmOdFollowUpdList,
  BmOdFollowUpdEdit,
  BmDailyReportAdd,
  BmDailyReportList,
  BmDailyReportEdit,
  BmLoanVerificationAdd,
  BmLoanVerificationList,
  BmLoanVerificationEdit,
  RmVisitList,
  RmVisitAdd,
  RmVisitEdit,
  RmVisitPreview,
  RmGroupVisitList,
  RmGroupVisitAdd,
  RmGroupVisitEdit,
  RmCashAtHandAdd,
  RmCashAtHandList,
  RmCashAtHandEdit,
  RmOdFollowUpdAdd,
  RmOdFollowUpdList,
  RmOdFollowUpdEdit,
  RmRecordKeepingAdd,
  RmRecordKeepingEdit,
  RmRecordKeepingList,
  RmBranchPerformanceAdd,
  RmBranchPerformanceEdit,
  RmBranchPerformanceList,
  RmHighlightsAdd,
  RmHighlightsList,
  RmHighlightsEdit,
  Visit,
  VisitList,
  VisitAdd,
  VisitEdit,
  FmpuList,
  FmpuAdd,
  FmpuEdit,
  VisitPreview,
  VisitReportPreview,
  VisitDocAdd,
  VisitDocList,
  VisitDocPreviewList,
  VisitDocBmPreviewList,
  VisitDocManagerPreviewList,
  PortfolioAnalysisAdd,
  AuditIssuesAdd,
  AmCheckAdd,
  BmCheckAdd,
  RmCheckAdd,
  FeedbackMtgAdd,
  FeedbackMtgEdit,
  PortfolioAnalysisEdit,
  PortfolioAnalysisBmEdit,
  PortfolioAnalysisSupervisorEdit,
  GroupVisitEdit,
  CashAtHandEdit,
  TransportBillList,
  AllTravelBillSearch,
  TransportBillEdit,
  TransportBillAdd,
  TransportBillPreview,
  TransportBillCheckedByPreview,
  TransportBillReceivedPreview,
  TransportBillDetailsEdit,
  TransportBillDetailsAdd,
  TransportBillDetailsList,
  TransportBill,
  CheckedByBillList,
  CheckedByBillDetails,
  TransportBillReceived,
  TransportBillReceivedDetails,
  OpsOthersBill,
  DocumentationEdit,
  GroupVisitBmEdit,
  GroupVisitSupervisorEdit,
  CashAtHandBmEdit,
  CashAtHandSupervisorEdit,
  DocCheckBmEdit,
  DocCheckSupervisorEdit,
  BorrowerVisitAdd,
  BorrowerVisitEdit,
  BorrowerVisitList,
  BorrowerVisitBmEdit,
  BorrowerVisitSupervisorEdit,
  AuditIssueBmEdit,
  AuditIssueManagerEdit,
  AmCheckEdit,
  BmCheckEdit,
  RmCheckEdit,
  AuditIssuesEdit,
  BmReviewList,
  ManagerReviewList,
  ManagerPreview,
  Report,
  VisitHistorySearch,
  TravelHistorySearch,
  TravelBillPreview,
  BmTravelBillSearch,
  BmTravelBillPreview,
  ManagerTravelBillSearch,
  ManagerTravelBillPreview,
  VisitCountSearch,
  MyVisitHistorySearch,
  MyVisitReportPreview,
  VisitHistorySupervisorSearch,
  VisitReportSupervisorPreview,
  MyVisitCountSearch,
  VisitCountSupervisorSearch,
  FmpuListReport,
  RiskRegisterDetailsList,
  RiskRegisterList,
};
