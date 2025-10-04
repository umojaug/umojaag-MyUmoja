using DocumentFormat.OpenXml.Spreadsheet;
using GrapesTl.Models;
using GrapesTl.Utility;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BranchVisitDetailsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private readonly IFileUploadService _fileUploadService = fileUploadService;

    private string _userId;

    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitId", id);

            var data = await _unitOfWork.SP_Call.List<BranchVisitDetailsView>("HrBranchVisitDetailsGetAll",parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("own")]
    public async Task<IActionResult> Own()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BranchVisitDetailsView>("HrBranchVisitDetailsGetAllOwn", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    //[HttpGet("Select")]
    //public async Task<IActionResult> Select()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitDetailsGetAll");
    //        return Ok(data.Select(a => new { listId = a.DepartmentId, listName = a.DepartmentName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BranchVisitDetails>("HrBranchVisitDetailsGetById", parameter);


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

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] BranchVisitDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            //parameter.Add("@BranchVisitDetailsId", model.BranchVisitDetailsId);
            parameter.Add("@BranchVisitId", model.BranchVisitId);
            parameter.Add("@TopicAssessed", model.TopicAssessed);
            parameter.Add("@Findings", model.Findings);
            parameter.Add("@RatingGiven", model.RatingGiven);
            parameter.Add("@ActionToBeTaken", model.ActionToBeTaken);
            parameter.Add("@OwnerAssigned", model.OwnerAssigned);
            parameter.Add("@ActionCompletionDate", model.ActionCompletionDate);
            parameter.Add("@Attachment", fileUrl);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitDetailsCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] BranchVisitDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitDetailsId", model.BranchVisitDetailsId);
            parameter.Add("@BranchVisitId", model.BranchVisitId);
            parameter.Add("@TopicAssessed", model.TopicAssessed);
            parameter.Add("@Findings", model.Findings);
            parameter.Add("@RatingGiven", model.RatingGiven);
            parameter.Add("@ActionToBeTaken", model.ActionToBeTaken);
            parameter.Add("@OwnerAssigned", model.OwnerAssigned);
            parameter.Add("@ActionCompletionDate", model.ActionCompletionDate);
            parameter.Add("@Attachment", fileUrl);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitDetailsUpdate", parameter);
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

    [HttpGet("ownList")]
    public async Task<IActionResult> OwnList()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BranchVisitDetailsView>("HrBranchVisitDetailsGetAllOwn", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("Feedback")]
    public async Task<IActionResult> Feedback([FromForm] BranchVisitDetailsFeedback model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            //var fileUrl = "";
            //if (model.File is not null && model.File.Length > 0)
            //    fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitDetailsId", model.BranchVisitDetailsId);
            parameter.Add("@Remarks", model.Remarks);
            parameter.Add("@DetailsStatus", model.DetailsStatus);
    

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitDetailsFeedback", parameter);
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


    //[HttpPost("MyUpdate")]
    //public async Task<IActionResult> MyUpdate([FromForm] BranchVisitDetailsComments model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        //var fileUrl = "";
    //        //if (model.File is not null && model.File.Length > 0)
    //        //    fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

    //        var parameter = new DynamicParameters();
    //        parameter.Add("@BranchVisitDetailsId", model.BranchVisitDetailsId);
    //        parameter.Add("@Comments", model.Comments);

    //        //parameter.Add("@BranchVisitId", model.BranchVisitId);
    //        //parameter.Add("@TopicAssessed", model.TopicAssessed);
    //        //parameter.Add("@Findings", model.Findings);
    //        //parameter.Add("@RatingGiven", model.RatingGiven);
    //        //parameter.Add("@ActionToBeTaken", model.ActionToBeTaken);
    //        //parameter.Add("@OwnerAssigned", model.OwnerAssigned);
    //        //parameter.Add("@ActionCompletionDate", model.ActionCompletionDate);
    //        //parameter.Add("@Attachment", fileUrl);


    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("HrBranchVisitDetailsCommentsUpdate", parameter);
    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Already exists")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error updating data." + e.Message);
    //    }
    //}

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitDetailsId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitDetailsDelete", parameter);

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
