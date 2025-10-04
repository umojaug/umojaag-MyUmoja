namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FundTransferController(IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private readonly string _userId = accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<FundTransferDto>("AcFundTransferGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("branchSelect")]
    public async Task<IActionResult> BranchSelect()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Branch>("AcFundTransferGetAll");
            return Ok(data.Select(a => new { listId = a.BranchId, listName = a.BranchName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("bankSelect/{id}")]
    public async Task<IActionResult> BankSelect(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchId", id);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcFundTransferSelectByBank", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("receiveList")]
    public async Task<IActionResult> ReceiveList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<FundTransferDto>("AcFundTransferGetAllReceive");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("exportToExcel")]
    public async Task<IActionResult> ExportToExcel()
    {
        try
        {
            var ledgerData = (await _unitOfWork.SP_Call.List<FundTransferDto>("AcFundTransferGetAllReceive")).ToList();

            if (ledgerData == null || !ledgerData.Any())
            {
                return NotFound("No data found to export.");
            }

            // Specify the columns -- optional for  too many column from stored procedure
            var columnsToInclude = new Dictionary<string, string>
                {
                    {"TransactionNo", "Transaction No"},
                    {"TransferDate", "Transaction Date"},
                    {"FromBranch", "From Branch"},
                    {"ToBranch", "To Branch"},
                    {"Amount", "Amount"},
                    {"Status", "Status"},
                };


            var filteredLedgerData = ledgerData.Select(item => new
            {
                item.TransactionNo,
                item.TransferDate,
                item.FromBranch,
                item.ToBranch,
                item.Amount,
                item.Status,
            }).ToList();

            DataTable dataTable = filteredLedgerData.ToDataTable(columnsToInclude.Keys.ToList());
            foreach (var pair in columnsToInclude)
            {
                if (dataTable.Columns.Contains(pair.Key))
                {
                    dataTable.Columns[pair.Key].ColumnName = pair.Value;
                }
            }


            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("LedgerData");

                //Header
                worksheet.Cell("A1").Value = "UMOJA INTERNATIONAL";
                worksheet.Cell("A2").Value = "Transfer Received List Report";
                //date
                string lastColumnLetter = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
                worksheet.Range($"A1:{lastColumnLetter}1").Merge();
                worksheet.Range($"A2:{lastColumnLetter}2").Merge();
                worksheet.Cell("A1").Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                worksheet.Row(3).InsertRowsBelow(1);

                //Body
                var range = worksheet.Cell("A5").InsertTable(dataTable.AsEnumerable());
                worksheet.Columns().AdjustToContents();
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error generating Excel file: " + e.Message);
        }
    }


    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@GroupId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<FundTransfer>("AcFundTransferGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] FundTransfer model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankId", model.BankId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcFundTransferCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [HttpPost("received/{id}")]
    public async Task<IActionResult> Received([FromForm] FundTransferDto model, string id)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);



            var parameter = new DynamicParameters();
            parameter.Add("@FundTransferId", id);
            parameter.Add("@ReceiveLedger", model.BankId);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcfundTransferReceive", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@GroupId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcFundTransferDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot delete")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }


}
