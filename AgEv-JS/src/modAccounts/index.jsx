import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const SaccoList = lazy(() => import("./sacco/SaccoList"));
const SaccoAdd = lazy(() => import("./sacco/SaccoAdd"));

const ExpenseList = lazy(() => import("./settings/expense/ExpenseList"));
const ExpenseAdd = lazy(() => import("./settings/expense/ExpenseAdd"));
const ExpenseEdit = lazy(() => import("./settings/expense/ExpenseEdit"));

const BankList = lazy(() => import("./settings/bank/BankList"));
const BankAdd = lazy(() => import("./settings/bank/BankAdd"));
const BankEdit = lazy(() => import("./settings/bank/BankEdit"));

const ForexList = lazy(() => import("./settings/forex/ForexList"));
const ForexAdd = lazy(() => import("./settings/forex/ForexAdd"));
const ForexEdit = lazy(() => import("./settings/forex/ForexEdit"));

const Settings = lazy(() => import("./settings/Settings"));

const Vouchers = lazy(() => import("./voucherFind/Vouchers"));
const PaymentVoucherList = lazy(() =>
  import("./paymentVoucher/PaymentVoucherList")
);

const ReceiveVoucherList = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherList")
);

const IncomeVoucherList = lazy(() =>
  import("./incomeVoucher/IncomeVoucherList")
);
const IncomeVoucherByBank = lazy(() =>
  import("./incomeVoucher/IncomeVoucherByBank")
);
const IncomeVoucherByCash = lazy(() =>
  import("./incomeVoucher/IncomeVoucherByCash")
);

const ExpenseVoucherList = lazy(() =>
  import("./expenseVoucher/ExpenseVoucherList")
);

const JournalVoucherList = lazy(() =>
  import("./journalVoucher/JournalVoucherList")
);

const TransferVoucherList = lazy(() =>
  import("./transferVoucher/TransferVoucherList")
);

const ReverseVoucherList = lazy(() =>
  import("./reverseVoucher/ReverseVoucherList")
);
const ReverseVoucherAdd = lazy(() =>
  import("./reverseVoucher/ReverseVoucherAdd")
);
const RequisitionApproveList = lazy(() =>
  import("./requisitionApprove/RequisitionApproveList")
);
const RequisitionApproveAdd = lazy(() =>
  import("./requisitionApprove/RequisitionApproveAdd")
);

const LedgerList = lazy(() => import("./settings/ledger/LedgerList"));
const LedgerAdd = lazy(() => import("./settings/ledger/LedgerAdd"));
const LedgerEdit = lazy(() => import("./settings/ledger/LedgerEdit"));

const SubLedgerAdd = lazy(() => import("./settings/subLedger/SubLedgerAdd"));
const SubLedgerList = lazy(() => import("./settings/subLedger/SubLedgerList"));
const SubLedgerEdit = lazy(() => import("./settings/subLedger/SubLedgerEdit"));

const GroupList = lazy(() => import("./settings/group/GroupList"));
const GroupAdd = lazy(() => import("./settings/group/GroupAdd"));
const GroupEdit = lazy(() => import("./settings/group/GroupEdit"));

const SubGroupList = lazy(() => import("./settings/subGroup/SubGroupList"));
const SubGroupAdd = lazy(() => import("./settings/subGroup/SubGroupAdd"));
const SubGroupEdit = lazy(() => import("./settings/subGroup/SubGroupEdit"));

const Reports = lazy(() => import("./reports/Report"));

const BalanceSheetList = lazy(() =>
  import("./reports/reports/BalanceSheetList")
);
const DayBookReport = lazy(() => import("./reports/reports/DayBookReport"));
const TrialBalanceReport = lazy(() =>
  import("./reports/reports/TrialBalanceReport")
);
const LedgerReport = lazy(() => import("./reports/reports/LedgerReport"));
const ProfitAndLossAccountList = lazy(() =>
  import("./reports/reports/ProfitAndLossAccountList")
);

const LedgerBalanceReport = lazy(() =>
  import("./reports/reports/LedgerBalanceReport")
);

