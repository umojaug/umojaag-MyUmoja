// Services/PaymentFactory.cs
namespace GrapesTl.Service;
public class ReportGeneratorFactory(IEnumerable<IReportGenerator> services)
{
    private readonly Dictionary<string, IReportGenerator> _services = services.ToDictionary(s => s.Key, StringComparer.OrdinalIgnoreCase);

    public IReportGenerator GetGenerator(string key)
    {
        return _services.TryGetValue(key, out var service) ? service : null;
    }
}
