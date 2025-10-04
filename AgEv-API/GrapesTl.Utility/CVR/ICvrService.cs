using GrapesTl.Models;
using System.Threading.Tasks;
namespace GrapesTl.Utility;
public interface ICvrService
{
    Task<CvrViewModel> Get(string cvrNumber);
}
