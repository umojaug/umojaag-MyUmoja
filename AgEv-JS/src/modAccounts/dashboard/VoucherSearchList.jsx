import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import PrintHeader from "../../components/PrintHeader";
import PdfButton from "../../components/button/PdfButton";
import VoucherTable from "../components/VoucherTable";

const VoucherSearchList = ({ voucherNumber }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("vouchersearch", `/voucher/search/${voucherNumber}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;
  // console.log(data, 'SELI');

  return (
    <div>
      {/* <div className="flex justify-end items-center">
        <PrintHeader
          fileName="voucherList.csv"
          data={data.map(
            ({
              voucherNumber,
              workDate,
              voucherType,
              transType,
              particulars,
              isReverse,
              ledgerName,
              dr,
              cr,
            }) => ({
              voucherNumber,
              date: format(new Date(workDate), "dd/MMM/yyyy"),
              voucherType,
              transType,
              particulars,
              status: isReverse ? "Reverse" : "",
              ledgerName,
              debit: dr.toLocaleString("en-US"),
              credit: cr.toLocaleString("en-US"),
            })
          )}
          headers={[
            { label: "Voucher Number", key: "voucherNumber" },
            { label: "Date", key: "date" },
            { label: "Voucher Type", key: "voucherType" },
            { label: "Trans Type", key: "transType" },
            { label: "Particulars", key: "particulars" },
            { label: "Status", key: "status" },
            { label: "Ledger Name", key: "ledgerName" },
            { label: "Debit", key: "debit" },
            { label: "Credit", key: "credit" },
          ]}
        />
      </div> */}

      <VoucherTable data={list.data} refetch={refetch} showEditButton={true} viewType="dashboard" />
    </div>
  );
};

export default VoucherSearchList;
