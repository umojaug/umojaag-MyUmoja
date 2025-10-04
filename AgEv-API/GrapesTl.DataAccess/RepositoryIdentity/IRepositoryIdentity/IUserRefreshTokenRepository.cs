using GrapesTl.Models;

namespace GrapesTl.Service;

public interface IUserRefreshTokenRepository : IRepositoryAsync<UserRefreshToken>
{
    void Update(UserRefreshToken data);
}
