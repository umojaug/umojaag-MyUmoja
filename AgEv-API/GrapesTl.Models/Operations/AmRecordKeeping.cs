namespace GrapesTl.Models;

public class AmRecordKeeping
{
    public long OpsAmRecordKeepingId { get; set; }
    public string AmVisitId { get; set; }
    public string BooksAccount { get; set; }
    public string MatchedWith { get; set; }
    public string Finding { get; set; }
    public string Suggestion { get; set; }
    public string Remarks { get; set; }

    //public double PassbookChecked { get; set; }
    //public double PassbookMissing { get; set; }
}
