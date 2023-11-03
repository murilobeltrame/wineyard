using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Wines.Api.Models;

public class WineGrapeConfiguration : IEntityTypeConfiguration<WineGrape>
{
    public void Configure(EntityTypeBuilder<WineGrape> builder)
    {
        builder.HasKey(k => k.Id);
        builder.Property(p => p.Name)
            .HasMaxLength(50)
            .IsRequired();
    }
}