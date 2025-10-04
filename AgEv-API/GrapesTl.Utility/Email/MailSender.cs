using FluentEmail.Core;
using GrapesTl.Dto;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
namespace GrapesTl.Utility;
public class MailSender(IServiceProvider serviceProvider) : IMailSender
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;

    public async Task<AuthResponse> SendPlaintextEmail(string recipientEmail, string recipientName, string subject, string body)
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
            var email = mailer
                .To(recipientEmail, recipientName)
                .Subject(subject)
                .Body(body);

            await email.SendAsync();
            return new AuthResponse
            {
                Message = "Email successfully send!",
                IsSuccess = true,
            };
        }
        catch (Exception e)
        {
            return new AuthResponse
            {
                Message = e.Message,
                IsSuccess = false,
            };
        }
    }

    public async Task<AuthResponse> SendHtmlEmail(string recipientEmail, string recipientName, string bccEmail, string path, string subject, string body)
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();

            var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();

            var email = mailer
                .To(recipientEmail, recipientName)
                .BCC(bccEmail)
                .Subject(subject)
                .UsingTemplateFromFile(path,
                new
                {
                    BodyText = body
                });

            var result = await email.SendAsync();
            if (result.Successful)
            {
                return new AuthResponse
                {
                    Message = "Email sent successfully!",
                    IsSuccess = true,
                };
            }
            else
            {
                return new AuthResponse
                {
                    Message = $"Failed to send email. Error: {result.ErrorMessages}",
                    IsSuccess = false,
                };
            }

        }
        catch (Exception e)
        {
            return new AuthResponse
            {
                Message = e.Message,
                IsSuccess = false,
            };
        }
    }

    public async Task<AuthResponse> SendEmailWithBody(string recipientEmail, string recipientName, string bccEmail, string subject, string body)
    {

        try
        {
            using var scope = _serviceProvider.CreateScope();

            var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();

            var email = mailer
                .To(recipientEmail, recipientName)
                .BCC(bccEmail)
                .Subject(subject)
                .UsingTemplate(body, new { BodyText = "" });

            var result = await email.SendAsync();
            if (result.Successful)
            {
                return new AuthResponse
                {
                    Message = "Email sent successfully!",
                    IsSuccess = true,
                };
            }
            else
            {
                return new AuthResponse
                {
                    Message = $"Failed to send email. Error: {result.ErrorMessages}",
                    IsSuccess = false,
                };
            }

        }
        catch (Exception e)
        {
            return new AuthResponse
            {
                Message = e.Message,
                IsSuccess = false,
            };
        }
    }

    //public async void SendHtmlWithAttachmentGmail(string recipientEmail, string recipientName)
    //{
    //    using (var scope = _serviceProvider.CreateScope())
    //    {
    //        var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
    //        var email = mailer
    //            .To(recipientEmail, recipientName)
    //            .Subject("Hello there With Attachment")
    //            .AttachFromFilename($"{Directory.GetCurrentDirectory()}/wwwroot/files/sample.pdf", "application/pdf", "Application Form")
    //            .UsingTemplateFromFile($"{Directory.GetCurrentDirectory()}/wwwroot/emails/sample.cshtml",
    //            new
    //            {
    //                Name = recipientName,
    //            });

    //        await email.SendAsync();
    //    }
    //}

    //public async void SendPlaintextSendgrid(string recipientEmail, string recipientName)
    //{
    //    using (var scope = _serviceProvider.CreateScope())
    //    {
    //        var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
    //        var email = mailer
    //            .To(recipientEmail, recipientName)
    //            .Subject("Hello Plaintext from Sendrid")
    //            .Body("Hello there " + recipientName + ", How are you doing today");

    //        await email.SendAsync();
    //    }
    //}

    //public async void SendHtmlSendgrid(string recipientEmail, string recipientName)
    //{
    //    using (var scope = _serviceProvider.CreateScope())
    //    {
    //        var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
    //        var email = mailer
    //            .To(recipientEmail, recipientName)
    //            .Subject("Hello there Sendgrid HTML")
    //            .UsingTemplateFromFile($"{Directory.GetCurrentDirectory()}/wwwroot/emails/sample.cshtml",
    //            new
    //            {
    //                Name = recipientName,
    //            });

    //        await email.SendAsync();
    //    }
    //}

    //public async void SendHtmlWithAttachmentSendgrid(string recipientEmail, string recipientName)
    //{
    //    using (var scope = _serviceProvider.CreateScope())
    //    {
    //        var mailer = scope.ServiceProvider.GetRequiredService<IFluentEmail>();
    //        var email = mailer
    //            .To(recipientEmail, recipientName)
    //            .Subject("Hello there Sendgrid With Attachment")
    //            .AttachFromFilename($"{Directory.GetCurrentDirectory()}/wwwroot/files/sample.pdf", "application/pdf", "Application Form")
    //            .UsingTemplateFromFile($"{Directory.GetCurrentDirectory()}/wwwroot/emails/sample.cshtml",
    //            new
    //            {
    //                Name = recipientName,
    //            });

    //        await email.SendAsync();
    //    }
    //}

    //public async void SendSendgridBulk(IEnumerable<string> recipientEmails)
    //{
    //    using (var scope = _serviceProvider.CreateScope())
    //    {
    //        var factory = scope.ServiceProvider.GetRequiredService<IFluentEmailFactory>();
    //        foreach (var recipient in recipientEmails)
    //        {
    //            var email = factory
    //                .Create()
    //                .To(recipient)
    //                .Subject("Bulk Emails from Sendgrid")
    //                .UsingTemplateFromFile($"{Directory.GetCurrentDirectory()}/wwwroot/emails/sample.cshtml",
    //                new
    //                {
    //                    Name = "Stranger",
    //                });
    //            await email.SendAsync();
    //        }
    //    }
    //}
}