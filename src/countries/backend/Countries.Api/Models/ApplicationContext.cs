using Microsoft.EntityFrameworkCore;

namespace Countries.Api.Models;

public class ApplicationContext : DbContext
{
    public DbSet<Country> Countries { get; set; }

    public DbSet<Region> Regions { get; set; }

    public ApplicationContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new CountryConfiguration());
        modelBuilder.ApplyConfiguration(new RegionConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}