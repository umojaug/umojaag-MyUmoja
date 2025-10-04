import {
  AiFillContainer,
  AiFillFileAdd,
  AiFillMoneyCollect,
  AiOutlineAudit,
  AiOutlineContacts,
  AiOutlineSchedule,
  AiOutlineSolution,
} from "react-icons/ai";

import { RiFolderReceivedFill } from "react-icons/ri";
import { SiCountingworkspro } from "react-icons/si";
import {
  MdApproval,
  MdAssignment,
  MdOutlineTravelExplore,
} from "react-icons/md";

export const menuOperations = {
  menuData: [
    {
      name: "Reports",
      link: "/ops/reports",
      Icon: AiOutlineSolution,
    },
    {
      name: "Visits",
      link: "/ops/visit",
      Icon: AiOutlineAudit,
    },
    {
      name: "Transport Bill",
      link: "/ops/transportBill",
      Icon: AiFillMoneyCollect,
    },
  ],

  travelingData: [
    {
      name: "Travel Bill List",
      link: "/ops/transportBill/list",
      Icon: AiFillMoneyCollect,
    },
    {
      name: "Checked By Applications",
      link: "/ops/transportBill/checkedBy/list",
      Icon: AiFillMoneyCollect,
    },
    {
      name: "Application Received as Supervisor",
      link: "/ops/transportBill/received/list",
      Icon: AiFillMoneyCollect,
    },
  ],

  allVisitMenuData: [
    {
      name: "My Visit",
      link: "/ops/visit/list",
      Icon: AiFillFileAdd,
    },

    {
      name: "Application Received As BM",
      link: "/ops/bm/review/visit/list",
      Icon: RiFolderReceivedFill,
    },
    {
      name: "Application Received As Supervisor",
      link: "/ops/supervisor/review/visit/list",
      Icon: RiFolderReceivedFill,
    },
  ],

  reportsData: [
    {
      name: "My Visit History",
      link: "/ops/reports/myVisitHistory",
      Icon: AiOutlineSchedule,
    },

    {
      name: "Visit History As Supervisor",
      link: "/ops/reports/visitHistoryAsSupervisor",
      Icon: AiOutlineContacts,
    },
    {
      name: "All Visit History",
      link: "/ops/reports/visitHistory",
      Icon: AiFillContainer,
    },
    {
      name: "My Visit Count",
      link: "/ops/reports/myVisitCount",
      Icon: SiCountingworkspro,
    },
    {
      name: "Visit Count for Approval",
      link: "/ops/reports/supervisor/numberOfVisits",
      Icon: MdApproval,
    },
    {
      name: "Visit Count All",
      link: "/ops/reports/numberOfVisits",
      Icon: MdAssignment,
    },
    {
      name: "Travel Bill History",
      link: "/ops/reports/travelHistory",
      Icon: MdOutlineTravelExplore,
    },
  ],

  fmpuMenuData: [
    {
      name: "FMPU Reporting",
      link: "/ops/fmpu/list",
      Icon: MdOutlineTravelExplore,
    },
  ],
};
