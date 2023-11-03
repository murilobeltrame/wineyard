namespace Wines.Api.Models;

public class WineGrape
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public ICollection<Wine> Wines { get; private set; }

    public WineGrape(string name)
    {
        Name = name;
    }

    private WineGrape() { }
}