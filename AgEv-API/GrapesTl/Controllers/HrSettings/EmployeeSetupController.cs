namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeeSetupController(IUnitOfWork unitOfWork, IMailSender mailSender, IConfiguration configuration, ILogger<EmployeeSetupController> logger, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmployeeSetupController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", parameter);

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

    [HttpGet("Details")]
    public async Task<IActionResult> Details()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            //var parameter = new DynamicParameters();
            //parameter.Add("@EmployeeId", );

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", parameter);

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

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] Employee model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var fileId = "";
            if (model.File is not null && model.File.Length > 0)
                fileId = await _fileUploadService.GetUploadIdAsync(model.File);

            var employeeId = Guid.NewGuid();
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", employeeId);
            parameter.Add("@EmployeeName", model.EmployeeName);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@Email", string.IsNullOrWhiteSpace(model.Email) ? "" : model.Email);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@Gender", model.Gender);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@JoiningDate", model.JoiningDate);
            parameter.Add("@GrossSalaryUsd", model.GrossSalaryUsd);
            parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@NssfNumber", model.NssfNumber);
            parameter.Add("@BankId", model.BankId);
            parameter.Add("@BankAccountNumber", model.BankAccountNumber);
            parameter.Add("@TinNumber", model.TinNumber);
            parameter.Add("@NidNumber", model.NidNumber);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            parameter.Add("@MotherName", model.MotherName);
            parameter.Add("@FatherName", model.FatherName);
            parameter.Add("@Religion", model.Religion);
            parameter.Add("@MaritalStatus", model.MaritalStatus);
            parameter.Add("@BloodGroup", model.BloodGroup);
            parameter.Add("@EducationId", model.EducationId);
            parameter.Add("@LanguagesSpoken", model.LanguagesSpoken);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@ImageUrl", fileId);
            parameter.Add("@EntryBy", user.FullName);
            parameter.Add("@FatherContactNumber", string.IsNullOrWhiteSpace(model.FatherContactNumber) ? "" : model.FatherContactNumber);
            parameter.Add("@MotherContactNumber", string.IsNullOrWhiteSpace(model.MotherContactNumber) ? "" : model.MotherContactNumber);
            parameter.Add("@KinName", string.IsNullOrWhiteSpace(model.KinName) ? "" : model.KinName);
            parameter.Add("@KinAddress", string.IsNullOrWhiteSpace(model.KinAddress) ? "" : model.KinAddress);
            parameter.Add("@KinContactNumber", string.IsNullOrWhiteSpace(model.KinContactNumber) ? "" : model.KinContactNumber);
            parameter.Add("@KinRelationship", string.IsNullOrWhiteSpace(model.KinRelationship) ? "" : model.KinRelationship);
            parameter.Add("@KinEmail", string.IsNullOrWhiteSpace(model.KinEmail) ? "" : model.KinEmail);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(model.Email) == false)
            {
                try
                {
                    var callbackUrl = SD.NewJoinCallBack + employeeId;
                    var tmp = await _mailSender.SendEmailWithBody(
                        model.Email,
                        model.EmployeeName,
                        SD.BccEmail,
                        SD.AppointmentLetter,
                        "We have the pleasure of offering you an employment opportunity with " + SD.CompanyName + $". Download Appointment Letter by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }
            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] Employee model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var fileId = "";
            if (model.File is not null && model.File.Length > 0)
                fileId = await _fileUploadService.GetUploadIdAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", model.EmployeeId);
            parameter.Add("@EmployeeName", model.EmployeeName);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@Email", string.IsNullOrWhiteSpace(model.Email) ? "" : model.Email);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@Gender", model.Gender);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@JoiningDate", model.JoiningDate);
            parameter.Add("@GrossSalaryUsd", model.GrossSalaryUsd);
            parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@NssfNumber", model.NssfNumber);
            parameter.Add("@BankId", model.BankId);
            parameter.Add("@BankAccountNumber", model.BankAccountNumber);
            parameter.Add("@TinNumber", model.TinNumber);
            parameter.Add("@NidNumber", model.NidNumber);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            parameter.Add("@MotherName", model.MotherName);
            parameter.Add("@FatherName", model.FatherName);
            parameter.Add("@Religion", model.Religion);
            parameter.Add("@MaritalStatus", model.MaritalStatus);
            parameter.Add("@BloodGroup", model.BloodGroup);
            parameter.Add("@EducationId", model.EducationId);
            parameter.Add("@LanguagesSpoken", model.LanguagesSpoken);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@ImageUrl", fileId);
            parameter.Add("@FatherContactNumber", string.IsNullOrWhiteSpace(model.FatherContactNumber) ? "" : model.FatherContactNumber);
            parameter.Add("@MotherContactNumber", string.IsNullOrWhiteSpace(model.MotherContactNumber) ? "" : model.MotherContactNumber);
            parameter.Add("@KinName", string.IsNullOrWhiteSpace(model.KinName) ? "" : model.KinName);
            parameter.Add("@KinAddress", string.IsNullOrWhiteSpace(model.KinAddress) ? "" : model.KinAddress);
            parameter.Add("@KinContactNumber", string.IsNullOrWhiteSpace(model.KinContactNumber) ? "" : model.KinContactNumber);
            parameter.Add("@KinRelationship", string.IsNullOrWhiteSpace(model.KinRelationship) ? "" : model.KinRelationship);
            parameter.Add("@KinEmail", string.IsNullOrWhiteSpace(model.KinEmail) ? "" : model.KinEmail);
            parameter.Add("@UpdateBy", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeUpdate", parameter);
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

    [HttpPost("DetailsUpdate")]
    public async Task<IActionResult> DetailsUpdate([FromForm] EmployeeDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", model.EmployeeId);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@Email", string.IsNullOrWhiteSpace(model.Email) ? "" : model.Email);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@MaritalStatus", model.MaritalStatus);
            parameter.Add("@EducationId", model.EducationId);
            parameter.Add("@KinName", string.IsNullOrWhiteSpace(model.KinName) ? "" : model.KinName);
            parameter.Add("@KinAddress", string.IsNullOrWhiteSpace(model.KinAddress) ? "" : model.KinAddress);
            parameter.Add("@KinContactNumber", string.IsNullOrWhiteSpace(model.KinContactNumber) ? "" : model.KinContactNumber);
            parameter.Add("@KinRelationship", string.IsNullOrWhiteSpace(model.KinRelationship) ? "" : model.KinRelationship);
            parameter.Add("@KinEmail", string.IsNullOrWhiteSpace(model.KinEmail) ? "" : model.KinEmail);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeDetailsUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeDelete", parameter);

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
