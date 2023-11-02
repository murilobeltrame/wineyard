using Microsoft.EntityFrameworkCore;

namespace Grapes.Api.Models;

public class ApplicationContext : DbContext
{
    public DbSet<Grape> Grapes { get; set; }

    public ApplicationContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new GrapeConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}