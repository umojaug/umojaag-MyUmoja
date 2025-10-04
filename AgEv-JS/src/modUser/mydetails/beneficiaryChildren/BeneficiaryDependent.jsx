import { FaChild } from "react-icons/fa";
import { useNavigate } from "react-router";

const BeneficiaryDependent = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn-umojablue w-10 h-10"
        onClick={() => navigate("/my/details/beneficiary/primary/child")}
      >
        <FaChild size={24} />
      </button>
    </>
  );
};

export default BeneficiaryDependent;
