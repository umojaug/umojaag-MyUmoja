import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../../hooks/dataApi";
import moment from "moment";

const SubmitButton = ({ id }) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    var data = new FormData();
    data.append("evaluationId", id);
    data.append(
      "submitDate",
      moment.utc(new Date()).local().format("YYYY-MM-DD")
    );

    try {
      const { status } = await mutateAsync({
        path: "/evaluation/submittomanager",
        formData: data,
      });
      if (status === 204) {
        toast.success("Successful Submit To Manager");
        navigate("/my/evaluation/list");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    }
  };

  return (
    <button className="btn-umojayellow" onClick={onSubmit}>
      Submit To Manager
    </button>
  );
};

export default SubmitButton;
