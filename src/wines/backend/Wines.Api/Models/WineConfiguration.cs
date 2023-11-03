using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Wines.Api.Models;

public class WineConfiguration : IEntityTypeConfiguration<Wine>
{
    public void Configure(EntityTypeBuilder<Wine> builder)
    {
        builder.HasKey(k => k.Id);
        builder.Property(p => p.Label)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(p => p.Winery)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(p => p.Country)
           .HasMaxLength(50)
           .IsRequired();
        builder.HasMany(m => m.Grapes)
            .WithMany(m => m.Wines);
    }
}