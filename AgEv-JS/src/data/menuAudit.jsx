import {
  AiOutlineSetting,
  AiFillCarryOut,
  AiOutlineCluster,
  AiOutlineTeam,
  AiOutlineUserDelete,
  AiOutlineBgColors,
  // AiOutlineSolution,
  // AiOutlineFontColors,
  // AiOutlineCoffee,
  // AiOutlineCarryOut,
} from "react-icons/ai";
import { FaBook, FaCube, FaFile, FaUnlockAlt } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";

export const menuAudit = {
  menuData: [
    {
      name: "Planning",
      link: "/audit/planning/submenu",
      icon: "AiOutlineFontColors",
    },
    {
      name: "Execution",
      link: "/audit/execution",
      icon: "AiOutlineSolution",
    },
    {
      name: "Reporting",
      link: "/audit/reporting",
      icon: "AiFillCarryOut",
    },
    {
      name: "Others",
      link: "/audit/othersAudit",
      icon: "MdSummarize",
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/audit/settings",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Branch Audit Test Steps",
      link: "/audit/settings/teststeps/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Audit Year Open",
      link: "/audit/settings/auditYear",
      Icon: FaUnlockAlt,
    },
    {
      name: "Inherent Risk",
      link: "/audit/settings/inherentrisk/list",
      Icon: AiOutlineBgColors,
    },
    {
      name: "Residual Risk",
      link: "/audit/settings/residualrisk/list",
      Icon: FaUnlockAlt,
    },
    {
      name: "Weightage",
      link: "/audit/settings/weightage/List",
      Icon: FaUnlockAlt,
    },
    {
      name: "Previous Data Upload",
      link: "/audit/settings/previousdata/list",
      Icon: FaFile,
    },
    {
      name: "Departmental Audit Tests",
      link: "/audit/settings/departmentAuditTest/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Special Investigation",
      link: "/audit/settings/specialInvestigation/list",
      Icon: MdSummarize,
    },
    {
      name: "Primary Root Cause",
      link: "/audit/settings/primaryRootCause/list",
      Icon: MdSummarize,
    },
    {
      name: "Risk Implication",
      link: "/audit/settings/riskImplication/list",
      Icon: MdSummarize,
    },
    {
      name: "Type Of Fraud",
      link: "/audit/settings/typeOfFraud/list",
      Icon: MdSummarize,
    },
  ],
  planningMenuData: [
    {
      name: "Audit Workplan",
      link: "/audit/workplan/list",
      Icon: AiFillCarryOut,
    },
    {
      name: "Audit Planning",
      link: "/audit/planning",
      Icon: FaBook,
    },
  ],

  executionMenuData: [
    {
      name: "Branch Audits",
      link: "/audit/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Departmental Audit",
      link: "/audit/excution/departmental/list",
      Icon: FaUnlockAlt,
    },
    {
      name: "Special Investigation",
      link: "/audit/investigation/list",
      Icon: AiOutlineCluster,
    },
  ],

  reportingMenuData: [
    {
      name: "Branch / Department Audit Reports",
      link: "/audit/reporting/department/branch/list",
      Icon: FaBook,
    },
    {
      name: "Special Investigation Audit Report",
      link: "/audit/reporting/Special/Investigation/list",
      Icon: FaCube,
    },
    {
      name: "Region / Department Audit Reports",
      link: "/audit/reporting/department/region/list",
      Icon: FaCube,
    },
  ],
  othersMenuData: [
    {
      name: "Audit Workplan Summary",
      link: "/audit/workplanSummary/list",
      Icon: AiOutlineTeam,
    },

    {
      name: "Closed Audits",
      link: "/audit/closeList",
      Icon: AiOutlineUserDelete,
    },
    {
      name:"Audit Track Fraud",
      link:"/audit/track/fraud/list",
      Icon:AiOutlineTeam
    }
  ],
};
