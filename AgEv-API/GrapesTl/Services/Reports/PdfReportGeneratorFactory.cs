// Services/PaymentFactory.cs
namespace GrapesTl.Service;
public class PdfReportGeneratorFactory(IEnumerable<IPdfReportGenerator> services)
{
    private readonly Dictionary<string, IPdfReportGenerator> _services = services.ToDictionary(s => s.Key, StringComparer.OrdinalIgnoreCase);

    public IPdfReportGenerator GetGenerator(string key)
    {
        return _services.TryGetValue(key, out var service) ? service : null;
    }
}
