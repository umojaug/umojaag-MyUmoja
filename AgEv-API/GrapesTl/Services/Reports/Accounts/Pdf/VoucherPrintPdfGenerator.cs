namespace GrapesTl.Service;
public class VoucherPrintPdfGenerator(IUnitOfWork unitOfWork) : IPdfReportGenerator
{
    public string Key => "voucherPrintPdf";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<IEnumerable<VoucherDetailsDto>> GetDataAsync(ReportParams model)
    {
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == model.UserId);
        var parameter = new DynamicParameters();

        parameter.Add("@VoucherId", model.VoucherId);
        parameter.Add("@EmployeeId", user.EmployeeId);
        parameter.Add("@Role", user.Role);

        var data = await _unitOfWork.SP_Call.List<VoucherDetailsDto>("AcVoucherSearchByVoucherId", parameter);

        return data;
    }

    public async Task<byte[]> GenerateAsync(ReportParams model)
    {
        var list = (await GetDataAsync(model)).ToList();

        var sb = new StringBuilder();
        if (list == null || list.Count == 0)
        {
            sb.AppendLine(SD.EmptyReportMessage);
        }
        else
        {

            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");

            sb.AppendLine($"<table style='width: 100%; border-collapse: collapse; font-family: Helvetica; font-size:10px;'>");
            sb.AppendLine($"    <thead style='display: table-header-group;'>");
            sb.AppendLine($"        <tr>");
            sb.AppendLine($"            <th colspan='4' style='padding: 0;'>");
            sb.AppendLine($"                <table style='width: 100%;'>");
            sb.AppendLine($"                    <tr>");
            sb.AppendLine($"                        <td style='text-align: left; padding-top: 10px;'>");
            sb.AppendLine($"                            <img src='{SD.ReportImageUrl}' style='background-color: white; padding: 3px;' width='120' />");
            sb.AppendLine($"                        </td>");
            sb.AppendLine($"                        <td style='text-align: right; font-size: 25px; padding-top: 10px; padding-bottom: 10px;'></td>");
            sb.AppendLine($"                    </tr>");
            sb.AppendLine($"                </table>");
            sb.AppendLine($"            </th>");
            sb.AppendLine($"        </tr>");
            sb.AppendLine($"        <tr>");
            sb.AppendLine($"            <td colspan='4'>");
            sb.AppendLine($"                <div style='text-align: center; margin-bottom: 20px;'>");
            sb.AppendLine($"                    <div style='font-size: 24px; font-weight: bold;'>{company.CompanyName}</div>");
            sb.AppendLine($"                    <div style='font-size: 18px; margin: 5px 0;'>{company.CompanyAddress}</div>");
            sb.AppendLine($"                    <div style='font-size: 16px; font-weight: bold; margin: 15px 0;'>{list[^1].VoucherReference}</div>");
            sb.AppendLine($"                    <div style='font-size: 16px; font-weight: bold; margin: 15px 0;'>{list[^1].BranchName}</div>");
            sb.AppendLine($"                </div>");
            sb.AppendLine($"                <table style='width: 100%; margin-bottom: 20px;'>");
            sb.AppendLine($"                    <tr>");
            sb.AppendLine($"                        <td style='font-weight: bold;'>Voucher No: {list[^1].VoucherNo}</td>");
            sb.AppendLine($"                        <td></td>");
            sb.AppendLine($"                        <td></td>");
            sb.AppendLine($"                        <td style='font-weight: bold; text-align: right;'>Voucher Date: {list[^1].WorkDate.ToString("dd/MMM/yyyy")}</td>");
            sb.AppendLine($"                    </tr>");
            if (list[^1].OldVoucherNo != "")
            {
                sb.AppendLine($"                    <tr>");
                sb.AppendLine($"                        <td style='font-weight: bold;'>Old Voucher No: {list[^1].OldVoucherNo}</td>");
                sb.AppendLine($"                        <td></td>");
                sb.AppendLine($"                        <td></td>");
                sb.AppendLine($"                        <td style='font-weight: bold; text-align: right;'></td>");
                sb.AppendLine($"                    </tr>");
            }
            sb.AppendLine($"                </table>");
            sb.AppendLine($"            </td>");
            sb.AppendLine($"        </tr>");
            // Header Row for Account Details
            sb.AppendLine($"        <tr>");
            sb.AppendLine($"            <th style='font-size: 16px; font-weight: bold; border: 1px solid #000; text-align: center; padding: 8px; background-color: #f0f0f0;'>Account Code</th>");
            sb.AppendLine($"            <th style='font-size: 16px; font-weight: bold; border: 1px solid #000; text-align: center; padding: 8px; background-color: #f0f0f0;'>Account Name</th>");
            sb.AppendLine($"            <th style='font-size: 16px; font-weight: bold; border: 1px solid #000; text-align: center; padding: 8px; background-color: #f0f0f0;'>Dr Amount (UGX)</th>");
            sb.AppendLine($"            <th style='font-size: 16px; font-weight: bold; border: 1px solid #000; text-align: center; padding: 8px; background-color: #f0f0f0;'>Cr Amount (UGX)</th>");
            sb.AppendLine($"        </tr>");
            // End of Header Row for Account Details
            sb.AppendLine($"    </thead>");
            sb.AppendLine($"    <tbody>");
            // Loop through each item in the list to create rows
            foreach (var item in list)
            {
                sb.AppendLine($"        <tr style='page-break-inside: avoid;'>");
                sb.AppendLine($"            <td style='font-size: 16px; border: 1px solid #000; text-align: center; padding: 8px;'>{item.LedgerCode}</td>");
                sb.AppendLine($"            <td style='font-size: 16px; border: 1px solid #000; text-align: left; padding: 8px;'>{item.LedgerName}</td>");
                sb.AppendLine($"            <td style='font-size: 16px; border: 1px solid #000; text-align: right; padding: 8px;'>{item.Dr}</td>");
                sb.AppendLine($"            <td style='font-size: 16px; border: 1px solid #000; text-align: right; padding: 8px;'>{item.Cr}</td>");
                sb.AppendLine($"        </tr>");
            }
            // Summary Row
            sb.AppendLine($"        <tr style='font-size: 16px;'>");
            sb.AppendLine($"            <td colspan='4' style='padding: 8px;'><strong>In Words:</strong> {NumberToWordsConverter.ConvertAmountToWords(list.Sum(item => item.Dr))} Only</td>");
            sb.AppendLine($"        </tr>");
            sb.AppendLine($"        <tr><td colspan='4' style='height: 15px;'></td></tr>");
            sb.AppendLine($"        <tr>");
            sb.AppendLine($"            <td colspan='4' style='padding: 20px;'>");
            // Footer with Signature Lines
            sb.AppendLine($"                <table style='width: 100%; font-size: 14px;'>");
            sb.AppendLine($"                    <tr>");
            sb.AppendLine($"                        <td style='text-align: center; width: 33%;'>");
            sb.AppendLine($"                            <div style='text-align: left; height: 30px; margin-bottom: 5px;'><strong>{list[^1].EntryBy}</strong><br>{list[^1].EntryDate.ToString("dd/MMM/yyyy")}</div>");
            sb.AppendLine($"                            <div style='text-align: left; border-top: 1px solid #000; height: 30px; margin-bottom: 5px;'><strong>Prepared by</strong></div>");
            sb.AppendLine($"                        </td>");
            sb.AppendLine($"                        <td style='text-align: center; width: 33%;'>");
            sb.AppendLine($"                            <div style='text-align: left; height: 30px; margin-bottom: 5px;'></div>");
            sb.AppendLine($"                            <div style='text-align: left; border-top: 1px solid #000; height: 30px; margin-bottom: 5px;'><strong>Checked by</strong></div>");
            sb.AppendLine($"                        </td>");
            sb.AppendLine($"                        <td style='text-align: center; width: 33%;'>");
            sb.AppendLine($"                            <div style='text-align: left; height: 30px; margin-bottom: 5px;'></div>");
            sb.AppendLine($"                            <div style='text-align: left; border-top: 1px solid #000; height: 30px; margin-bottom: 5px;'><strong>Approved by</strong></div>");
            sb.AppendLine($"                        </td>");
            sb.AppendLine($"                    </tr>");
            sb.AppendLine($"                </table>");
            // End of Footer with Signature Lines
            sb.AppendLine($"            </td>");
            sb.AppendLine($"        </tr>");
            sb.AppendLine($"    </tbody>");
            sb.AppendLine($"</table>");
        }

        var htmlToPdf = new HtmlToPdfConverter
        {
            PageHeaderHtml = "<div style='padding-top: 30px'></div>",
            PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font - family: Helvetica; font - size:10px;'>Page: <span class='page'></span></div>",
            Size = PageSize.A4,
            Orientation = PageOrientation.Portrait
        };

        var pdfBytes = htmlToPdf.GeneratePdf(sb.ToString());

        return pdfBytes;
    }
}