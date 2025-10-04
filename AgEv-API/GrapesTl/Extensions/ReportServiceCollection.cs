namespace GrapesTl.Extensions;

public static class ReportServiceCollection
{
    public static IServiceCollection AddReportGenerators(this IServiceCollection services)
    {
       


        services.AddTransient<IReportGenerator, BankBookXlsxGenerator>();
        services.AddTransient<IReportGenerator, CashBookXlsxGenerator>();
        services.AddTransient<IReportGenerator, DayBookXlsxGenerator>();
        services.AddTransient<IReportGenerator, LedgerXlsxGenerator>();
        services.AddTransient<IReportGenerator, NoteCCYXlsxGenerator>();
        services.AddTransient<IReportGenerator, TrialBalanceXlsxGenerator>();
        services.AddTransient<IReportGenerator, ChartOfAccountXlsxGenerator>();
        services.AddTransient<IReportGenerator, InterestIncomeXlsxGenerator>();
        services.AddTransient<IReportGenerator, ProcessingIncomeMemberXlsxGenerator>();
        services.AddTransient<IReportGenerator, ProcessingIncomeBranchXlsxGenerator>();
        services.AddTransient<IReportGenerator, DeathRiskXlsxGenerator>();
        services.AddTransient<IReportGenerator, AgingXlsxGenerator>();
        services.AddTransient<IReportGenerator, InsuranceIncomeMemberXlsxGenerator>();
        services.AddTransient<IReportGenerator, InsuranceIncomeBranchXlsxGenerator>();
        services.AddTransient<IReportGenerator, PaymentAndReceiveXlsxGenerator>();




        // Register all Pdf implementations        
        services.AddTransient<IPdfReportGenerator, VoucherPrintPdfGenerator>();


        // Register the factory
        services.AddScoped<ReportGeneratorFactory>();
        services.AddScoped<PdfReportGeneratorFactory>();

        return services;
    }
}
