namespace Wines.Api.Models;

public class Wine
{
    public int Id { get; private set; }
    public string Label { get; private set; }
    public string Winery { get; private set; }
    public string Country { get; private set; }
    public ICollection<WineGrape> Grapes { get; private set; }

    public Wine(string label, string winery, string country, params WineGrape[] grapes)
    {
        Label = label;
        Winery = winery;
        Country = country;
        Grapes = grapes;
    }

    private Wine() { }
}