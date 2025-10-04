import {
  AiOutlineUsergroupAdd,
  AiOutlineUserDelete,
  AiOutlineIdcard,
  AiOutlineSchedule,
  AiOutlineReconciliation,
  AiOutlineApartment,
  AiOutlineCoffee,
  AiOutlineRead,
  AiOutlineSetting,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineSolution,
  AiOutlineUserAdd,
  AiOutlineGift,
  AiOutlineFilePpt,
  AiOutlineControl,
  AiOutlineUnorderedList,
  AiOutlineStop,
  AiOutlineBgColors,
  AiOutlineCarryOut,
  AiOutlineBank,
  AiOutlineCalculator,
  AiOutlineBorderOuter,
  AiOutlineBorderlessTable,
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineFileImage,
  AiOutlineHdd,
  AiOutlineMail,
  AiOutlineAudit,
  AiOutlineExpand,
  AiOutlinePlayCircle,
  AiOutlineContacts,
  AiOutlineRise,

} from "react-icons/ai";

import { MdAirplanemodeActive, MdCalendarToday, MdStop } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { IoTrailSignOutline } from "react-icons/io5";

export const menuHr = {
  menuData: [
    {
      name: "Reports",
      link: "/hr/reports",
      Icon: AiOutlineSolution,
    },
    {
      name: "Employees",
      link: "/hr/employee/List",
      Icon: AiOutlineTeam,
    },
    {
      name: "Notice",
      link: "/hr/notice/list",
      Icon: AiOutlineFileText,
    },
    {
      name: "Message",
      link: "/hr/message/list",
      Icon: AiOutlineMail,
    },
    {
      name: "Training",
      link: "/hr/training/list",
      Icon: AiOutlineRead,
    },
    {
      name: "Training Evaluation",
      link: "/hr/training/evaluation/list",
      Icon: AiOutlineRead,
    },
    {
      name: "Attendance",
      link: "/hr/attendance/list",
      Icon: AiOutlineIdcard,
    },

    {
      name: "Leave",
      link: "/hr/leave",
      Icon: AiOutlineCoffee,
    },
    {
      name: "Disciplinary Letter",
      link: "/hr/disciplinary/list",
      Icon: AiOutlineHdd,
    },
    {
      name: "Resign",
      link: "/hr/resign/list",
      Icon: AiOutlineUserDelete,
    },
    {
      name: "Transfer/Promotion/Demotion",
      link: "/hr/transferpromotion/list",
      Icon: AiOutlineBgColors,
    },
    {
      name: "Increment",
      link: "/hr/increment/list",
      Icon: AiOutlineRise,
    },
    {
      name: "Allowance Deduction",
      link: "/hr/allowance-deduction/list",
      Icon: AiOutlineSchedule,
    },
    {
      name: "Stop Salary Payment",
      link: "/hr/salary/stop/list",
      Icon: AiOutlineStop,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/hr/settings",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Departments",
      link: "/hr/settings/department/list",
      Icon: AiOutlineApartment,
    },
    {
      name: "Designation",
      link: "/hr/settings/designation/list",
      Icon: AiOutlineUsergroupAdd,
    },
    {
      name: "Education",
      link: "/hr/settings/education/list",
      Icon: AiOutlineRead,
    },
    {
      name: "Shift",
      link: "/hr/settings/shift/list",
      Icon: AiOutlineReconciliation,
    },
    {
      name: "Leave",
      link: "/hr/settings/leave/list",
      Icon: AiOutlineCoffee,
    },
    {
      name: "Resign Reasons",
      link: "/hr/settings/resign-reason/list",
      Icon: AiOutlineUserDelete,
    },
    {
      name: "Staff Type",
      link: "/hr/settings/staff-type/list",
      Icon: AiOutlineIdcard,
    },
    {
      name: "Allowance / Deduction",
      link: "/hr/settings/allowance-deduction/list",
      Icon: AiOutlineSchedule,
    },
    {
      name: "Evaluation Type",
      link: "/hr/evaluation/type/list",
      Icon: AiOutlineTeam,
    },
    {
      name: "Manager Mapping",
      link: "/hr/settings/manager-mapping/list",
      Icon: FaSitemap,
    },
  ],
  evaluationData: [],
  reportsBasic: [
    {
      name: "Employee List",
      link: "/hr/reports/employee/list",
      Icon: AiOutlineTeam,
    },
    {
      name: "New Join",
      link: "/hr/reports/employee/newjoin",
      Icon: AiOutlineUserAdd,
    },
    {
      name: "Active Employee",
      link: "/hr/reports/employee/activeEmployee",
      Icon: MdAirplanemodeActive,
    },
    {
      name: "Resign List",
      link: "/hr/reports/employee/resign",
      Icon: AiOutlineUserDelete,
    },
    {
      name: "Birthday List",
      link: "/hr/reports/employee/birthday",
      Icon: AiOutlineGift,
    },
    {
      name: "Transfer List",
      link: "/hr/reports/employee/transfer",
      Icon: AiOutlineBgColors,
    },
    {
      name: "Promotion List",
      link: "/hr/reports/employee/promotion",
      Icon: AiOutlineCarryOut,
    },
    {
      name: "Deomotion List",
      link: "/hr/reports/employee/demotion",
      Icon: AiOutlineCarryOut,
    },
    {
      name: "Transfer, Promotion & Demotion List",
      link: "/hr/reports/employee/history",
      Icon: AiOutlineExpand,
    },
    {
      name: "Disciplinary Letter List",
      link: "/hr/reports/employee/disciplinary",
      Icon: AiOutlineHdd,
    },
    {
      name: "Tenure List",
      link: "/hr/reports/employee/tenure",
      Icon: AiOutlineDashboard,
    },
    {
      name: "Notice Status",
      link: "/hr/reports/employee/notice",
      Icon: AiOutlineFileText,
    },
    {
      name: "Employee Position",
      link: "/hr/reports/employee/position",
      Icon: AiOutlineApartment,
    },
    {
      name: "Audit Trail",
      link: "/hr/reports/employee/audit-trail",
      Icon: IoTrailSignOutline,
    },
    {
      name: "Application Audit Trail",
      link: "/hr/reports/employee/audittrail",
      Icon: IoTrailSignOutline,
    },
    {
      name: "Time Log Summery",
      link: "/hr/reports/employee/timelogsummery",
      Icon: IoTrailSignOutline,
    },
    {
      name: "Time Log Card",
      link: "/hr/reports/employee/timelogcard",
      Icon: IoTrailSignOutline,
    },
    {
      name: "Training Evaluation ",
      link: "/hr/reports/training/evaluation",
      Icon: IoTrailSignOutline,
    },


  ],
  reportsAttendance: [
    {
      name: "Leave List",
      link: "/hr/reports/employee/leave",
      Icon: AiOutlineCoffee,
    },
    {
      name: "Leave Balance",
      link: "/hr/reports/employee/leave/balance",
      Icon: AiOutlineFileImage,
    },
    {
      name: "Attendance",
      link: "/hr/reports/employee/attendance",
      Icon: AiOutlineIdcard,
    },
    {
      name: "Periodic Staff Position",
      link: "/hr/reports/employee/staff/position",
      Icon: MdCalendarToday,
    },

    {
      name: "Monthly Employee List",
      link: "/hr/reports/monthly/employee",
      Icon: AiOutlineAudit,
    },
    {
      name: "Advance Salary",
      link: "/hr/reports/employee/advanceSalary",
      Icon: AiOutlineAudit,
    },
    {
      name: "Month wise Employee position",
      link: "/hr/reports/employee/monthly/position",
      Icon: AiOutlineAudit,
    },
  ],
  reportsPayroll: [
    {
      name: "Salary Attendance",
      link: "/hr/reports/payroll/attendance",
      Icon: AiOutlineContacts,
    },
    {
      name: "Allowance Deduction",
      link: "/hr/reports/payroll/allded",
      Icon: AiOutlineSchedule,
    },
    {
      name: "Stop Salary sheet",
      link: "/hr/reports/payroll/salarysheet/stop",
      Icon: AiOutlineStop,
    },
    {
      name: "Salary Sheet",
      link: "/hr/reports/payroll/salarysheet",
      Icon: AiOutlineCalculator,
    },
    {
      name: "Payslip",
      link: "/hr/reports/payroll/payslip",
      Icon: AiOutlineFilePpt,
    },
    {
      name: "Sacco sheet",
      link: "/hr/reports/payroll/sacco",
      Icon: AiOutlineUnorderedList,
    },
    {
      name: "TAX Paye sheet",
      link: "/hr/reports/payroll/taxpaye",
      Icon: AiOutlineBorderOuter,
    },
    {
      name: "NSSF sheet",
      link: "/hr/reports/payroll/nssf",
      Icon: AiOutlineBorderlessTable,
    },
    {
      name: "Bank sheet",
      link: "/hr/reports/payroll/bank",
      Icon: AiOutlineBank,
    },
    {
      name: "Stop salary paid",
      link: "/hr/reports/stop/salaryPaid",
      Icon: MdStop,
    },
  ],
  subLeaveData: [
    {
      name: "Opening Leave Balance",
      link: "/hr/leave/openning/balance",
      Icon: AiOutlinePlayCircle,
    },
  ],
  trainingData: [
    {
      name: "Topic",
      link: "/hr/training/topic/list",
      Icon: AiOutlineControl,
    },
    {
      name: "Category",
      link: "/hr/training/category/list",
      Icon: AiOutlineBook,
    },
  ],
};
