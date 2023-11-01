namespace Countries.Api.Models;

public class Region
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public int CountryId { get; private set; }
    public Country Country { get; private set; }

    public Region(Country country, string name)
    {
        Name = name;
        CountryId = country.Id;
        Country = country;
    }

    private Region() { }
}