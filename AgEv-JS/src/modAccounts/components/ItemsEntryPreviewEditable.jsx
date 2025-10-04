import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";

const ItemsEntryPreviewEditable = ({
  items,
  setItems,
  removeItem,
  previewFor = "",
}) => {
  const [localValues, setLocalValues] = useState({});

  if (items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => {
    if (a.entryType === "Dr" && b.entryType === "Cr") return -1;
    if (a.entryType === "Cr" && b.entryType === "Dr") return 1;
    return 0;
  });

  const totalDr = items.reduce((sum, item) => sum + item.dr, 0);
  const totalCr = items.reduce((sum, item) => sum + item.cr, 0);

  const formatNumber = (num) => {
    if (!num || num === 0) return "";
    return num.toLocaleString("en-US");
  };

  const parseNumber = (str) => {
    if (!str) return 0;
    return Number(String(str).replace(/,/g, ""));
  };

  const formatInputValue = (value) => {
    if (!value) return "";
    const numericValue = String(value).replace(/[^0-9.]/g, "");

    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[0]) {
      const integerPart = Number(parts[0]).toLocaleString("en-US");
      return parts[1] !== undefined ? integerPart + '.' + parts[1] : integerPart;
    }

    return numericValue;
  };

  const getInputValue = (itemId, field) => {
    if (localValues[itemId] && localValues[itemId][field] !== undefined) {
      return localValues[itemId][field];
    }

    const item = items.find(item => item.id === itemId);
    if (!item) return "";

    if (field === 'particulars') {
      return item.particulars;
    } else if (field === 'amount') {
      const amount = item.entryType === "Dr" ? item.dr : item.cr;
      return amount > 0 ? formatNumber(amount) : "";
    }
    return "";
  };

  const handleInputChange = (itemId, field, value) => {
    let processedValue = value;

    if (field === 'amount') {
      processedValue = formatInputValue(value);
    }

    setLocalValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: processedValue
      }
    }));
  };

  const handleInputBlur = (itemId, field, value) => {
    setLocalValues(prev => {
      const newValues = { ...prev };
      if (newValues[itemId]) {
        delete newValues[itemId][field];
        if (Object.keys(newValues[itemId]).length === 0) {
          delete newValues[itemId];
        }
      }
      return newValues;
    });

    if (field === 'particulars') {
      if (!value || value.trim() === "") {
        toast.error("Description is required!");
        return;
      }
    }

    if (field === 'amount') {
      if (!value || value.toString().trim() === "") {
        toast.error("Amount is required!");
        return;
      }

      const numericAmount = parseNumber(value);

      if (isNaN(numericAmount) || numericAmount <= 0) {
        toast.error("Amount must be a valid number greater than 0!");
        return;
      }
    }
    updateItem(itemId, field, value);
  };

  const updateItem = (itemId, field, value) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          if (field === 'particulars') {
            return {
              ...item,
              particulars: value.trim()
            };
          } else if (field === 'amount') {
            const numericAmount = parseNumber(value);
            return {
              ...item,
              dr: item.entryType === "Dr" ? numericAmount : item.dr,
              cr: item.entryType === "Cr" ? numericAmount : item.cr,
            };
          }
        }
        return item;
      });

      if ((previewFor === "expenseVoucher" || previewFor === "incomeVoucher" || previewFor === "paymentVoucher") && field === 'amount') {
        const totalDr = updatedItems
          .filter((item) => item.entryType === "Dr")
          .reduce((sum, item) => sum + item.dr, 0);

        return updatedItems.map((item) =>
          item.entryType === "Cr" ? { ...item, cr: totalDr } : item
        );
      }

      if (previewFor === "receiveVoucher" && field === 'amount') {
        const totalCr = updatedItems
          .filter((item) => item.entryType === "Cr")
          .reduce((sum, item) => sum + item.cr, 0);

        return updatedItems.map((item) =>
          item.entryType === "Dr" ? { ...item, dr: totalCr } : item
        );
      }

      return updatedItems;
    });
  };

  const canEdit = (item) => {
    if (previewFor === "expenseVoucher" || previewFor === "incomeVoucher" || previewFor === "paymentVoucher") {
      return item.entryType === "Dr";
    } else if (previewFor === "receiveVoucher") {
      return item.entryType === "Cr";
    } else if (previewFor === "journalVoucher") {
      return true;
    }
    return false;
  };

  const canDelete = (item) => {
    if (previewFor === "expenseVoucher" || previewFor === "incomeVoucher" || previewFor === "paymentVoucher") {
      return item.entryType === "Dr";
    } else if (previewFor === "receiveVoucher") {
      return item.entryType === "Cr";
    } else if (previewFor === "journalVoucher") {
      return true;
    }
    return false;
  };

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

              <td className="px-4 py-2 border-b">
                {canEdit(item) ? (
                  <input
                    type="text"
                    value={getInputValue(item.id, 'particulars')}
                    onChange={(e) => handleInputChange(item.id, 'particulars', e.target.value)}
                    onBlur={(e) => handleInputBlur(item.id, 'particulars', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    maxLength={250}
                    placeholder="Enter description"
                    required
                  />
                ) : (
                  item.particulars
                )}
              </td>

              <td className="px-4 py-2 border-b text-right">
                {canEdit(item) && item.entryType === "Dr" ? (
                  <input
                    type="text"
                    value={getInputValue(item.id, 'amount')}
                    onChange={(e) => handleInputChange(item.id, 'amount', e.target.value)}
                    onBlur={(e) => handleInputBlur(item.id, 'amount', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
                    placeholder="Enter amount"
                    required
                  />
                ) : (
                  item.dr > 0 ? formatNumber(item.dr) : "-"
                )}
              </td>

              <td className="px-4 py-2 border-b text-right">
                {canEdit(item) && item.entryType === "Cr" ? (
                  <input
                    type="text"
                    value={getInputValue(item.id, 'amount')}
                    onChange={(e) => handleInputChange(item.id, 'amount', e.target.value)}
                    onBlur={(e) => handleInputBlur(item.id, 'amount', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
                    placeholder="Enter amount"
                    required
                  />
                ) : (
                  item.cr > 0 ? formatNumber(item.cr) : "-"
                )}
              </td>

              <td className="px-4 py-2 border-b text-center">
                {canDelete(item) && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    title="Delete item"
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
              {formatNumber(totalDr)}
            </td>
            <td className="px-4 py-2 border-b text-right">
              {formatNumber(totalCr)}
            </td>
            <td className="px-4 py-2 border-b text-center">
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ItemsEntryPreviewEditable;