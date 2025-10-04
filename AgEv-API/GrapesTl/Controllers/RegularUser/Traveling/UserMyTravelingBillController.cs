namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserMyTravelingBillController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<MyAdvanceSalaryController> logger, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<MyAdvanceSalaryController> _logger = logger;
    private string _userId;
    private readonly IFileUploadService _fileUploadService = fileUploadService;



    //[Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("ListByUser/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListByUser([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<TravelingBillView>("HrTravelingBillGetByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] TravelingBillView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);

            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);



            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@TravelingDate", model.TravelingDate);
            parameter.Add("@ManagerId", model.ManagerId);
            //parameter.Add("@AllVisitId", model.AllVisitId);
            //parameter.Add("@CheckedBy", model.CheckedBy);
            parameter.Add("@Title", model.Title);
            parameter.Add("@FileUrl", fileUrl);
            parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("HrTravelCreate", parameter);

            var message = parameter.Get<string>("Message");



            if (message == "Not found")
                return NotFound(message);

            if (message == "Select correct person for approval")
                return NotFound(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {


                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        "",
                        "Travel bill by " + user.FullName,
                        $"{user.FullName} apply for Advance Salary. Needed The salary of date {model.TravelingDate:dd/MMM/yyyy} ");

                    //await _emailSender.SendEmailAsync(
                    //    message,
                    //    "Leave Application by " + user.FullName,
                    //    $"{user.FullName} apply for Advance Salay. Needed The salary of date {model.TravelingDate:dd/MMM/yyyy} ");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }




    //[HttpPost("Create")]
    //public async Task<IActionResult> Create([FromForm] TravelingBillView model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    //        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);



    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ManagerId", model.ManagerId);

    //        parameter.Add("@EmployeeId", user.EmployeeId);
    //        parameter.Add("@Remarks", model.Remarks);
    //        parameter.Add("@TravelingDate", model.TravelingDate);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

    //        await _unitOfWork.SP_Call.Execute("HrTravelCreate", parameter);

    //        var message = parameter.Get<string>("Message");



    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Select correct person for approval")
    //            return NotFound(message);

    //        if (string.IsNullOrWhiteSpace(message) == false)
    //        {
    //            try
    //            {
    //                await _emailSender.SendEmailAsync(
    //                    message,
    //                    "Leave Application by " + user.FullName,
    //                    $"{user.FullName} apply for Advance Salay. Needed The salary of date {model.TravelingDate:dd/MMM/yyyy} ");
    //            }
    //            catch (Exception ex)
    //            {
    //                _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
    //            }
    //        }

    //        return Created("", message);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error saving data." + e.Message);
    //    }
    //}




    //[Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelDelete", parameter);

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


    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", id);
            //parameter.Add("@EmployeeId", user.EmployeeId);


            var data = await _unitOfWork.SP_Call.OneRecord<TravelingBillView>("HrTravelGetById", parameter);

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
    public async Task<IActionResult> Update([FromForm] TravelingBillView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);





            var parameter = new DynamicParameters();

            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@Remarks", model.Remarks);
            parameter.Add("@TravelingDate", model.TravelingDate);





            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelUpdate", parameter);
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


    [HttpPost("Submit")]
    public async Task<IActionResult> Submit([FromForm] TravelingBillView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@SubmitRemarks", model.SubmitRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelSubmit", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }



    [HttpPost("Accept")]
    public async Task<IActionResult> Accept([FromForm] TravelingBillView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@AcceptRemarks", model.AcceptRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelAccept", parameter);
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



    [HttpPost("Reject")]
    public async Task<IActionResult> Reject([FromForm] TravelingBillView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@RejectRemarks", model.RejectRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelReject", parameter);
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


    [HttpGet("ReceivedTravelBillList")]
    public async Task<IActionResult> ReceivedTravelBillList()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);


            var data = await _unitOfWork.SP_Call.List<TravelingBillView>("HrTravelBillReceivedGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




}
