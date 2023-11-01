using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Countries.Api.Models;

public class CountryConfiguration : IEntityTypeConfiguration<Country>
{
    public void Configure(EntityTypeBuilder<Country> builder)
    {
        builder.HasKey(k => k.Id);
        builder.Property(p => p.Name)
            .HasMaxLength(50)
            .IsRequired();
    }
}