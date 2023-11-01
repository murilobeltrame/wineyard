namespace Countries.Api.Models;

public class Country
{
    public int Id { get; private set; }
    public string Name { get; set; }

    public Country(string name)
    {
        Name = name;
    }

    private Country() { }
}