namespace Countries.Api.Models;

public class Seeder
{
    private readonly ApplicationContext _context;

    public Seeder(ApplicationContext context) => _context = context;

    public void Seed()
    {
        var countries = new[] {
            new Country("Africa do Sul"),
            new Country("Germany"),
            new Country("Argentina"),
            new Country("Austrália"),
            new Country("Austria"),
            new Country("Brasil"),
            new Country("Bulgaria"),
            new Country("Chile"),
            new Country("Croatia"),
            new Country("Espanha"),
            new Country("Estados Unidos"),
            new Country("France"),
            new Country("Georgia"),
            new Country("Greece"),
            new Country("Hungary"),
            new Country("Israel"),
            new Country("Itália"),
            new Country("Líbano"),
            new Country("Nova Zelândia"),
            new Country("Portugal"),
            new Country("Suiça"),
            new Country("Turquia"),
            new Country("Uruguai"),
        }.ToList();

        _context.Countries.RemoveRange(_context.Countries);
        _context.Countries.AddRange(countries);
        _context.SaveChanges();
    }
}