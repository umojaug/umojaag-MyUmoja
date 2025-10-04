using System;

namespace GrapesTl.Models;

public class BoardMonth
{
    public string MetricId { get; set; }
    public string ReportId { get; set; }
    public string DepartmentType { get; set; }
    public string Field { get; set; }
    public string MetricName { get; set; }
    public double NewValue { get; set; }
    public double YTDActual { get; set; }
    public double YTDBudgeted { get; set; }
}



public class BoardMonthView:BoardMonth
{
    public double YTDVariance { get; set; }
    public double YTDVariancePercent { get; set; }
}




