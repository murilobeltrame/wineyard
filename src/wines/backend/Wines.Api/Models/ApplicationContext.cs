using Microsoft.EntityFrameworkCore;

namespace Wines.Api.Models;

public class ApplicationContext : DbContext
{
    public DbSet<Wine> Wines { get; set; }
    public DbSet<WineGrape> WineGrapes { get; set; }

    public ApplicationContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}