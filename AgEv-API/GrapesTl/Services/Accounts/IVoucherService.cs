namespace GrapesTl.Service;
public interface IVoucherService
{
    Task<IEnumerable<VoucherDetailsDto>> VoucherListAsync(string userId, VoucherType voucherType);
    Task<IEnumerable<VoucherDetailsDto>> VoucherSearchAsync(string voucherNo, string userId);
    Task<IEnumerable<VoucherDetailsDto>> VoucherFindAsync(string branchId, VoucherType type, DateTime fromDate, DateTime tillDate, string userId);
    Task<double> VoucherBalanceAsync(string voucherId);
    Task<string> UpdateJournalAsync(Voucher model, string userId);
    Task<string> CreateJournalAsync(List<Journal> model, string userId, VoucherType voucherType);
    Task<string> DeleteVoucherAsync(string voucherId);
}