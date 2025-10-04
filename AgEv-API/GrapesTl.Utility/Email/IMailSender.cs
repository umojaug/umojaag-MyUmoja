using GrapesTl.Dto;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public interface IMailSender
{
    Task<AuthResponse> SendPlaintextEmail(string recipientEmail, string recipientName, string subject, string body);
    Task<AuthResponse> SendHtmlEmail(string recipientEmail, string recipientName, string bccEmail, string path, string subject, string body);
    Task<AuthResponse> SendEmailWithBody(string recipientEmail, string recipientName, string bccEmail, string subject, string body);



    //void SendHtmlWithAttachmentGmail(string recipientEmail, string recipientName);

    //void SendPlaintextSendgrid(string recipientEmail, string recipientName);
    //void SendHtmlSendgrid(string recipientEmail, string recipientName);
    //void SendHtmlWithAttachmentSendgrid(string recipientEmail, string recipientName);
    //void SendSendgridBulk(IEnumerable<string> recipientEmails);
}