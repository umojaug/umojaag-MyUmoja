import React from "react";
import { Tab } from "@headlessui/react";
import PromotionList from "./PromotionList";
import TransferList from "./TransferList";
import DemotionList from "./DemotionList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ListTransferPromotion = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-300 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-bold text-primary rounded-lg",
                "",
                selected
                  ? "bg-white shadow"
                  : "hover:bg-umojayellow hover:text-white"
              )
            }
          >
            Transfer
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-bold text-primary rounded-lg",
                "",
                selected
                  ? "bg-white shadow"
                  : "hover:bg-umojayellow hover:text-white"
              )
            }
          >
            Promotion
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-bold text-primary rounded-lg",
                "",
                selected
                  ? "bg-white shadow"
                  : "hover:bg-umojayellow hover:text-white"
              )
            }
          >
            Demotion
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <TransferList />
          </Tab.Panel>
          <Tab.Panel>
            <PromotionList />
          </Tab.Panel>
          <Tab.Panel>
            <DemotionList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ListTransferPromotion;
