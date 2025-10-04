namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CrmMembersController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;



    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager,Loan Officer")]
    [HttpGet("ListByLo")]
    public async Task<IActionResult> ListByLo()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<CrmMemberView>("crmMemberGetAllByLo", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager")]
    [HttpGet("List/{fromDate}/{tillDate}")]
    public async Task<IActionResult> List([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<CrmMemberView>("crmMemberGetByDate", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager")]
    [HttpGet("Summary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Summary([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<CrmMemberSummary>("crmMemberGetByDate", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager,Loan Officer")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MemberId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<CrmMemberView>("crmMemberGetById", parameter);

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

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager,Loan Officer")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] CrmMember model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@MemberName", model.MemberName);
            parameter.Add("@TotalFamilyMembers", model.TotalFamilyMembers);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@HouseStatus", model.HouseStatus);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@TypeOfBusiness", model.TypeOfBusiness);
            parameter.Add("@MonthlyIncome", model.MonthlyIncome);
            parameter.Add("@OthersIncome", model.OthersIncome);
            parameter.Add("@LoanFromOtherMfi", model.LoanFromOtherMfi);
            parameter.Add("@ExpectedLoanAmount", model.ExpectedLoanAmount);
            parameter.Add("@PotentialForLoan", model.PotentialForLoan);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("crmMemberCreate", parameter);

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

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager,Loan Officer")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] CrmMember model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@MemberId", model.MemberId);
            parameter.Add("@MemberName", model.MemberName);
            parameter.Add("@TotalFamilyMembers", model.TotalFamilyMembers);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@HouseStatus", model.HouseStatus);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@TypeOfBusiness", model.TypeOfBusiness);
            parameter.Add("@MonthlyIncome", model.MonthlyIncome);
            parameter.Add("@OthersIncome", model.OthersIncome);
            parameter.Add("@LoanFromOtherMfi", model.LoanFromOtherMfi);
            parameter.Add("@ExpectedLoanAmount", model.ExpectedLoanAmount);
            parameter.Add("@PotentialForLoan", model.PotentialForLoan);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("crmMemberUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager,Regional Manager,Area Manager,Branch Manager,Loan Officer")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MemberId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("crmMemberDelete", parameter);

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
