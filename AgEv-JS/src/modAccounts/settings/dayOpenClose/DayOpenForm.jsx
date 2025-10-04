import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";

import // DataListFromDb,
//   SelectFromOptions,
"../../../components/SelectList";

const schema = yup.object({
  status: yup.string().required("Required").max(50),
});

function DayOpenForm({ action }) {
  const { mutateAsync } = usePostData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const defaultValues = {
    status: "Day Open",
  };
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  // const { status } = errors;

  // const [click, setClick] = useState('');


  const onSubmit = async (formData, event) => {
    // setSubmitting(true);

    // setClick(formData.status);


    event.preventDefault();
    setIsSubmitted(true);
    var data = new FormData();

    data.append("status", formData.status);

    try {
      const { status } = await mutateAsync({
        path: "acDay/dayOpenCreate",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        // navigate(`/inv/sale/orderDetails/${data}`);
        action();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
      }
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 my-3 p-2 rounded-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="grid content-center mt-6">
          <button
            type="submit"
            className="btn-success w-1/3"
            disabled={isSubmitted}
          >
            Day Open
          </button>
        </div>
      </div>
    </form>
  );
}

export default DayOpenForm;
