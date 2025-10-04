using GrapesTl.Models.Fix;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TicketsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    private readonly IFileUploadService _fileUploadService = fileUploadService;



    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<TicketView>("fixTicketGetAll");
            return Ok(data.Select(a => new { listId = a.TicketId, listName = a.Title }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("ownTickList")]
    public async Task<IActionResult> OwnTickList()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@UserId", user.Id);
            var tickets = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllOwn", parameter);

            //var assignees = await _unitOfWork.SP_Call.List<TicketAssignedTo>("fixTicketAssigneesGetAll");

            //foreach (var ticket in tickets)
            //{
            //    ticket.Assignees = assignees.Where(a => a.TicketId == ticket.TicketId).ToList();
            //}

            return Ok(tickets);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin")]
    [HttpGet("open")]
    public async Task<IActionResult> Open()
    {

        try
        {
            //var parameter = new DynamicParameters();
            //parameter.Add("@fromDate", fromDate);
            //parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllOpen");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("allList/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AllList([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);
            parameter.Add("@UserId", user.Id);

            var data = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin")]
    [HttpGet("country/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Country([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllCountry", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin")]
    [HttpGet("closed/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Closed([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllClosed", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TicketID", id);

            var tickets = await _unitOfWork.SP_Call.OneRecord<TicketView>("fixTicketGetById", parameter);

            if (tickets == null)
                return NotFound("Ticket not found.");

            //// Retrieve assignees using the same TicketID
            //var assignees = await _unitOfWork.SP_Call.List<TicketAssignedTo>("fixTicketAssigneesGetById", parameter);

            //tickets.Assignees = assignees.ToList();

            return Ok(tickets);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
               "Error retrieving ticket details: " + e.Message);
        }
    }


    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] TicketAdd model)
    {
        try
        {
            // Get current user
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            // Initialize TicketId and parameters
            var ticketId = Guid.NewGuid().ToString();
            var ticketParameters = new DynamicParameters();
            ticketParameters.Add("@TicketId", ticketId);
            ticketParameters.Add("@Title", model.Title);
            ticketParameters.Add("@Description", model.Description);
            ticketParameters.Add("@TicketType", model.TicketType);
            ticketParameters.Add("@CategoryId", model.CategoryId);
            ticketParameters.Add("@ProjectId", model.ProjectId);
            ticketParameters.Add("@Priority", model.Priority);
            ticketParameters.Add("@Status", model.Status);
            ticketParameters.Add("@Remarks", model.Remarks ?? "");
            ticketParameters.Add("@CreatedBy", user.Id);
            ticketParameters.Add("@SupportingDocLink", model.SupportingDocLink ?? "");
            ticketParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            // Handle file uploads
            string file1 = "", file2 = "";
            try
            {
                if (model.File1 != null && model.File1.Length > 0)
                    file1 = await _fileUploadService.GetUploadIdAsync(model.File1);

                if (model.File2 != null && model.File2.Length > 0)
                    file2 = await _fileUploadService.GetUploadIdAsync(model.File2);
            }
            catch (Exception uploadEx)
            {
                return BadRequest($"File upload failed: {uploadEx.Message}");
            }

            ticketParameters.Add("@Attachment1", file1);
            ticketParameters.Add("@Attachment2", file2);

            // Execute stored procedure
            await _unitOfWork.SP_Call.Execute("FixTicketCreate", ticketParameters);
            var message = ticketParameters.Get<string>("Message");

            if (message != "Ticket Created Successfully")
                return BadRequest(message);

            return Created("", new { TicketId = ticketId, message = "Ticket created successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating ticket: {ex.Message}");
        }
    }




    //[HttpPost("create")]
    //public async Task<IActionResult> Create([FromForm] TicketAdd model)
    //{
    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    //        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

    //        var TicketId = Guid.NewGuid().ToString();
    //        var ticketParameters = new DynamicParameters();
    //        ticketParameters.Add("@TicketId", TicketId);
    //        ticketParameters.Add("@Title", model.Title);
    //        ticketParameters.Add("@Description", model.Description);
    //        ticketParameters.Add("@TicketType", model.TicketType);
    //        ticketParameters.Add("@CategoryId", model.CategoryId);
    //        ticketParameters.Add("@ProjectId", model.ProjectId);
    //        ticketParameters.Add("@Priority", model.Priority);
    //        ticketParameters.Add("@Status", model.Status);
    //        ticketParameters.Add("@Remarks", model.Remarks ?? "");
    //        ticketParameters.Add("@CreatedBy", user.Id);
    //        ticketParameters.Add("@SupportingDocLink", string.IsNullOrWhiteSpace(model.SupportingDocLink) ? "" : model.SupportingDocLink);
    //        //ticketParameters.Add("@SupportingDocType", model.SupportingDocType);
    //        //ticketParameters.Add("@UpdatedAt", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        ticketParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

    //        string file1 = null, file2 = null;



    //        try
    //        {
    //            if (model.File1 is not null && model.File1.Length > 0)
    //                file1 = await _fileUploadService.GetUploadIdAsync(model.File1);

    //            if (model.File2 is not null && model.File2.Length > 0)
    //                file2 = await _fileUploadService.GetUploadIdAsync(model.File2);
    //        }
    //        catch (Exception uploadEx)
    //        {
    //            return BadRequest($"File upload failed: {uploadEx.Message}");
    //        }


    //        ticketParameters.Add("@Attachment1", file1 ?? "");
    //        ticketParameters.Add("@Attachment2", file2 ?? "");

    //        //if (model.SupportingDocType == "link")
    //        //{
    //        //    ticketParameters.Add("@Attachment1", model.SupportingDocLink ?? "");
    //        //    ticketParameters.Add("@Attachment2", " ");
    //        //}


    //        await _unitOfWork.SP_Call.Execute("FixTicketCreate", ticketParameters);
    //        var Message = ticketParameters.Get<string>("Message");
    //        if (Message != "Ticket Created Successfully")
    //        {
    //            return BadRequest(Message);
    //        }

    //        //var assigneesParameters = new DynamicParameters();    

    //        //assigneesParameters.Add("@TicketId", TicketId);
    //        //assigneesParameters.Add("@assignedTo", model.AssigneeIds);

    //        //await _unitOfWork.SP_Call.Execute("FixTicketAssigneesCreate", assigneesParameters);

    //        return Created("", new { TicketId, message = "Ticket created successfully" });


    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError, "Error creating ticket: " + ex.Message);
    //    }
    //}

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] TicketAdd model)
    {

        //if (!ModelState.IsValid)
        //    return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var ticketParameters = new DynamicParameters();
            ticketParameters.Add("@TicketId", model.TicketId);
            ticketParameters.Add("@Title", model.Title);
            ticketParameters.Add("@Description", model.Description);
            ticketParameters.Add("@TicketType", model.TicketType);
            ticketParameters.Add("@CategoryId", model.CategoryId);
            ticketParameters.Add("@ProjectId", model.ProjectId);
            ticketParameters.Add("@Priority", model.Priority);
            ticketParameters.Add("@Status", model.Status);
            ticketParameters.Add("@Remarks", model.Remarks ?? "");
            ticketParameters.Add("@SupportingDocLink", string.IsNullOrWhiteSpace(model.SupportingDocLink) ? "" : model.SupportingDocLink);
            //ticketParameters.Add("@CreatedBy", user.FullName);
            //ticketParameters.Add("@UpdatedAt", "", dbType: DbType.String, direction: ParameterDirection.Output);
            //ticketParameters.Add("@SupportingDocType", model.SupportingDocType);
            ticketParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            // Handle file uploads
            string file1 = "", file2 = "";
            try
            {
                if (model.File1 != null && model.File1.Length > 0)
                    file1 = await _fileUploadService.GetUploadIdAsync(model.File1);

                if (model.File2 != null && model.File2.Length > 0)
                    file2 = await _fileUploadService.GetUploadIdAsync(model.File2);
            }
            catch (Exception uploadEx)
            {
                return BadRequest($"File upload failed: {uploadEx.Message}");
            }

            ticketParameters.Add("@Attachment1", file1);
            ticketParameters.Add("@Attachment2", file2);


            await _unitOfWork.SP_Call.Execute("FixTicketUpdate", ticketParameters);


          

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }



    [HttpPost("levelStatus")]
    public async Task<IActionResult> LevelStatus([FromForm] TicketStatus model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TicketId", model.TicketId);
            parameter.Add("@TicketLevel", model.TicketLevel);
            //  parameter.Add("@ClosedBy", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketLevelUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }

    [HttpPost("updateStatus")]
    public async Task<IActionResult> UpdateStatus([FromForm] UpdateTicket model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TicketId", model.TicketId);
            parameter.Add("@Status", model.Status);
            parameter.Add("@ClosedBy", user.FullName);
            parameter.Add("@ClosedId", user.Id);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketStatusUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }



    [HttpPost("feedback/{id}")]
    public async Task<IActionResult> Feedback(string id, [FromForm] TicketView model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@TicketId", id);
            parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketFeedbackUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TicketId", id);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketDelete", parameter);
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

    [HttpGet("listBm")]
    public async Task<IActionResult> ListBm()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@UserId", user.Id);
            var tickets = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllBM", parameter);

          

            return Ok(tickets);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpGet("listAm")]
    public async Task<IActionResult> ListAm()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@UserId", user.Id);
            var tickets = await _unitOfWork.SP_Call.List<TicketView>("FixTicketGetAllAM", parameter);



            return Ok(tickets);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("approveBmAm/{id}")]
    public async Task<IActionResult> ApproveBm(string id, [FromForm] TicketView model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@TicketId", id);
            parameter.Add("@UserId", user.Id);
            parameter.Add("@RoleName", user.Role);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketApproveBmAM", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }


    [HttpPost("approveAm/{id}")]
    public async Task<IActionResult> ApproveAm(string id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@TicketId", id);
           // parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketApproveAm", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }

    [HttpPost("reject/{id}")]
    public async Task<IActionResult> Reject(string id, [FromForm] TicketView model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

             parameter.Add("@TicketId", id);
             parameter.Add("@Remarks", model.Remarks);
             //parameter.Add("@ClosedBy", user.FullName);
             parameter.Add("@UserId", user.Id);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("FixTicketReject", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }


}
