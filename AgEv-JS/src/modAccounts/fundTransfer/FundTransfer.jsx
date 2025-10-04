import React from "react";
import { useGlobalContext } from "../../hooks/context";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";

const FundTransfer = () => {
  const value = useGlobalContext();

  const FundTransferSubMenus = value.subMenus.filter((item) => {
    return (
      item.moduleName.toLowerCase() === "Accounts".toLowerCase() &&
      item.menuName.toLowerCase() === "Fund Transfer".toLowerCase() &&
      item.section.toLowerCase() === "N/A".toLowerCase()
    );
  });

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Fund Transfer
        </h1>
      </div>

      {FundTransferSubMenus.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FundTransferSubMenus.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FundTransfer;
