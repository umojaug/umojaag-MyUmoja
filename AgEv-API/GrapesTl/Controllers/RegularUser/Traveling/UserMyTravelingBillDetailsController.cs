namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserMyTravelingBillDetailsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] TravelingBill model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@TravelBillId", model.TravelBillId);
            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@StartFrom", model.StartFrom);
            parameter.Add("@EndTo", model.EndTo);
            parameter.Add("@Taxi", model.Taxi);
            parameter.Add("@Bus", model.Bus);
            parameter.Add("@Motorcycle", model.Motorcycle);
            parameter.Add("@Others", model.Others);
            parameter.Add("@Train", model.Train);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelingBillDetailsCreate", parameter);

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






    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", id);

            var data = await _unitOfWork.SP_Call.List<TravelingBill>("HrTravelingBillDetailsGetById", parameter);

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



    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TravelBillId", id);


            var data = await _unitOfWork.SP_Call.OneRecord<TravelingBill>("HrTravelingBillDetailsGetByTravelBillId", parameter);

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
    public async Task<IActionResult> Update([FromForm] TravelingBill model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@TravelBillId", model.TravelBillId);
            parameter.Add("@TravelId", model.TravelId);
            parameter.Add("@StartFrom", model.StartFrom);
            parameter.Add("@EndTo", model.EndTo);
            parameter.Add("@Taxi", model.Taxi);
            parameter.Add("@Bus", model.Bus);
            parameter.Add("@Motorcycle", model.Motorcycle);
            parameter.Add("@Others", model.Others);
            parameter.Add("@Train", model.Train);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelingBillDetailsUpdate", parameter);
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
            parameter.Add("@TravelBillId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTravelingBillDetailsDelete", parameter);

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
