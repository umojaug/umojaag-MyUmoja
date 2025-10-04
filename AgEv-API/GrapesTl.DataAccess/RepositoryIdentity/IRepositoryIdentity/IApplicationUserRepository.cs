using GrapesTl.Models;

namespace GrapesTl.Service;

public interface IApplicationUserRepository : IRepositoryAsync<ApplicationUser>
{
    void Update(ApplicationUser applicationUser);
}
