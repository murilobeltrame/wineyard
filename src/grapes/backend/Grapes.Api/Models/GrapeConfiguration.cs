using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Grapes.Api.Models;

public class GrapeConfiguration : IEntityTypeConfiguration<Grape>
{
    public void Configure(EntityTypeBuilder<Grape> builder)
    {
        builder.HasKey(k => k.Id);
        builder.Property(p => p.Name)
            .HasMaxLength(50)
            .IsRequired();
    }
}