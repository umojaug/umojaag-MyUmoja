import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFromDbAutoFill } from "./SelectFromDBAutoFill";
import DatePicker from "./DatePicker";
import moment from "moment";
import SearchButton from "./button/SearchButton";
import { SelectFromOptions } from "./SelectList";

const schema = yup.object({
  branchId: yup.string().required("Required."),
  voucherType: yup.string().required("Required."),
  fromDate: yup.date().required("Required."),
  tillDate: yup.date().required("Required."),
});

const SearchByBranchVoucherTypeDate = ({ action, day = 1 }) => {
  var date = new Date();
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    defaultValues: {
      branchId: "",
      voucherType: "",
      fromDate: new Date(date.getFullYear(), date.getMonth(), day),
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const { branchId, voucherType, fromDate, tillDate } = errors;

  const onSubmit = async (formData) => {
    const searchParams = {
      branchId: formData.branchId,
      voucherType: formData.voucherType,
      fromDate: moment.utc(formData.fromDate).local().format("DD-MMM-YYYY"),
      tillDate: moment.utc(formData.tillDate).local().format("DD-MMM-YYYY"),
    };
    action(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-end gap-4 w-full"
    >
      <div className="flex-1">
        <SelectFromDbAutoFill
          control={control}
          setValue={setValue}
          label="Select Branch"
          path="/branches/SelectByRole"
          name="branchId"
          errorMessage={branchId?.message}
        />
      </div>

      <div className="flex-1">
        <SelectFromOptions
          register={register}
          options={["Contra",
            "Payment",
            "Journal",
            "Receive",
            "Adjustment",
            "Reverse",
            "Expense",
            "Transfer",
            "Fund"]}
          label="Voucher Type"
          name="voucherType"
          errorMessage={voucherType?.message}
        />
      </div>

      <div className="flex-1">
        <Controller
          control={control}
          name="fromDate"
          render={({ field }) => (
            <DatePicker
              label="From Date"
              field={field}
              errorMessage={fromDate?.message}
              isRow={false}
            />
          )}
        />
      </div>
      <div className="flex-1">
        <Controller
          control={control}
          name="tillDate"
          render={({ field }) => (
            <DatePicker
              label="Till Date"
              field={field}
              errorMessage={tillDate?.message}
              isRow={false}
            />
          )}
        />
      </div>

      <div className="flex gap-2">
        <SearchButton />
      </div>
    </form>
  );
};

export default SearchByBranchVoucherTypeDate;
