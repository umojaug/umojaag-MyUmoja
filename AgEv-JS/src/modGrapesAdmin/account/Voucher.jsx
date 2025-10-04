import VoucherDelete from "./VoucherDelete";

const Voucher = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      {/* <TopHeader title="Settings" /> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <VoucherDelete />
      </div>
    </div>
  );
};

export default Voucher;
