using Countries.Api.Models;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

const string serviceName = "countries-api";
const string defaultCorsPolicy = "__defaultCorsPolicy";

builder.Logging.AddOpenTelemetry(options => options
    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName))
    .AddConsoleExporter()
    .AddOtlpExporter());

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>(config => config.UseSqlServer(builder.Configuration.GetConnectionString("CountriesDb")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(defaultCorsPolicy, configuration =>
    {
        configuration.AllowAnyOrigin()
            .AllowAnyHeader()
            .WithMethods("OPTIONS", "GET");
    });
});
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService(serviceName))
    .WithTracing(tracking => tracking
        .AddAspNetCoreInstrumentation()
        .AddSqlClientInstrumentation()
        .AddConsoleExporter()
        .AddOtlpExporter())
    .WithMetrics(metrics => metrics
        .AddRuntimeInstrumentation()
        .AddAspNetCoreInstrumentation()
        .AddConsoleExporter()
        .AddOtlpExporter());
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter the Bearer Token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Name = "Bearer",
                In= ParameterLocation.Header,
                Reference=new OpenApiReference{
                    Id="Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

var authenticationOptions = builder
    .Configuration
    .GetSection(KeycloakAuthenticationOptions.Section)
    .Get<KeycloakAuthenticationOptions>();
var authorizationOptions = builder
    .Configuration
    .GetSection(KeycloakProtectionClientOptions.Section)
    .Get<KeycloakProtectionClientOptions>();
builder.Services.AddKeycloakAuthentication(authenticationOptions);
builder.Services.AddKeycloakAuthorization(authorizationOptions);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(defaultCorsPolicy);

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Auto Migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
    db.Database.Migrate();

    new Seeder(db).Seed();
}

app.Run();
