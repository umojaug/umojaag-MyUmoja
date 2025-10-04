using System;

namespace GrapesTl.Models;

public class DeviceRegister
{
    public string DeviceName { get; set; }
    public string Token { get; set; }
}

public class DeviceRegisterView
{
    public string DeviceRegisterId { get; set; }
    public string DeviceName { get; set; }
    public string Token { get; set; }
    public DateTime RegisterDate { get; set; }
    public string EmployeeName { get; set; }
}
