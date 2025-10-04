// import { AiOutlineBank, AiOutlineSwap, AiOutlineSetting } from "react-icons/ai";
// import { MdOutlineRequestQuote } from "react-icons/md";
// export const menuAccounts = {
//   menuData: [
//     {
//       name: "Sacco Withdraw",
//       link: "/ac/sacco/withdraw/list",
//       Icon: MdOutlineRequestQuote,
//     },
//   ],
//   settingMenuData: [
//     {
//       name: "Settings",
//       link: "/ac/settings",
//       Icon: AiOutlineSetting,
//     },
//   ],
//   subSettingMenuData: [
//     {
//       name: "Bank",
//       link: "/ac/settings/bank/list",
//       Icon: AiOutlineBank,
//     },
//     {
//       name: "Forex",
//       link: "/ac/settings/forex/list",
//       Icon: AiOutlineSwap,
//     },
//   ],
// };

import {
  AiFillBank,
  AiOutlineAccountBook,
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineSwap,
} from "react-icons/ai";
import { BiBookContent, BiReceipt } from "react-icons/bi";
import {
  BsFillJournalBookmarkFill,
  BsJournalText,
  BsSubtract,
  BsDoorOpenFill,
} from "react-icons/bs";

import { FaLayerGroup, FaObjectUngroup } from "react-icons/fa";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineRequestQuote,
  MdPayment,
} from "react-icons/md";

import { GiIncomingRocket } from "react-icons/gi";
import { RiBankCardLine } from "react-icons/ri";

export const menuAccounts = {
  menuData: [
    {
      name: "Sacco Withdraw",
      link: "/ac/sacco/withdraw/list",
      Icon: MdOutlineRequestQuote,
    },
    {
      name: "Reports",
      link: "/ac/reports/account",
      Icon: AiOutlineSolution,
    },
    {
      name: "Expense Voucher",
      link: "/ac/expenseVoucher/list",
      Icon: MdOutlineRequestQuote,
    },
    {
      name: "Income Voucher",
      link: "/ac/incomeVoucher/list",
      Icon: GiIncomingRocket,
    },
    {
      name: "Journal Voucher",
      link: "/ac/journalVoucher/list",
      Icon: BsJournalText,
    },

    {
      name: "Payment Voucher",
      link: "/ac/paymentVoucher/list",
      Icon: MdPayment,
    },
    {
      name: "Receive Voucher",
      link: "/ac/receiveVoucher/list",
      Icon: BiReceipt,
    },
    {
      name: "Transfer Voucher",
      link: "/ac/transferVoucher/list",
      Icon: BsJournalText,
    },
  ],
  reports: [
    {
      name: "Day Book",
      link: "/ac/report/day/book",
      Icon: BsFillJournalBookmarkFill,
    },
    {
      name: "Ledger",
      link: "/ac/report/ledger",
      Icon: BiBookContent,
    },
    {
      name: "Trial Balance",
      link: "/ac/report/trial/balance",
      Icon: MdOutlineAccountBalanceWallet,
    },

    {
      name: "Bank Book ",
      link: "/ac/report/bankbook",
      Icon: RiBankCardLine,
    },

    {
      name: "Cash Book ",
      link: "/ac/report/cashbook",
      Icon: AiOutlineAccountBook,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/ac/settings",
      Icon: AiOutlineSetting,
    },
  ],
  dayOpenClose: [
    {
      name: "Day Status",
      link: "/settings/day/list",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Group",
      link: "/ac/settings/group/list",
      Icon: FaLayerGroup,
    },
    {
      name: "Sub Group",
      link: "/ac/settings/subGroup/list",
      Icon: FaObjectUngroup,
    },
    {
      name: "Ledger",
      link: "/ac/settings/ledger/list",
      Icon: FaObjectUngroup,
    },
    {
      name: "Sub Ledger",
      link: "/ac/settings/subLedger/list",
      Icon: BsSubtract,
    },

    {
      name: "Forex",
      link: "/ac/settings/forex/list",
      Icon: AiOutlineSwap,
    },
    {
      name: "Bank",
      link: "/ac/settings/bank/list",
      Icon: AiFillBank,
    },
    {
      name: "Openning",
      link: "/ac/settings/openning/list",
      Icon: BsDoorOpenFill,
    },
  ],
};
