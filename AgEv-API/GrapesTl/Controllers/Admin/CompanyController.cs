namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,IT Manager,IT Executive")]
[Route("api/[controller]")]
[ApiController]

public class CompanyController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Company>("adCompanyGetAll");
            return Ok(data.Select(a => new { listId = a.CompanyId, listName = a.CompanyName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Details")]
    public async Task<IActionResult> Details()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");

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

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] Company model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@CompanyId", model.CompanyId);
            parameter.Add("@CompanyName", model.CompanyName);
            parameter.Add("@CompanyAddress", model.CompanyAddress);
            parameter.Add("@NssfEmployee", model.NssfEmployee);
            parameter.Add("@NssfEmployer", model.NssfEmployer);
            parameter.Add("@GoogleDriveKey", model.GoogleDriveKey);
            parameter.Add("@Country", model.Country);
            parameter.Add("@NidDigit", model.NidDigit);
            parameter.Add("@VoterIdDigit", model.VoterIdDigit);
            parameter.Add("@ContactDigit", model.ContactDigit);
            parameter.Add("@VoterIdRequired", model.VoterIdRequired);
            parameter.Add("@MyUmojaUrl", model.MyUmojaUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adCompanyUpdate", parameter);
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
}
