using System.Threading;

namespace GrapesTl.BackgroundServices;

public class RepeatWork(IMailSender mailSender, IServiceProvider serviceProvider, ILogger<RepeatWork> logger) : BackgroundService
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<RepeatWork> _logger = logger;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var scopedService = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

            // Handle transfer
            await scopedService.SP_Call.Execute("hrEmployeeGetTodayTransfer");
            


            // Handle birthdays
            var birthdayList = await scopedService.SP_Call.List<EmployeeGetAll>("hrEmployeeGetTodayBirthday");
            await ProcessBirthdayAsync(birthdayList);

            // Handle anniversaries
            var anniversaryList = await scopedService.SP_Call.List<EmployeeGetAll>("hrEmployeeGetTodayAnniversary");
            await ProcessAnniversaryAsync(anniversaryList);

            // Wait for 1 day
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }

    private async Task ProcessBirthdayAsync(IEnumerable<EmployeeGetAll> employees)
    {
        foreach (var emp in employees)
        {
            if (!string.IsNullOrWhiteSpace(emp.Email))
            {
                try
                {
                    var emailBody = "";

                    emailBody = $" <h2>Dear {emp.EmployeeName},</h2><br><h1>The warmest wishes to a great member of our team.<br> May your special day be full of happiness, fun and cheer!</h1><br><br><img alt='Happy Birthday!' height='400' src='{SD.BirthdayImageUrl}' /> <br><br><h2>Thank you.</h2><br><h2>Umoja Team</h2>";

                    await _mailSender.SendEmailWithBody(
                        emp.Email,
                        emp.EmployeeName,
                        SD.BccEmail,
                        SD.HappyBirthday,
                        emailBody);

                    _logger.LogInformation("{Subject} email sent to {EmployeeName} ({Email})", SD.HappyBirthday, emp.EmployeeName, emp.Email);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending {Subject} email to {EmployeeName} ({Email})", SD.HappyBirthday, emp.EmployeeName, emp.Email);
                }
            }
        }
    }

    private async Task ProcessAnniversaryAsync(IEnumerable<EmployeeGetAll> employees)
    {
        foreach (var emp in employees)
        {
            if (!string.IsNullOrWhiteSpace(emp.Email))
            {
                try
                {
                    var emailBody = new StringBuilder();
                    emailBody.Append($"<tr><td style='background-color: #ff7f27; text-align: center; display: grid; color: white; font-weight: bold; padding: 10px;'><span>{emp.EmployeeName.ToUpper()}</span><br /><span>{emp.DesignationName.ToUpper()}</span></td></tr>");
                    emailBody.Append($"<tr style='background-color: #ff7f27; text-align: center'></tr>");
                    var yearText = (emp.YearInService) + " " + (emp.YearInService > 1 ? "years" : "year");
                    emailBody.Append($"<tr style=\"color: #84bee7; text-align: center\"><td>Congratulations on reaching the milestone of making {yearText} with Umoja</td></tr>");

                    var emailTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/emails/anniversary.cshtml");
                    await _mailSender.SendHtmlEmail(
                        emp.Email,
                        emp.EmployeeName,
                        SD.BccEmail,
                        emailTemplatePath,
                        SD.HappyAnniversary,
                        emailBody.ToString());

                    _logger.LogInformation("{Subject} email sent to {EmployeeName} ({Email})", SD.HappyAnniversary, emp.EmployeeName, emp.Email);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending {Subject} email to {EmployeeName} ({Email})", SD.HappyAnniversary, emp.EmployeeName, emp.Email);
                }
            }
        }
    }
}
