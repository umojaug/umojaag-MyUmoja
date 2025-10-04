namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class VoucherController(IHttpContextAccessor accessor, IVoucherService voucherService) : ControllerBase
{
    private readonly IVoucherService _voucherService = voucherService;
    private readonly string _userId = accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);


    [HttpGet("list/{type}")]
    public async Task<IActionResult> List(string type)
    {
        try
        {
            if (!Enum.TryParse<VoucherType>(type, true, out var voucherType))
            {
                return BadRequest("Invalid voucher type.");
            }

            var data = await _voucherService.VoucherListAsync(_userId, voucherType);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("find/{branchId}/{type}/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Find(string branchId, string type, DateTime fromDate, DateTime tillDate)
    {
        try
        {
            if (!Enum.TryParse<VoucherType>(type, true, out var voucherType))
            {
                return BadRequest("Invalid voucher type.");
            }

            var data = await _voucherService.VoucherFindAsync(branchId, voucherType, fromDate, tillDate, _userId);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("search/{value}")]
    public async Task<IActionResult> Search(string value)
    {
        try
        {
            var voucherNo = Uri.UnescapeDataString(value);

            var data = await _voucherService.VoucherSearchAsync(voucherNo, _userId);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("balance/{id}")]
    public async Task<IActionResult> Balance(string id)
    {
        try
        {
            var data = await _voucherService.VoucherBalanceAsync(id);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("create/{type}")]
    public async Task<IActionResult> Create([FromBody] List<Journal> model, string type)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        if (!Enum.TryParse<VoucherType>(type, true, out var voucherType))
        {
            return BadRequest("Invalid voucher type.");
        }

        if (model == null || model.Count == 0)
            return BadRequest($"No {voucherType} entries provided.");

        var sortList = type == "Receive" ? model.OrderByDescending(x => x.Dr) : model.OrderBy(x => x.Cr);

        var result = await _voucherService.CreateJournalAsync(sortList.ToList(), _userId, voucherType);
        return result switch
        {
            "Debit and Credit amounts must be equal." => NotFound(result),
            "Please Open Business Date." => BadRequest(result),
            "Select Correct Accounts Code." => BadRequest(result),
            "Server error" => StatusCode(500, $"Failed to process the {voucherType} entry."),
            _ => Created("", SD.Message_Save)
        };
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] Voucher model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        var allowedTypes = new HashSet<VoucherType>
        {
            VoucherType.Expense,
            VoucherType.Payment,
            VoucherType.Receive,
            VoucherType.Journal,
            VoucherType.Income
        };

        if (!Enum.TryParse<VoucherType>(model.VoucherTypeId, true, out var voucherType) || !allowedTypes.Contains(voucherType))
        {
            return BadRequest("Invalid voucher type.");
        }

        if (model == null || model.VoucherDetails.Count == 0)
            return BadRequest($"No {voucherType} entries provided.");

        var result = await _voucherService.UpdateJournalAsync(model, _userId);
        return result switch
        {
            "Debit and Credit amounts must be equal." => NotFound(result),
            "The transaction cannot be modified since the business date is closed." => BadRequest(result),
            "Select Correct Accounts Code." => BadRequest(result),
            "Server error" => StatusCode(500, $"Failed to process the {voucherType} entry."),
            _ => NoContent()
        };
    }


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest($"No voucher Id provided.");

        var result = await _voucherService.DeleteVoucherAsync(id);

        return result switch
        {
            "Not found" => NotFound(result),
            "Deletion not allowed: The business day has already been closed." => BadRequest(result),
            "Server error" => StatusCode(500, $"Delete failed for {id}"),
            _ => NoContent()
        };
    }


}