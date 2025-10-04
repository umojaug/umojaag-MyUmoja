import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input";
import { DataListFromDb } from "../../../components/SelectList";
import InputNumber from "../../../components/InputNumber";
import RadioButtonJournal from "../../../components/RadioButtonJournal";

const schema = yup.object({
  trType: yup.string().required("Required"),
  ledgerNameCode: yup.string().required("Required"),
  amount: yup
    .number()
    .min(0.1, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
});

const JournalVoucherForm = ({ addToCart }) => {
  const [inputNumber, setInputNumber] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trType: "",
      ledgerNameCode: "",
      particulars: "",
      amount: "",
    },
    resolver: yupResolver(schema),
  });
  const { trType, ledgerNameCode, amount, particulars } = errors;

  const onSubmit = (formData) => {
    const currentProduct = {
      trType: formData.trType,
      ledgerNameCode: formData.ledgerNameCode,
      particulars: formData.particulars,
      dr: formData.trType === "Dr" ? formData.amount : 0,
      cr: formData.trType === "Cr" ? formData.amount : 0,
    };
    addToCart(currentProduct);
    reset();
    setInputNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col-4 py-2">
          <DataListFromDb
            register={register}
            name="ledgerNameCode"
            label="Select Ledger"
            path="/acLedger/selectByJournal"
            errorMessage={ledgerNameCode?.message}
          />
          <Input
            name="particulars"
            label="Particulars"
            type="text"
            register={register}
            errorMessage={particulars?.message}
            inputNumber={inputNumber}
            setInputNumber={setInputNumber}
          />
          <div className="grid grid-cols-2">
            <InputNumber
              name="amount"
              label="Amount"
              type="text"
              register={register}
              errorMessage={amount?.message}
              inputNumber={inputNumber}
              setInputNumber={setInputNumber}
            />
            <RadioButtonJournal
              register={register}
              options={["Dr", "Cr"]}
              label="Select"
              name="trType"
              errorMessage={trType?.message}
            />
          </div>
          <div className="my-auto md:pt-5">
            <button
              className="w-28 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JournalVoucherForm;
