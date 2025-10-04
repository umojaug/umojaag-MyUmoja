import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import InputNumber from "../../components/InputNumber";
import Input from "../../components/Input";
import { Select2FromDbWithName } from "../../components/Select2FromDbWithName";
import { extractParts } from "../../utils/ExtractParts";
import ItemsEntryPreview from "../components/ItemsEntryPreview";
import RadioButtonJournal from "../../components/RadioButtonJournal";

const schema = yup.object({
  journalId: yup.string().required("Required."),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
  drTrType: yup.string().required("Required."),
});

const JournalVoucherForm = ({ defaultValues, action, btnText, path }) => {
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
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { journalId, amount, drTrType, particulars } = errors;

  const addItem = async () => {
    const formData = getValues();
    try {
      await schema.validate(formData);

      const { id: journalId, name: journalName } = extractParts(
        formData.journalId
      );

      const journalExists = items.some((item) => item.ledgerId === journalId);
      if (journalExists) {
        toast.error(`Journal "${journalName}" is already added to the list!`);
        return;
      }

      const timestamp = Date.now();
      const formatedAmount = Number(formData.amount.replace(/,/g, ""));

      const newItem = {
        id: timestamp,
        ledgerId: journalId,
        ledgerName: journalName,
        dr: formData.drTrType === "Dr" ? formatedAmount : 0,
        cr: formData.drTrType === "Cr" ? formatedAmount : 0,
        particulars: formData.particulars,
        entryType: formData.drTrType,
      };

      setItems((prevItems) => [...prevItems, newItem]);

      setValue("amount", "");
      setValue("particulars", "");
      setInputNumber("");

      //toast.success("Item added successfully!");
    } catch (error) {
      toast.error("Please fill all required fields correctly");
    }
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    toast.success("Item removed successfully!");
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

    const hasDr = items.some((item) => item.dr > 0);
    const hasCr = items.some((item) => item.cr > 0);

    if (!hasDr || !hasCr) {
      toast.error("You must have at least one Debit and one Credit entry!");
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-2 gap-y-2 mb-4">
          <div className="col-span-2">
            <Select2FromDbWithName
              control={control}
              label="Account Name"
              path="/acLedger/selectByJournal"
              name="journalId"
              errorMessage={journalId?.message}
            />
          </div>
          <Input
            name="particulars"
            label="Description"
            type="text"
            register={register}
            errorMessage={particulars?.message}
          />
          <InputNumber
            name="amount"
            label={`Amount(${currencyType})`}
            type="text"
            register={register}
            errorMessage={amount?.message}
            inputNumber={inputNumber}
            setInputNumber={setInputNumber}
          />

          <div className="flex gap-2">
            <div className="w-[250px]">
              <RadioButtonJournal
                register={register}
                options={["Dr", "Cr"]}
                label="Select"
                name="drTrType"
                errorMessage={drTrType?.message}
              />
            </div>
            <button type="submit" className="btn-success mt-5">
              <IoIosAdd size={24} />
            </button>
          </div>
        </div>
      </form>

      <ItemsEntryPreview
        items={items}
        removeItem={removeItem}
        removeAllItem={removeAllItem}
        previewFor="journalVoucher"
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

export default JournalVoucherForm;
