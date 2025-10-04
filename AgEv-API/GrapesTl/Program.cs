using GrapesTl.BackgroundServices;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

services.AddIdentity<ApplicationUser, IdentityRole>().AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ApplicationDbContext>();

services.Configure<IdentityOptions>(options =>
{
    // Default Password settings.
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;
    options.Lockout.MaxFailedAccessAttempts = 3;

    // Default SignIn settings.
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
});

services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["AuthSettings:Audience"],
        ValidIssuer = builder.Configuration["AuthSettings:Issuer"],
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AuthSettings:Key"])),
        ValidateIssuerSigningKey = true
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = static context =>
        {
            if (context.Request.Query.TryGetValue("relic", out var token))
                context.Token = token;
            return Task.CompletedTask;
        }
    };
});

var emailHost = builder.Configuration.GetSection("Email")["Host"];
var emailFrom = builder.Configuration.GetSection("Email")["From"];
var emailSender = builder.Configuration.GetSection("Email")["Sender"];
var emailPassword = builder.Configuration.GetSection("Email")["Password"];
var emailPort = Convert.ToInt32(builder.Configuration.GetSection("Email")["Port"]);

services
    .AddFluentEmail(emailSender, emailFrom)
    .AddRazorRenderer()
    .AddSmtpSender(new SmtpClient(emailHost)
    {
        UseDefaultCredentials = false,
        Port = emailPort,
        Credentials = new NetworkCredential(emailSender, emailPassword),
        EnableSsl = true,
    });

services.AddSingleton<IMailSender, MailSender>();

services.AddSingleton<IFlurlClientFactory, PerBaseUrlFlurlClientFactory>();
services.AddScoped<CvrService>();


services.Configure<SmsOptions>(builder.Configuration.GetSection("SMS"));
services.AddSingleton<ISmsSender, SmsSender>();

services.AddScoped<IAuthService, AuthService>();
services.AddScoped<IVoucherService, VoucherService>();

services.AddScoped<IUnitOfWork, UnitOfWork>();
services.AddScoped<IFileUploadService, FileUploadService>();

services.AddHostedService<RepeatWork>();

services.AddCors(options =>
{
    options.AddPolicy("Policy1", builder =>
    {
        builder.AllowAnyHeader().AllowAnyMethod().WithOrigins(
            "http://localhost:3000",
            "https://localhost:3000",
            "http://localhost:5173",
            "https://microfin.grapestl.com",
            "https://localhost:44305")
        .WithMethods("POST", "GET", "PUT", "DELETE");
    });
});

services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// In production, the React files will be served from this directory
services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp";
});

services.AddSwaggerGen(gen =>
{
    gen.SwaggerDoc("v1.0", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "GrapesTl Endpoint", Version = "v1.0" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSpaStaticFiles();

app.UseRouting();

app.UseCors("Policy1");

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();

app.UseSwaggerUI(ui =>
{
    ui.SwaggerEndpoint("/swagger/v1.0/swagger.json", "GrapesTl Endpoint");
});

app.MapControllers();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

});

app.Run();