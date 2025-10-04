namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BmBankInfoController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BmVisitId", id);
            var data = await _unitOfWork.SP_Call.List<BmBankInfo>("OpsBmBankInfoGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsBmBankInfoId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BmBankInfo>("OpsBmBankInfoGetById", parameter);

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

    [Authorize]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] BmBankInfo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BmVisitId", model.BmVisitId);
            parameter.Add("@FundReceivedBranch", model.FundReceivedBranch);
            parameter.Add("@FundReceivedAmount", model.FundReceivedAmount);
            parameter.Add("@FundTransferBranch", model.FundTransferBranch);
            parameter.Add("@FundTransferAmount", model.FundTransferAmount);
            parameter.Add("@BankWithdraw", model.BankWithdraw);
            parameter.Add("@BankDeposit", model.BankDeposit);
            parameter.Add("@BankBalance", model.BankBalance);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmBankInfoCreate", parameter);

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


    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] BmBankInfo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsBmBankInfoId", model.OpsBmBankInfoId);
            parameter.Add("@BmVisitId", model.BmVisitId);
            parameter.Add("@FundReceivedBranch", model.FundReceivedBranch);
            parameter.Add("@FundReceivedAmount", model.FundReceivedAmount);
            parameter.Add("@FundTransferBranch", model.FundTransferBranch);
            parameter.Add("@FundTransferAmount", model.FundTransferAmount);
            parameter.Add("@BankWithdraw", model.BankWithdraw);
            parameter.Add("@BankDeposit", model.BankDeposit);
            parameter.Add("@BankBalance", model.BankBalance);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmBankInfoUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsBmBankInfoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmBankInfoDelete", parameter);

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
