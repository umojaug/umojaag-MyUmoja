using System;

namespace GrapesTl.Models;

public class FeedbackNote
{
    public string NoteId { get; set; }
    public string FeedbackId { get; set; }
    public string Note { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }
    public string PinName { get; set; }

}


public class FeedbackNoteView : FeedbackNote
{
    public string AllowAnonymous { get; set; }
    public string CompanyId { get; set; }


}

