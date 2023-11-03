using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Wines.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>(config => config.UseSqlServer(builder.Configuration.GetConnectionString("WinesDb")));
const string defaultCorsPolicy = "__defaultCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(defaultCorsPolicy, configuration =>
    {
        configuration.AllowAnyOrigin()
            .AllowAnyHeader()
            .WithMethods("OPTIONS", "GET");
    });
});
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
