import { useState } from "react";
import VoucherFind from "./VoucherFind";
import SearchByBranchVoucherTypeDate from "../../components/SearchByBranchVoucherTypeDate";
import TopHeader from "../../components/TopHeader";

const VoucherSearch = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Voucher List" />
      <SearchByBranchVoucherTypeDate action={setDataForm} />
      {dataForm && <VoucherFind dataForm={dataForm} />}
    </div>
  );
};

export default VoucherSearch;
