namespace Grapes.Api.Models;

public class Grape
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string? AlternativeName { get; private set; }

    public Grape(string name, string? alternativeName = null)
    {
        Name = name;
        AlternativeName = alternativeName;
    }
}