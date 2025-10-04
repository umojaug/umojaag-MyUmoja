namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RecruitmentRequestsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<RecruitmentRequestView>("UrRecruitmentRequestsGetAll");
            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving list of data." + e.Message);
        }
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RecruitmentId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<RecruitmentRequest>("UrRecruitmentRequestsGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving details data." + e.Message);
        }
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] RecruitmentRequest model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@JobTitle", model.JobTitle);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@StartDate", model.StartDate);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@EntryBy", user.FullName);
            //parameter.Add("@IsRequestedByManager", model.IsRequestedByManager);
            //parameter.Add("@RecruitmentStatus", model.RecruitmentStatus);
            //parameter.Add("@ApprovedBy", model.ApprovedBy);
            //parameter.Add("@Comments", model.Comments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrRecruitmentRequestsCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] RecruitmentRequest model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@RecruitmentId", model.RecruitmentId);
            parameter.Add("@JobTitle", model.JobTitle);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@StartDate", model.StartDate);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@EntryBy", user.FullName);
            //parameter.Add("@IsRequestedByManager", model.IsRequestedByManager);
            //parameter.Add("@RecruitmentStatus", model.RecruitmentStatus);
            //parameter.Add("@ApprovedBy", model.ApprovedBy);
            //parameter.Add("@ApprovalDate", model.ApprovalDate);
            //parameter.Add("@Comments", model.Comments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrRecruitmentRequestsUpdate", parameter);
            
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
            parameter.Add("@RecruitmentId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrRecruitmentRequestsDelete", parameter);

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

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<RecruitmentRequest>("UrRecruitmentRequestsGetAll");
            return Ok(data.Select(a => new { 
                listId = a.RecruitmentId, 
                listName = a.JobTitle 
            }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving list of data." + e.Message);
        }
    }
}