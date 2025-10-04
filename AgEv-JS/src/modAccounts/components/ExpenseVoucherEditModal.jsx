import {
  Dialog,
  DialogBackdrop,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import InputNumber from "../../components/InputNumber";
import Input from "../../components/Input";
import { Select2FromDbWithName } from "../../components/Select2FromDbWithName";
import { extractParts } from "../../utils/ExtractParts";
import ItemsEntryPreviewEditable from "./ItemsEntryPreviewEditable";

const schema = yup.object({
  expenseId: yup.string().required("Required."),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
});

const ExpenseVoucherEditModal = ({
  path,
  action,
  editData = [],
  voucherId,
  btnText = "Update",
}) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const currencyType = import.meta.env.VITE_CURRENCY;

  const transformEditData = (data) => {
    return data.map((item, index) => ({
      id: Date.now() + index,
      ledgerId: item.ledgerId,
      transId: item.transId,
      ledgerName: item.accountName,
      dr: item.dr,
      cr: item.cr,
      particulars: item.particulars,
      entryType: item.dr > 0 ? "Dr" : "Cr",
    }));
  };

  const [items, setItems] = useState(() => transformEditData(editData));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { expenseId, amount, particulars } = errors;

  const addItem = async () => {
    const formData = getValues();
    try {
      await schema.validate(formData);

      const { id: expenseId, name: expenseName } = extractParts(
        formData.expenseId
      );
      const expenseExists = items.some((item) => {
        return item.ledgerId === expenseId;
      });

      if (expenseExists) {
        toast.error(`Expense "${expenseName}" is already added to the list!`);
        return;
      }

      const timestamp = Date.now();
      const formatedAmount = Number(formData.amount.replace(/,/g, ""));

      const debitItem = {
        id: timestamp + 1,
        ledgerId: expenseId,
        ledgerName: expenseName,
        dr: formatedAmount,
        cr: 0,
        particulars: formData.particulars,
        entryType: "Dr",
      };

      setItems((prevItems) => {
        const newItems = [...prevItems, debitItem];

        const totalDr = newItems
          .filter((item) => item.entryType === "Dr")
          .reduce((sum, item) => sum + item.dr, 0);

        return newItems.map((item) =>
          item.entryType === "Cr" ? { ...item, cr: totalDr } : item
        );
      });

      setValue("amount", "");
      setValue("particulars", "");
      setInputNumber("");
    } catch (error) {
      toast.error("Please fill all required fields correctly");
    }
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
      if (!itemToRemove) return prevItems;

      if (itemToRemove.entryType === "Cr") {
        toast.error("Cannot remove Bank/Cash entry!");
        return prevItems;
      }

      const filteredItems = prevItems.filter((item) => item.id !== itemId);

      const totalDr = filteredItems
        .filter((item) => item.entryType === "Dr")
        .reduce((sum, item) => sum + item.dr, 0);

      return filteredItems.map((item) =>
        item.entryType === "Cr" ? { ...item, cr: totalDr } : item
      );
    });
  };

  const onSubmit = async () => {
    if (items.length === 0) {
      toast.error("Please add at least one item before saving");
      return;
    }

    const totalDr = items.reduce((sum, item) => sum + item.dr, 0);
    const totalCr = items.reduce((sum, item) => sum + item.cr, 0);

    if (totalDr === 0 && totalCr === 0) {
      toast.error(
        "Total amounts cannot be zero. Please enter valid debit and credit amounts!"
      );
      return;
    }

    if (totalDr !== totalCr) {
      toast.error("Total Debit amount must equal Total Credit amount!");
      return;
    }

    setSubmitting(true);

    try {
      let negativeCounter = 0;
      const submitData = {
        voucherId: voucherId,
        voucherTypeId: "Expense",
        voucherDetails: items
          .sort((a, b) => {
            if (a.entryType === "Dr" && b.entryType === "Cr") return -1;
            if (a.entryType === "Cr" && b.entryType === "Dr") return 1;
            return 0;
          })
          .map((item) => ({
            transId: item.transId || -++negativeCounter,
            ledgerId: item.ledgerId,
            particulars: item.particulars,
            dr: item.dr,
            cr: item.cr,
          })),
      };
      console.log(submitData, "SD");

      const { status } = await mutateAsync({
        path: path,
        formData: submitData,
      });

      if (status === 201) {
        toast.success("All items updated successfully!");
        reset();
        setInputNumber("");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      closeModal();
      action();
      setSubmitting(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
    reset();
    setInputNumber("");
    setItems(() => transformEditData(editData));
  }

  function openModal() {
    setIsOpen(true);
    setItems(() => transformEditData(editData));
  }

  return (
    <>
      <button
        className="btn-sky w-12 h-10"
        onClick={openModal}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Edit Voucher"
      >
        <MdEdit size={20} />
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => {}}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 w-screen overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="w-full max-w-4xl space-y-4 border bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto">
                <h3 className="mb-5 text-xl text-gray-800 font-medium">
                  Edit Expense Voucher
                </h3>

                <div>
                  <form onSubmit={handleSubmit(addItem)}>
                    <div className="grid grid-cols-1 gap-6 mb-4">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <Select2FromDbWithName
                            control={control}
                            label="Select Expense"
                            path="/acLedger/selectByExpense"
                            name="expenseId"
                            errorMessage={expenseId?.message}
                          />
                        </div>
                        <div>
                          <InputNumber
                            name="amount"
                            label={`Amount(${currencyType})`}
                            type="text"
                            register={register}
                            errorMessage={amount?.message}
                            inputNumber={inputNumber}
                            setInputNumber={setInputNumber}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Input
                            name="particulars"
                            label="Description"
                            type="text"
                            register={register}
                            errorMessage={particulars?.message}
                          />
                          <button type="submit" className="btn-success mt-5">
                            <IoIosAdd size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <ItemsEntryPreviewEditable
                    items={items}
                    setItems={setItems}
                    removeItem={removeItem}
                    previewFor="expenseVoucher"
                  />

                  <div className="flex space-x-2 mt-6 justify-center">
                    <button
                      type="button"
                      className="btn-danger px-6"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {items.length > 0 && (
                      <button
                        type="button"
                        className="btn-umojayellow px-6"
                        disabled={submitting}
                        onClick={onSubmit}
                      >
                        {submitting ? (
                          <span className="loader"></span>
                        ) : (
                          btnText
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ExpenseVoucherEditModal;
