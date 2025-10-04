namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditYearController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;



    //[Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    //[HttpGet("List/{id}")]
    //public async Task<IActionResult> List(string id)
    //{
    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

    //        var parameter = new DynamicParameters();
    //        parameter.Add("@AuditId", id);

    //        var data = await _unitOfWork.SP_Call.List<AuditObservations>("AuditObservationsGetByAuditId", parameter);

    //        if (data == null)
    //            return NotFound(SD.Message_NotFound);

    //        return Ok(data);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve details data." + e.Message);
    //    }
    //}

    //[Authorize]
    //[HttpGet("Details/{id}")]
    //public async Task<IActionResult> Details(string id)
    //{
    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ObservationsId", id);

    //        var data = await _unitOfWork.SP_Call.OneRecord<AuditObservations>("AuditObservationsGetById", parameter);

    //        if (data == null)
    //            return NotFound(SD.Message_NotFound);

    //        return Ok(data);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve details data." + e.Message);
    //    }
    //}


    [HttpGet("CurrentAuditYear")]
    public async Task<IActionResult> CurrentAuditYear()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var data = await _unitOfWork.SP_Call.OneRecord<AuditYearOpenClose>("AuditCurrentOpenYear");

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


    [HttpPost("YearOpen")]
    public async Task<IActionResult> DayOpenCreate([FromForm] AuditYearOpenClose model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@CreatedBy", user.EmployeeId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditYearOpen", parameter);

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

}
