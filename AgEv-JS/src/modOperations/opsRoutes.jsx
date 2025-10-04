import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as Ops from "./index";

const opsRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="ops" element={<Ops.Dashboard />} />
      <Route path="ops/bm/visit/list" element={<Ops.BmVisitList />} />
      <Route path="ops/bm/visit/add" element={<Ops.BmVisitAdd />} />
      <Route path="ops/bm/visit/edit/:id" element={<Ops.BmVisitEdit />} />
      <Route path="ops/bm/visit/preview/:id" element={<Ops.BmVisitPreview />} />

      {/* bm  */}
      {/* group bm  */}
      <Route
        path="ops/bm/group/visit/add/:id"
        element={<Ops.BmGroupVisitAdd />}
      />
      <Route
        path="ops/bm/group/visit/edit/:id"
        element={<Ops.BmGroupVisitEdit />}
      />
      {/*FMPU Report*/}

      <Route path="ops/fmpu/list" element={<Ops.FmpuList />} />
      <Route path="ops/fmpu/add" element={<Ops.FmpuAdd />} />
      <Route path="ops/fmpu/edit/:id" element={<Ops.FmpuEdit />} />
      {/* loan  */}

      <Route
        path="ops/bm/loan/visit/add/:id"
        element={<Ops.BmLoanVerificationAdd />}
      />
      <Route
        path="ops/bm/loan/visit/edit/:id"
        element={<Ops.BmLoanVerificationEdit />}
      />

      {/* od  */}

      <Route
        path="ops/bm/od/visit/add/:id"
        element={<Ops.BmOdFollowUpdAdd />}
      />
      <Route
        path="ops/bm/od/visit/edit/:id"
        element={<Ops.BmOdFollowUpdEdit />}
      />

      {/* daily report */}

      <Route path="ops/bm/bank/visit/add/:id" element={<Ops.BmBankInfoAdd />} />
      <Route
        path="ops/bm/bank/visit/edit/:id"
        element={<Ops.BmBankInfoEdit />}
      />
      {/* cash at hand  */}
      <Route
        path="ops/bm/cash/visit/add/:id"
        element={<Ops.BmCashAtHandAdd />}
      />
      <Route
        path="ops/bm/cash/visit/edit/:id"
        element={<Ops.BmCashAtHandEdit />}
      />

      {/* bank */}

      <Route path="ops/bm/bank/visit/add/:id" element={<Ops.BmBankInfoAdd />} />
      <Route
        path="ops/bm/bank/visit/edit/:id"
        element={<Ops.BmBankInfoEdit />}
      />
      {/* daily report */}
      <Route
        path="ops/bm/report/visit/add/:id"
        element={<Ops.BmDailyReportAdd />}
      />
      <Route
        path="ops/bm/report/visit/edit/:id"
        element={<Ops.BmDailyReportEdit />}
      />

      {/* BM hightlights */}
      <Route
        path="ops/bm/highlights/daily/add/:id"
        element={<Ops.BmHighlightsAdd />}
      />
      <Route
        path="ops/bm/highlights/daily/edit/:id"
        element={<Ops.BmHighlightsEdit />}
      />

      {/* am  */}
      {/* group   */}
      <Route
        path="ops/am/group/visit/add/:id"
        element={<Ops.AmGroupVisitAdd />}
      />
      <Route
        path="ops/am/group/visit/edit/:id"
        element={<Ops.AmGroupVisitEdit />}
      />

      {/* cash at hand  */}
      <Route
        path="ops/am/cash/visit/add/:id"
        element={<Ops.AmCashAtHandAdd />}
      />
      <Route
        path="ops/am/cash/visit/edit/:id"
        element={<Ops.AmCashAtHandEdit />}
      />

      {/* od  */}

      <Route
        path="ops/am/od/visit/add/:id"
        element={<Ops.AmOdFollowUpdAdd />}
      />
      <Route
        path="ops/am/od/visit/edit/:id"
        element={<Ops.AmOdFollowUpdEdit />}
      />

      {/* record keeping  */}

      <Route
        path="ops/am/record/visit/add/:id"
        element={<Ops.AmRecordKeepingAdd />}
      />
      <Route
        path="ops/am/record/visit/edit/:id"
        element={<Ops.AmRecordKeepingEdit />}
      />

      {/* branch Performance  */}

      <Route
        path="ops/am/performance/visit/add/:id"
        element={<Ops.AmBranchPerformanceAdd />}
      />
      <Route
        path="ops/am/performance/visit/edit/:id"
        element={<Ops.AmBranchPerformanceEdit />}
      />

      {/* AM hightlights */}
      <Route
        path="ops/am/highlights/daily/add/:id"
        element={<Ops.AmHighlightsAdd />}
      />
      <Route
        path="ops/am/highlights/daily/edit/:id"
        element={<Ops.AmHighlightsEdit />}
      />

      {/* rm  */}
      {/* group   */}
      <Route
        path="ops/rm/group/visit/add/:id"
        element={<Ops.RmGroupVisitAdd />}
      />
      <Route
        path="ops/rm/group/visit/edit/:id"
        element={<Ops.RmGroupVisitEdit />}
      />

      {/* loan  */}

      {/* <Route
        path="ops/rm/loan/visit/add/:id"
        element={<Ops.RmLoanVerificationAdd />}
      />
      <Route
        path="ops/rm/loan/visit/edit/:id"
        element={<Ops.RmLoanVerificationEdit />}
      /> */}

      {/* cash at hand  */}
      <Route
        path="ops/rm/cash/visit/add/:id"
        element={<Ops.RmCashAtHandAdd />}
      />
      <Route
        path="ops/rm/cash/visit/edit/:id"
        element={<Ops.RmCashAtHandEdit />}
      />

      {/* od  */}

      <Route
        path="ops/rm/od/visit/add/:id"
        element={<Ops.RmOdFollowUpdAdd />}
      />
      <Route
        path="ops/rm/od/visit/edit/:id"
        element={<Ops.RmOdFollowUpdEdit />}
      />

      {/* <Route
        path="ops/rm/visit/checklist/update/:id"
        element={<Ops.ChecklistUpdate />}
      /> */}

      <Route path="ops/bm/visit/submit/:id" element={<Ops.SubmitRemarks />} />
      <Route path="ops/my/review/list" element={<Ops.ReviewList />} />
      <Route path="ops/my/review/preview/:id" element={<Ops.ReviewPreview />} />
      <Route path="ops/approved/list" element={<Ops.ApprovedList />} />
      <Route
        path="ops/approved/preview/:id"
        element={<Ops.ApprovedPreview />}
      />

      <Route path="ops/am/visit/list" element={<Ops.AmVisitList />} />
      <Route path="ops/am/visit/add" element={<Ops.AmVisitAdd />} />
      <Route path="ops/am/visit/edit/:id" element={<Ops.AmVisitEdit />} />
      <Route path="ops/am/visit/preview/:id" element={<Ops.AmVisitPreview />} />

      <Route path="ops/rm/visit/list" element={<Ops.RmVisitList />} />
      <Route path="ops/rm/visit/add" element={<Ops.RmVisitAdd />} />
      <Route path="ops/rm/visit/edit/:id" element={<Ops.RmVisitEdit />} />
      <Route path="ops/rm/visit/preview/:id" element={<Ops.RmVisitPreview />} />

      {/* ---------------Rm--------  */}

      {/* group  */}
      <Route
        path="ops/rm/group/visit/add/:id"
        element={<Ops.RmGroupVisitAdd />}
      />
      <Route
        path="ops/rm/group/visit/edit/:id"
        element={<Ops.RmGroupVisitEdit />}
      />

      {/* cash at hand  */}
      <Route
        path="ops/rm/cash/visit/add/:id"
        element={<Ops.RmCashAtHandAdd />}
      />
      <Route
        path="ops/rm/cash/visit/edit/:id"
        element={<Ops.RmCashAtHandEdit />}
      />

      {/* od  */}

      <Route
        path="ops/rm/od/visit/add/:id"
        element={<Ops.RmOdFollowUpdAdd />}
      />
      <Route
        path="ops/rm/od/visit/edit/:id"
        element={<Ops.RmOdFollowUpdEdit />}
      />

      {/* record keeping  */}

      <Route
        path="ops/rm/record/visit/add/:id"
        element={<Ops.RmRecordKeepingAdd />}
      />
      <Route
        path="ops/rm/record/visit/edit/:id"
        element={<Ops.RmRecordKeepingEdit />}
      />

      {/* branch Performance  */}

      <Route
        path="ops/rm/performance/visit/add/:id"
        element={<Ops.RmBranchPerformanceAdd />}
      />
      <Route
        path="ops/rm/performance/visit/edit/:id"
        element={<Ops.RmBranchPerformanceEdit />}
      />

      {/* RM hightlights */}
      <Route
        path="ops/rm/highlights/daily/add/:id"
        element={<Ops.RmHighlightsAdd />}
      />
      <Route
        path="ops/rm/highlights/daily/edit/:id"
        element={<Ops.RmHighlightsEdit />}
      />
      {/* ------------RM ending---------------- */}

      <Route path="ops/transportBill" element={<Ops.TransportBill />} />

      <Route
        path="ops/transportBill/received/list"
        element={<Ops.TransportBillReceived />}
      />

      <Route
        path="ops/transportBill/received/details/:id"
        element={<Ops.TransportBillReceivedDetails />}
      />

      <Route
        path="ops/transportBill/list/:id"
        element={<Ops.TransportBillList />}
      />
      <Route
        path="ops/transportBill/list"
        element={<Ops.AllTravelBillSearch />}
      />

      <Route
        path="ops/transportBill/add/:id"
        element={<Ops.TransportBillAdd />}
      />

      <Route
        path="ops/transportBill/edit/:id"
        element={<Ops.TransportBillEdit />}
      />

      <Route
        path="ops/transportBill/preview/:id"
        element={<Ops.TransportBillPreview />}
      />
      <Route
        path="ops/transportBill/checkedby/preview/:id"
        element={<Ops.TransportBillCheckedByPreview />}
      />
      <Route
        path="ops/transportBill/received/preview/:id"
        element={<Ops.TransportBillReceivedPreview />}
      />

      <Route
        path="ops/transportBillDetails/list"
        element={<Ops.TransportBillDetailsList />}
      />
      <Route
        path="ops/transportBillDetails/add/:id"
        element={<Ops.TransportBillDetailsAdd />}
      />
      <Route path="ops/othersBill/edit/:id" element={<Ops.OpsOthersBill />} />

      <Route
        path="ops/transportBillDetails/edit/:id"
        element={<Ops.TransportBillDetailsEdit />}
      />
      <Route
        path="ops/transportBill/checkedBy/list"
        element={<Ops.CheckedByBillList />}
      />
      <Route
        path="ops/transportBill/checkedBy/details/:id"
        element={<Ops.CheckedByBillDetails />}
      />
      {/* Visit  */}

      <Route path="ops/visit" element={<Ops.Visit />} />
      <Route path="ops/visit/list" element={<Ops.VisitList />} />
      <Route path="ops/visit/add" element={<Ops.VisitAdd />} />
      <Route path="ops/visit/edit/:id" element={<Ops.VisitEdit />} />
      <Route path="ops/visit/preview/:id" element={<Ops.VisitPreview />} />
      <Route
        path="ops/visit/report/preview/:id"
        element={<Ops.VisitReportPreview />}
      />
      <Route path="ops/visit/doc/add" element={<Ops.VisitDocAdd />} />
      <Route path="ops/visit/doc/list/:id" element={<Ops.VisitDocList />} />
      <Route
        path="ops/visit/doc/preview/list/:id"
        element={<Ops.VisitDocPreviewList />}
      />
      <Route
        path="ops/visit/doc/bm/preview/list/:id"
        element={<Ops.VisitDocBmPreviewList />}
      />
      <Route
        path="ops/visit/doc/supervisor/preview/list/:id"
        element={<Ops.VisitDocManagerPreviewList />}
      />

      {/* porfolio */}
      <Route
        path="ops/allvisit/portfolio/add/:id"
        element={<Ops.PortfolioAnalysisAdd />}
      />
      <Route
        path="ops/allvisit/portfolio/edit/:id"
        element={<Ops.PortfolioAnalysisEdit />}
      />
      <Route
        path="ops/allvisit/portfolio/bm/edit/:id"
        element={<Ops.PortfolioAnalysisBmEdit />}
      />
      <Route
        path="ops/allvisit/portfolio/supervisor/edit/:id"
        element={<Ops.PortfolioAnalysisSupervisorEdit />}
      />

      {/*Settlement of AuditIssues:  */}
      <Route
        path="ops/allvisit/auditIssue/add/:id"
        element={<Ops.AuditIssuesAdd />}
      />
      <Route
        path="ops/allvisit/auditIssue/edit/:id"
        element={<Ops.AuditIssuesEdit />}
      />

      {/* check effect bm rm am */}
      <Route
        path="ops/allVisit/checkeffective/am/add/:id"
        element={<Ops.AmCheckAdd />}
      />
      <Route
        path="ops/allVisit/checkeffective/am/edit/:id"
        element={<Ops.AmCheckEdit />}
      />
      <Route
        path="ops/allVisit/checkeffective/bm/add/:id"
        element={<Ops.BmCheckAdd />}
      />
      <Route
        path="ops/allVisit/checkeffective/bm/edit/:id"
        element={<Ops.BmCheckEdit />}
      />
      <Route
        path="ops/allVisit/checkeffective/rm/add/:id"
        element={<Ops.RmCheckAdd />}
      />
      <Route
        path="ops/allVisit/checkeffective/rm/edit/:id"
        element={<Ops.RmCheckEdit />}
      />

      {/* feedback  */}
      <Route
        path="ops/allVisit/feedbackMsg/add/:id"
        element={<Ops.FeedbackMtgAdd />}
      />
      <Route
        path="ops/allVisit/feedbackMsg/edit/:id"
        element={<Ops.FeedbackMtgEdit />}
      />
      <Route
        path="ops/verifyLoanApp/edit/:id"
        element={<Ops.GroupVisitEdit />}
      />

      {/* borrower visit  */}

      <Route
        path="ops/allVisit/borrowerVisit/add/:id"
        element={<Ops.BorrowerVisitAdd />}
      />
      <Route
        path="ops/allVisit/borrowerVisit/edit/:id"
        element={<Ops.BorrowerVisitEdit />}
      />
      <Route
        path="ops/allVisit/borrowerVisit/list"
        element={<Ops.BorrowerVisitList />}
      />
      <Route
        path="ops/allVisit/borrowerVisit/bm/edit/:id"
        element={<Ops.BorrowerVisitBmEdit />}
      />
      <Route
        path="ops/allVisit/borrowerVisit/supervisor/edit/:id"
        element={<Ops.BorrowerVisitSupervisorEdit />}
      />

      <Route
        path="ops/cashBalanceList/edit/:id"
        element={<Ops.CashAtHandEdit />}
      />
      <Route
        path="ops/docCheckList/edit/:id"
        element={<Ops.DocumentationEdit />}
      />
      <Route
        path="ops/verifyLoanApp/bm/edit/:id"
        element={<Ops.GroupVisitBmEdit />}
      />

      <Route
        path="ops/verifyLoanApp/supervisor/edit/:id"
        element={<Ops.GroupVisitSupervisorEdit />}
      />

      <Route
        path="ops/allvisit/cashBalance/bm/edit/:id"
        element={<Ops.CashAtHandBmEdit />}
      />
      <Route
        path="ops/allvisit/cashBalance/supervisor/edit/:id"
        element={<Ops.CashAtHandSupervisorEdit />}
      />
      <Route
        path="ops/allvisit/auditIssue/supervisor/edit/:id"
        element={<Ops.AuditIssueManagerEdit />}
      />
      <Route
        path="ops/allvisit/auditIssue/bm/edit/:id"
        element={<Ops.AuditIssueBmEdit />}
      />
      <Route
        path="ops/allvisit/docCheck/bm/edit/:id"
        element={<Ops.DocCheckBmEdit />}
      />
      <Route
        path="ops/allvisit/docCheck/supervisor/edit/:id"
        element={<Ops.DocCheckSupervisorEdit />}
      />
      <Route path="ops/bm/review/visit/list" element={<Ops.BmReviewList />} />
      <Route
        path="ops/supervisor/review/visit/list"
        element={<Ops.ManagerReviewList />}
      />
      <Route
        path="ops/manager/visit/preview/:id"
        element={<Ops.ManagerPreview />}
      />
      {/* reports  */}
      <Route path="ops/reports" element={<Ops.Report />} />
      <Route
        path="ops/reports/visitHistory"
        element={<Ops.VisitHistorySearch />}
      />
      <Route
        path="ops/reports/myVisitHistory"
        element={<Ops.MyVisitHistorySearch />}
      />
      <Route
        path="ops/myVisit/report/preview/:id"
        element={<Ops.MyVisitReportPreview />}
      />
      <Route
        path="ops/reports/visitHistoryAsSupervisor"
        element={<Ops.VisitHistorySupervisorSearch />}
      />
      <Route
        path="ops/visit/supervisor/report/preview/:id"
        element={<Ops.VisitReportSupervisorPreview />}
      />
      <Route
        path="ops/reports/travelHistory"
        element={<Ops.TravelHistorySearch />}
      />
      <Route
        path="ops/reports/numberOfVisits"
        element={<Ops.VisitCountSearch />}
      />
      <Route
        path="ops/reports/myVisitCount"
        element={<Ops.MyVisitCountSearch />}
      />
      <Route
        path="ops/reports/supervisor/numberOfVisits"
        element={<Ops.VisitCountSupervisorSearch />}
      />
      <Route
        path="ops/reports/travelbill/preview/:id"
        element={<Ops.TravelBillPreview />}
      />
      <Route
        path="ops/bm/travelbill/list/:id"
        element={<Ops.BmTravelBillSearch />}
      />
      <Route
        path="ops/bm/travelbill/preview/:id"
        element={<Ops.BmTravelBillPreview />}
      />
      <Route
        path="ops/supervisor/travelbill/list/:id"
        element={<Ops.ManagerTravelBillSearch />}
      />
      <Route
        path="ops/supervisor/travelbill/preview/:id"
        element={<Ops.ManagerTravelBillPreview />}
      />
      <Route path="ops/fmpu/list" element={<Ops.FmpuList />} />
      <Route path="ops/fmpu/add" element={<Ops.FmpuAdd />} />
      <Route path="ops/fmpu/edit/:id" element={<Ops.FmpuEdit />} />

      <Route path="ops/reports/fmpu/list" element={<Ops.FmpuListReport />} />

      <Route
        path="ops/other/risk/register/list"
        element={<Ops.RiskRegisterList />}
      />

      <Route
        path="ops/other/risk/register/Details/:id"
        element={<Ops.RiskRegisterDetailsList />}
      />
    </Route>
  </Route>
);

export default opsRoutes;
