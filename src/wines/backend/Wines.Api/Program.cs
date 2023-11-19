using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Wines.Api.Models;

var builder = WebApplication.CreateBuilder(args);

const string serviceName = "wines-api";
const string defaultCorsPolicy = "__defaultCorsPolicy";

builder.Logging.AddOpenTelemetry(options => options
    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName))
    .AddConsoleExporter()
    .AddOtlpExporter());

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>(config => config.UseSqlServer(builder.Configuration.GetConnectionString("WinesDb")));
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
        .AddAspNetCoreInstrumentation()
        .AddConsoleExporter()
        .AddOtlpExporter());
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(defaultCorsPolicy);

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

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
