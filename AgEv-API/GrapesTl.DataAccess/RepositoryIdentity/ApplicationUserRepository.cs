using GrapesTl.Models;
using System.Linq;

namespace GrapesTl.Service;

public class ApplicationUserRepository(ApplicationDbContext db) : RepositoryAsync<ApplicationUser>(db), IApplicationUserRepository
{
    private readonly ApplicationDbContext _db = db;

    public void Update(ApplicationUser applicationUser)
    {
        var objFromDb = _db.ApplicationUser.FirstOrDefault(s => s.Id == applicationUser.Id);
        if (objFromDb != null)
        {
            objFromDb.LastPasswordChangedDate = applicationUser.LastPasswordChangedDate;
        }
    }

}
