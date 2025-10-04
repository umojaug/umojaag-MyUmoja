namespace GrapesTl.Service;
public class VoucherService(IUnitOfWork unitOfWork, ILogger<VoucherService> logger) : IVoucherService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ILogger<VoucherService> _logger = logger;

    public async Task<IEnumerable<VoucherDetailsDto>> VoucherListAsync(string userId, VoucherType voucherType)
    {
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
        var parameter = new DynamicParameters();

        parameter.Add("@EmployeeId", user.EmployeeId);
        parameter.Add("@VoucherTypeId", voucherType);
        var data = await _unitOfWork.SP_Call.List<VoucherDetailsDto>("AcVoucherGetAllType", parameter);

        return data;
    }

    public async Task<IEnumerable<VoucherDetailsDto>> VoucherSearchAsync(string voucherNo, string userId)
    {
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
        var parameter = new DynamicParameters();
        parameter.Add("@VoucherNo", voucherNo);
        parameter.Add("@EmployeeId", user.EmployeeId);
        parameter.Add("@Role", user.Role);

        var data = await _unitOfWork.SP_Call.List<VoucherDetailsDto>("AcVoucherSearch", parameter);
        return data;
    }

    public async Task<IEnumerable<VoucherDetailsDto>> VoucherFindAsync(string branchId, VoucherType type, DateTime fromDate, DateTime tillDate, string userId)
    {
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
        var parameter = new DynamicParameters();
        parameter.Add("@branchId", branchId);
        parameter.Add("@VoucherTypeId", type);
        parameter.Add("@FromDate", fromDate);
        parameter.Add("@TillDate", tillDate);
        parameter.Add("@EmployeeId", user.EmployeeId);
        parameter.Add("@Role", user.Role);

        var data = await _unitOfWork.SP_Call.List<VoucherDetailsDto>("AcVoucherFind", parameter);
        return data;
    }

    public async Task<double> VoucherBalanceAsync(string voucherId)
    {
        var parameter = new DynamicParameters();

        parameter.Add("@LedgerId", voucherId);
        var data = await _unitOfWork.SP_Call.Single<double>("AcVoucherBalanceByLedgerId", parameter);

        return data;
    }

    public async Task<string> CreateJournalAsync(List<Journal> journals, string userId, VoucherType voucherType)
    {
        double totalDr = journals.Sum(x => x.Dr);
        double totalCr = journals.Sum(x => x.Cr);

        if (totalDr != totalCr)
            return "Debit and Credit amounts must be equal.";

        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
        var voucherId = Guid.NewGuid();

        var masterParam = new DynamicParameters();
        masterParam.Add("@VoucherId", voucherId);
        masterParam.Add("VoucherTypeId", voucherType);
        masterParam.Add("@EmployeeId", user.EmployeeId);
        masterParam.Add("@Amount", totalDr);
        masterParam.Add("@VoucherReference", $"{voucherType} Voucher");
        masterParam.Add("@Message", "", DbType.String, direction: ParameterDirection.Output);

        await _unitOfWork.SP_Call.BeginTransactionAsync();

        try
        {
            await _unitOfWork.SP_Call.Execute("AcVoucherMasterCreate", masterParam);
            string message = masterParam.Get<string>("Message");

            if (message == "Please Open Business Date.")
                throw new Exception(message);

            foreach (var journal in journals)
            {
                var detailParam = new DynamicParameters();
                detailParam.Add("@VoucherId", voucherId);
                detailParam.Add("@LedgerId", journal.LedgerId);
                detailParam.Add("@Particulars", journal.Particulars);
                detailParam.Add("@Dr", journal.Dr);
                detailParam.Add("@Cr", journal.Cr);
                detailParam.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("AcVoucherDetailItemCreate", detailParam);
                message = detailParam.Get<string>("Message");
                if (message == "Select Correct Accounts Code.")
                    throw new Exception(message);
            }

            if (voucherType == VoucherType.Transfer)
            {
                var transferParam = new DynamicParameters();
                transferParam.Add("@SenderLedgerId", journals.FirstOrDefault().LedgerId);
                transferParam.Add("@ReceiverLedgerId", journals.LastOrDefault().LedgerId);
                transferParam.Add("@Amount", totalDr);

                await _unitOfWork.SP_Call.Execute("AcVoucherTransferCreate", masterParam);
                message = masterParam.Get<string>("Message");
            }

            await _unitOfWork.SP_Call.CommitAsync();
            return "Success";
        }
        catch (Exception ex)
        {
            await _unitOfWork.SP_Call.RollbackAsync();

            _logger.LogError(ex, "CreateJournalAsync, AcVoucherDetailItemCreate failed for Id: {VoucherId}", voucherId);

            if (ex.Message == "Please Open Business Date." || ex.Message == SD.Message_InvalidLedger)
                return ex.Message;

            return "Server error";
        }
    }

    public async Task<string> UpdateJournalAsync(Voucher model, string userId)
    {
        var journals = model.VoucherDetails;

        double totalDr = journals.Sum(x => x.Dr);
        double totalCr = journals.Sum(x => x.Cr);

        if (totalDr != totalCr)
            return "Debit and Credit amounts must be equal.";

        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
        var newVoucherId = Guid.NewGuid();

        var masterParam = new DynamicParameters();
        masterParam.Add("@OldVoucherId", model.VoucherId);
        masterParam.Add("@NewVoucherId", newVoucherId);
        masterParam.Add("@EmployeeId", user.EmployeeId);
        masterParam.Add("@Amount", totalDr);
        masterParam.Add("@Message", "", DbType.String, direction: ParameterDirection.Output);

        await _unitOfWork.SP_Call.BeginTransactionAsync();
        try
        {
            await _unitOfWork.SP_Call.Execute("AcVoucherMasterUpdate", masterParam);
            string message = masterParam.Get<string>("Message");

            if (message == "The transaction cannot be modified since the business date is closed.")
                throw new Exception(message);

            foreach (var journal in journals)
            {
                var detailParam = new DynamicParameters();
                detailParam.Add("@VoucherId", newVoucherId);
                detailParam.Add("@LedgerId", journal.LedgerId);
                detailParam.Add("@Particulars", journal.Particulars);
                detailParam.Add("@Dr", journal.Dr);
                detailParam.Add("@Cr", journal.Cr);
                detailParam.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("AcVoucherDetailItemCreate", detailParam);
                message = detailParam.Get<string>("Message");
                if (message == "Select Correct Accounts Code.")
                    throw new Exception(message);
            }

            await _unitOfWork.SP_Call.CommitAsync();
            return "Success";
        }
        catch (Exception ex)
        {
            await _unitOfWork.SP_Call.RollbackAsync();

            _logger.LogError(ex, "UpdateJournalAsync, AcVoucherDetailItemUpdate failed for Id: {VoucherId}", model.VoucherId);

            if (ex.Message == "Please Open Business Date." || ex.Message == SD.Message_InvalidLedger)
                return ex.Message;

            return "Server error";
        }
    }

    public async Task<string> DeleteVoucherAsync(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@VoucherId", id);
            parameter.Add("@Message", "", DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("acVoucherDelete", parameter);
            return parameter.Get<string>("Message");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "DeleteVoucherAsync, AcVoucherDelete failed for Id: {VoucherId}", id);

            return "Server error";
        }
    }


}
