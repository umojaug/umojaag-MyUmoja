import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
// import InputNumber from "../../components/InputNumber";
import SaveButton from "../../components/button/SaveButton";
import { DataListFromDb } from "../../components/SelectList";
import Balance from "../../components/Balance";
import useDebounce from "../../hooks/useDebounce";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  withdraw: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().required("Required").max(4000),
});

function SaccoForm({ defaultValues, action, btnText, path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const actualQuery = watch("pinName", "");
  const finalQuery = useDebounce(actualQuery, 1000);

  const { pinName, withdraw, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("withdraw", formData.withdraw);
    data.append("particulars", formData.particulars);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
        {finalQuery.length > 9 && (
          <Balance
            keyName="AcSaccosBalance"
            path={`/acsaccos/Balance/${finalQuery}`}
          />
        )}
        {/* <InputNumber
          control={control}
          name="withdraw"
          label="Withdraw"
          errorMessage={withdraw?.message}
        /> */}
        <Input
          name="withdraw"
          label="Withdraw"
          type="text"
          register={register}
          errorMessage={withdraw?.message}
        />
        <Input
          name="particulars"
          label="Particulars"
          type="text"
          register={register}
          errorMessage={particulars?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default SaccoForm;
