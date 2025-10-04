import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import {
  SelectFromDbWithName,
  SelectFromOptionsWithDisabled,
} from "../../components/SelectList";
import InputNumber from "../../components/InputNumber";
import Input from "../../components/Input";
import { Select2FromDbWithName } from "../../components/Select2FromDbWithName";
import { extractParts } from "../../utils/ExtractParts";
import ItemsEntryPreview from "../components/ItemsEntryPreview";
import CurrentBalance from "../components/CurrentBalance";

const schema = yup.object({
  bankOrCashId: yup.string().required("Required."),
  paymentType: yup.string().required("Required.").max(50),
  transferToId: yup.string().required("Required."),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
});

const TransferVoucherForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [items, setItems] = useState([]);
  const currencyType = import.meta.env.VITE_CURRENCY;
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { paymentType, bankOrCashId, transferToId, amount, particulars } =
    errors;

  const paymentTypeWatch = watch("paymentType");
  const bankOrCashIdWatch = watch("bankOrCashId");

  useMemo(() => {
    if (paymentTypeWatch || paymentTypeWatch === "") {
      setValue("transferToId", "");
    }
  }, [paymentTypeWatch, setValue]);

  const addItem = async () => {
    const formData = getValues();
    try {
      await schema.validate(formData);

      const { id: transferToId, name: expenseName } = extractParts(
        formData.transferToId
      );
      const { id: bankOrCashId, name: bankOrCashName } = extractParts(
        formData.bankOrCashId
      );

      const expenseExists = items.some(
        (item) => item.ledgerId === transferToId
      );
      if (expenseExists) {
        toast.error(`Expense "${expenseName}" is already added to the list!`);
        return;
      }

      const timestamp = Date.now();
      const formatedAmount = Number(formData.amount.replace(/,/g, ""));

      const debitItem = {
        id: timestamp + 1,
        ledgerId: transferToId,
        ledgerName: expenseName,
        dr: formatedAmount,
        cr: 0,
        particulars: formData.particulars,
        entryType: "Dr",
      };

      const bankOrCashExists = items.some(
        (item) => item.ledgerId === bankOrCashId
      );

      let itemsToAdd = [debitItem];

      if (!bankOrCashExists) {
        const creditItem = {
          id: timestamp + 2,
          ledgerId: bankOrCashId,
          ledgerName: bankOrCashName,
          dr: 0,
          cr: formatedAmount,
          particulars: "",
          entryType: "Cr",
        };
        itemsToAdd.push(creditItem);
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.ledgerId === bankOrCashId
              ? { ...item, cr: item.cr + formatedAmount }
              : item
          )
        );
      }

      setItems((prevItems) => [...prevItems, ...itemsToAdd]);

      setValue("amount", "");
      setValue("particulars", "");
      setInputNumber("");

      //toast.success("Items added successfully!");
    } catch (error) {
      toast.error("Please fill all required fields correctly");
    }
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
      if (!itemToRemove) return prevItems;

      const filteredItems = prevItems.filter((item) => item.id !== itemId);

      if (itemToRemove.entryType === "Dr") {
        const totalDr = filteredItems
          .filter((item) => item.entryType === "Dr")
          .reduce((sum, item) => sum + item.dr, 0);

        return filteredItems.map((item) =>
          item.entryType === "Cr" ? { ...item, cr: totalDr } : item
        );
      }

      return filteredItems;
    });

    //toast.success("Item removed successfully!");
  };

  const removeAllItem = () => {
    setItems([]);
    toast.success("All Item removed successfully!");
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
      const submitData = items
        .sort((a, b) => {
          if (a.entryType === "Dr" && b.entryType === "Cr") return -1;
          if (a.entryType === "Cr" && b.entryType === "Dr") return 1;
          return 0;
        })
        .map((item) => ({
          ledgerId: item.ledgerId,
          particulars: item.particulars,
          dr: item.dr,
          cr: item.cr,
        }));

      console.log(submitData, "submitData");

      const { status } = await mutateAsync({
        path: path,
        formData: submitData,
      });

      if (status === 201) {
        toast.success("All items saved successfully!");
        reset();
        setItems([]);
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(addItem)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <div>
              <SelectFromOptionsWithDisabled
                register={register}
                options={["Cash", "Bank"]}
                label="Payment Type"
                name="paymentType"
                errorMessage={paymentType?.message}
                isDisabled={items.length > 0 ? true : false}
              />
            </div>
            <div>
              <SelectFromDbWithName
                control={control}
                label={
                  paymentTypeWatch === "Cash" ? "Select Cash" : "Select Bank"
                }
                path={
                  paymentTypeWatch === "Cash"
                    ? "/acLedger/selectByCash"
                    : "/acLedger/SelectByBank"
                }
                name="bankOrCashId"
                errorMessage={bankOrCashId?.message}
                isDisabled={items.length > 0 ? true : false}
              />
            </div>
            <div>
              <CurrentBalance ledgerId={bankOrCashIdWatch} />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Select2FromDbWithName
                control={control}
                label="Select Transfer To"
                path={
                  paymentTypeWatch === "Cash"
                    ? "/acLedger/SelectByBank"
                    : "/acLedger/selectByCash"
                }
                name="transferToId"
                errorMessage={transferToId?.message}
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
              {items.length > 1 ? (
                ""
              ) : (
                <button type="submit" className="btn-success mt-5">
                  <IoIosAdd size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      <ItemsEntryPreview
        items={items}
        removeItem={removeItem}
        removeAllItem={removeAllItem}
        previewFor="transferVoucher"
      />

      {items.length > 0 && (
        <div className="mt-6 flex justify-center">
          <div className="form-row w-full">
            <button
              type="button"
              className="btn-umojayellow"
              disabled={submitting}
              onClick={onSubmit}
            >
              {submitting ? <span className="loader"></span> : btnText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferVoucherForm;
