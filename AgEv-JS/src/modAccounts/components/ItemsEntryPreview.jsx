import React from "react";
import { FiDelete } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const ItemsEntryPreview = ({
  items,
  removeItem,
  removeAllItem,
  previewFor = "",
  mode = "create"
}) => {
  if (items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => {
    if (a.entryType === "Dr" && b.entryType === "Cr") return -1;
    if (a.entryType === "Cr" && b.entryType === "Dr") return 1;
    return 0;
  });

  const totalDr = items.reduce((sum, item) => sum + item.dr, 0);
  const totalCr = items.reduce((sum, item) => sum + item.cr, 0);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 border-b text-left">Account Head</th>
            <th className="px-4 py-2 border-b text-left">Description</th>
            <th className="px-4 py-2 border-b text-right">
              Dr ({import.meta.env.VITE_CURRENCY})
            </th>
            <th className="px-4 py-2 border-b text-right">
              Cr ({import.meta.env.VITE_CURRENCY})
            </th>

            <th className="px-4 py-2 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2 border-b">{item.ledgerName}</td>
              <td className="px-4 py-2 border-b">{item.particulars}</td>
              <td className="px-4 py-2 border-b text-right">
                {item.dr > 0 ? item.dr.toLocaleString("en-US") : "-"}
              </td>
              <td className="px-4 py-2 border-b text-right">
                {item.cr > 0 ? item.cr.toLocaleString("en-US") : "-"}
              </td>

              <td className="px-4 py-2 border-b text-center">
                {item.entryType === "Dr" &&
                  previewFor !== "receiveVoucher" &&
                  previewFor !== "journalVoucher" &&
                  previewFor !== "openingVoucher" && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  )}
                {item.entryType === "Cr" &&
                  previewFor === "receiveVoucher" &&
                  previewFor !== "journalVoucher" &&
                  previewFor !== "openingVoucher" && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  )}
                {(previewFor === "journalVoucher" ||
                  previewFor === "openingVoucher") && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td className="px-4 py-2 border-b">Total</td>
            <td className="px-4 py-2 border-b"></td>
            <td className="px-4 py-2 border-b text-right">
              {totalDr.toLocaleString("en-US")}
            </td>
            <td className="px-4 py-2 border-b text-right">
              {totalCr.toLocaleString("en-US")}
            </td>
            <td className="px-4 py-2 border-b text-center" colSpan="2">
              {mode === "create" && <button
                onClick={removeAllItem}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
              >
                <FiDelete size={20} />
              </button>}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ItemsEntryPreview;