const BankBookReport = lazy(() => import("./reports/reports/BankBookReport"));
const CashBookReport = lazy(() => import("./reports/reports/CashBookReport"));
const ChartOfAccountReport = lazy(() =>
  import("./reports/reports/ChartOfAccountReport")
);

const OpenningList = lazy(() => import("./settings/openning/OpenningList"));
const DayOpen = lazy(() => import("./settings/dayOpenClose/DayOpen"));
const DayClose = lazy(() => import("./settings/dayOpenClose/DayClose"));
const DayOpenList = lazy(() => import("./settings/dayOpenClose/DayOpenList"));

const VoucherMappingList = lazy(() =>
  import("./settings/voucherMapping/VoucherMappingList")
);
const VoucherMappingAdd = lazy(() =>
  import("./settings/voucherMapping/VoucherMappingAdd")
);
const VoucherMappingEdit = lazy(() =>
  import("./settings/voucherMapping/VoucherMappingEdit")
);

const FundTransfer = lazy(() => import("./fundTransfer/FundTransfer"));

const FundTransferList = lazy(() => import("./fundTransfer/FundTransferList"));
const FundTransferReceivedList = lazy(() =>
  import("./fundTransfer/receivedList/FundTransferReceivedList")
);
const FundTransferByBranch = lazy(() =>
  import("./fundTransfer/byBranch/FundTransferByBranch")
);

const FundTransferByHead = lazy(() =>
  import("./fundTransfer/byHead/FundTransferByHead")
);

const AcReportGenerate = lazy(() =>
  import("./report-generate/AcReportGenerate")
);
const DayManagement = lazy(() => import("./dayManagement/DayManagement"));
const DayCloseRequest = lazy(() =>
  import("./dayManagement/dayCloseRequest/DayCloseRequest")
);
const DayCloseApprove = lazy(() =>
  import("./dayManagement/dayCloseApprove/DayCloseApprove")
);

const VoucherClassificationList = lazy(() =>
  import("./settings/voucherClassification/VoucherClassificationList")
);
const VoucherClassificationAdd = lazy(() =>
  import("./settings/voucherClassification/VoucherClassificationAdd")
);
const VoucherClassificationEdit = lazy(() =>
  import("./settings/voucherClassification/VoucherClassificationEdit")
);

export {
  Dashboard,
  SaccoList,
  SaccoAdd,
  Vouchers,
  PaymentVoucherList,
  ReceiveVoucherList,
  IncomeVoucherList,
  IncomeVoucherByBank,
  IncomeVoucherByCash,
  ExpenseVoucherList,
  JournalVoucherList,
  TransferVoucherList,
  ReverseVoucherList,
  ReverseVoucherAdd,
  RequisitionApproveList,
  RequisitionApproveAdd,
  ExpenseList,
  ExpenseAdd,
  ExpenseEdit,
  BankList,
  BankAdd,
  BankEdit,
  ForexList,
  ForexAdd,
  ForexEdit,
  LedgerList,
  LedgerAdd,
  LedgerEdit,
  Settings,
  GroupList,
  GroupAdd,
  GroupEdit,
  SubGroupList,
  SubGroupAdd,
  SubGroupEdit,
  SubLedgerAdd,
  SubLedgerList,
  SubLedgerEdit,
  Reports,
  BalanceSheetList,
  DayBookReport,
  LedgerReport,
  ProfitAndLossAccountList,
  TrialBalanceReport,
  LedgerBalanceReport,
  BankBookReport,
  CashBookReport,
  ChartOfAccountReport,
  OpenningList,
  DayOpenList,
  DayOpen,
  DayClose,
  VoucherMappingEdit,
  VoucherMappingAdd,
  VoucherMappingList,
  FundTransfer,
  FundTransferList,
  FundTransferReceivedList,
  FundTransferByBranch,
  FundTransferByHead,
  AcReportGenerate,
  DayManagement,
  DayCloseRequest,
  DayCloseApprove,
  VoucherClassificationList,
  VoucherClassificationAdd,
  VoucherClassificationEdit,
};
