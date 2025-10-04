import React from "react";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";
import ProcessButton from "../../components/button/ProcessButton";
import { useGlobalContext } from "../../hooks/context";

const Reports = () => {
  const value = useGlobalContext();

  const hrbasic = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Hr".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase() &&
      item.section.toLowerCase() === "N/A".toLowerCase()
    )
      return item;
    else return null;
  });
  const hrjob = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Hr".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase() &&
      item.section.toLowerCase() === "Job".toLowerCase()
    )
      return item;
    else return null;
  });

  const hrAttendance = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Hr".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase() &&
      item.section.toLowerCase() === "Attandance".toLowerCase()
    )
      return item;
    else return null;
  });

  const payroll = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Hr".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase() &&
      item.section.toLowerCase() === "PayRole".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Reports
        </h1>
        {(value.role === "HR Manager" ||
          value.role === "HR Executive" ||
          value.role === "Accounts Executive" ||
          value.role === "Accounts Manager" ||
          value.role === "Super Admin") && (
          <ProcessButton
            title="Salary Process"
            path="/emppayroll/salaryprocess"
          />
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hrbasic.length > 0 &&
          hrbasic.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
      <div className="section-title">Job section</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hrjob.length > 0 &&
          hrjob.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
      <div className="section-title">Attendance</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hrAttendance.length > 0 &&
          hrAttendance.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
      <div className="section-title">Payroll</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {payroll.length > 0 &&
          payroll.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
    </div>
  );
};

export default Reports;
