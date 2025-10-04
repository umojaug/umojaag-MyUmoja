import {
  Dialog,
  DialogBackdrop,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetData, usePostData } from "../../hooks/dataApi";
import { IoMdClose } from "react-icons/io";
import { HashLoading } from "../Loading";
import Error from "../Error";

const DenominationButton = ({ path, businessDayId, action }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState([]);
  const currencyType = import.meta.env.VITE_CURRENCY;

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "dailyDenomination",
    `/acBusinessDay/dailyDenomination/${businessDayId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const { cashBalance, denomination } = list.data;

  if (denomination && counts.length === 0) {
    setCounts(denomination.map((item) => item.noteCount || 0));
  }

  const handleCountChange = (index, value) => {
    const newCounts = [...counts];
    newCounts[index] = parseInt(value) || 0;
    setCounts(newCounts);
  };

  const calculateTotal = (currency, count) => {
    return currency * count;
  };

  const grandTotal = counts.reduce((sum, count, index) => {
    if (denomination && denomination[index]) {
      return sum + denomination[index].noteValue * count;
    }
    return sum;
  }, 0);

  const onSubmit = async () => {
    if (grandTotal !== parseFloat(cashBalance)) {
      toast.error(
        `Total amount (${grandTotal}) must equal cash balance (${cashBalance})`
      );
      return;
    }

    setSubmitting(true);

    const payload = denomination
      .map((item, index) => ({
        businessDayId: item.businessDayId,
        noteValue: item.noteValue,
        noteCount: counts[index] || 0,
      }));

    console.log("Payload to be sent:", payload);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: payload,
      });

      if (status === 201) {
        toast.success("Denomination saved.");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
      action();
      refetch();
      setSubmitting(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn bg-yellow-500 w-25 font-bold"
        onClick={() => {
          openModal();
        }}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Denomination"
      >
        Denomination
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 w-screen overflow-y-auto p-2">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="w-full max-w-3xl space-y-2 border bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg text-gray-800 font-medium">
                    Day Close History of Cash
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>

                <div className="mb-3">
                  <h4 className="text-base text-blue-600 font-semibold mb-2">
                    Closing Balance of Cash in Hand: {cashBalance}
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium">
                            Name
                          </th>
                          <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium">
                            Currency
                          </th>
                          <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium">
                            Count
                          </th>
                          <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {denomination.map((item, index) => (
                          <tr
                            key={`${item.businessDayId}-${index}`}
                            className="hover:bg-gray-50"
                          >
                            <td className="border border-gray-300 px-2 py-1 text-xs">
                              {item.noteValue} {currencyType}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">
                              {item.noteValue}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                min="0"
                                value={counts[index] || 0}
                                onChange={(e) =>
                                  handleCountChange(index, e.target.value)
                                }
                                className="w-full px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onWheel={(e) => e.target.blur()}
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1 text-xs font-medium">
                              {calculateTotal(
                                item.noteValue,
                                counts[index] || 0
                              )}
                            </td>
                          </tr>
                        )) || []}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-100 font-semibold">
                          <td
                            className="border border-gray-300 px-2 py-1 text-xs"
                            colSpan="3"
                          >
                            Total
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-xs font-bold">
                            {grandTotal}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="flex space-x-2 justify-center pt-2">
                  <button
                    className="px-4 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={submitting}
                    onClick={onSubmit}
                  >
                    {submitting ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DenominationButton;
