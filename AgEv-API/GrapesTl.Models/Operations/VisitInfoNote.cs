using System;

namespace GrapesTl.Models;

public class VisitInfoNote
{
    public string NoteId { get; set; }
    public string VisitId { get; set; }
    public string Note { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }

}
