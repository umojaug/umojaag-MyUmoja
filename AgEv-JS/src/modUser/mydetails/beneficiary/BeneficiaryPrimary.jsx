import { FaClover } from "react-icons/fa6";
import { useNavigate } from "react-router";

const BeneficiaryPrimary = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn-danger w-10 h-10"
        onClick={() => navigate("/my/details/beneficiary/primary")}
      >
        <FaClover size={24} />
      </button>
    </>
  );
};

export default BeneficiaryPrimary;
